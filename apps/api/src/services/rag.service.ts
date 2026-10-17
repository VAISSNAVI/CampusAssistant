import { GoogleGenerativeAI } from '@google/generative-ai';
import { dbService } from './db.service';

export interface RetrievedChunk {
  title: string;
  source: string;
  content: string;
  score: number;
  category: string;
}

export class RagService {
  private geminiClient: GoogleGenerativeAI | null = null;
  private relevanceThreshold = 0.35; // Calibrated relevance threshold for campus inquiries

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey.trim() !== '') {
      this.geminiClient = new GoogleGenerativeAI(apiKey);
    }
  }

  /**
   * Hybrid retrieval combining keyword token overlap and category context
   */
  async retrieveContext(question: string): Promise<RetrievedChunk[]> {
    const query = question.toLowerCase();
    const stopWords = new Set([
      'the', 'is', 'for', 'what', 'are', 'how', 'can', 'and', 'you', 'about', 'with', 'this', 'that', 'from', 'tell', 'does', 'did', 'who', 'when', 'where', 'why', 'give', 'show', 'please'
    ]);
    const meaningfulTokens = query.split(/\W+/).filter((t: string) => t.length > 2 && !stopWords.has(t));
    if (meaningfulTokens.length === 0) {
      return [];
    }

    const bundle = await dbService.getContentBundle();
    const candidates: RetrievedChunk[] = [];

    // 1. Documents
    for (const doc of bundle.documents) {
      const text = `${doc.title} ${doc.content}`.toLowerCase();
      let matchCount = 0;
      for (const token of meaningfulTokens) {
        if (text.includes(token)) matchCount += 1;
      }
      const score = matchCount / meaningfulTokens.length;
      if (score >= 0.3 || text.includes(query)) {
        candidates.push({
          title: doc.title,
          source: doc.source,
          content: doc.content,
          score: Math.min(score * 1.2, 1.0),
          category: doc.category,
        });
      }
    }

    // 2. FAQs
    for (const faq of bundle.faqs) {
      const text = `${faq.question} ${faq.answer}`.toLowerCase();
      let matchCount = 0;
      for (const token of meaningfulTokens) {
        if (text.includes(token)) matchCount += 1;
      }
      const score = matchCount / meaningfulTokens.length;
      if (score >= 0.35 || text.includes(query)) {
        candidates.push({
          title: faq.question,
          source: faq.source || 'https://www.krce.ac.in/',
          content: faq.answer,
          score: Math.min(score * 1.3, 1.0),
          category: faq.category,
        });
      }
    }

    // 3. Procedures
    for (const proc of bundle.procedures) {
      const text = `${proc.title} ${proc.description} ${proc.steps.join(' ')} ${proc.eligibility || ''}`.toLowerCase();
      let matchCount = 0;
      for (const token of meaningfulTokens) {
        if (text.includes(token)) matchCount += 1;
      }
      const score = matchCount / meaningfulTokens.length;
      if (score >= 0.35 || text.includes(query)) {
        candidates.push({
          title: `Procedure: ${proc.title}`,
          source: proc.source || 'https://www.krce.ac.in/',
          content: `${proc.description} Steps: ${proc.steps.join(' -> ')}. Eligibility: ${proc.eligibility || 'N/A'}. Fees: ${proc.fees || 'N/A'}. Required Documents: ${proc.documentsRequired.join(', ')}.`,
          score: Math.min(score * 1.1, 1.0),
          category: proc.category,
        });
      }
    }

    // 4. Contacts
    for (const con of bundle.contacts) {
      const text = `${con.name} ${con.designation} ${con.location || ''} ${con.phone || ''} ${con.email || ''}`.toLowerCase();
      let matchCount = 0;
      for (const token of meaningfulTokens) {
        if (text.includes(token)) matchCount += 1;
      }
      const score = matchCount / meaningfulTokens.length;
      if (score >= 0.35 || text.includes(query)) {
        candidates.push({
          title: `Contact: ${con.name}`,
          source: con.source || 'https://www.krce.ac.in/contact.html',
          content: `${con.name} (${con.designation}). Location: ${con.location || 'KRCE Campus'}. Phone: ${con.phone || 'N/A'}. Email: ${con.email || 'N/A'}.`,
          score: Math.min(score * 1.1, 1.0),
          category: 'administration',
        });
      }
    }

    // 5. Notices & Events
    for (const not of bundle.notices) {
      const text = `${not.title} ${not.content}`.toLowerCase();
      let matchCount = 0;
      for (const token of meaningfulTokens) {
        if (text.includes(token)) matchCount += 1;
      }
      const score = matchCount / meaningfulTokens.length;
      if (score >= 0.35 || text.includes(query)) {
        candidates.push({
          title: `Notice: ${not.title}`,
          source: not.source || 'https://www.krce.ac.in/',
          content: not.content,
          score: Math.min(score * 1.0, 1.0),
          category: not.category,
        });
      }
    }

    // Sort by relevance score descending
    candidates.sort((a, b) => b.score - a.score);

    // Return top 4 distinct chunks
    return candidates.slice(0, 4);
  }

  /**
   * Answer a student's question grounded strictly in campus knowledge
   */
  async answerQuestion(
    question: string,
    history: Array<{ role: 'user' | 'assistant' | 'system'; content: string }> = []
  ): Promise<{ answer: string; sources: Array<{ title: string; url: string; snippet?: string }> }> {
    const chunks = await this.retrieveContext(question);

    // If top chunk has zero or negligible relevance, trigger safe transparent fallback
    const topScore = chunks.length > 0 ? chunks[0].score : 0;
    if (chunks.length === 0 || topScore < this.relevanceThreshold) {
      return {
        answer:
          'I could not find official information regarding your query in the approved KRCE campus knowledge base. Please check the official college portal at https://www.krce.ac.in/ or contact the administrative office at +91 98429 91377.',
        sources: [
          {
            title: 'Official KRCE Website',
            url: 'https://www.krce.ac.in/',
          },
        ],
      };
    }

    const uniqueSources = chunks.map((c) => ({
      title: c.title,
      url: c.source,
      snippet: c.content.slice(0, 140) + '...',
    }));

    // If Gemini API is configured, use the LLM with strict grounding prompt
    if (this.geminiClient) {
      try {
        const model = this.geminiClient.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const contextText = chunks.map((c, i) => `[Source ${i + 1}: ${c.title}]\n${c.content}`).join('\n\n');

        const systemInstruction = `You are Campus Assistant for K. Ramakrishnan College of Engineering (KRCE), Trichy.
Answer the student's question accurately, concisely, and helpfully.
IMPORTANT GROUNDING RULES:
1. Ground your answer strictly on the approved Campus Information provided below.
2. If the context does not contain sufficient facts to answer, explicitly state that and refer the student to the official website or relevant office.
3. Keep answers clear, factual, and student-focused. Mention deadlines or office contacts if relevant.
4. Do not speculate or invent dates, fees, or contact details.

APPROVED CAMPUS INFORMATION:
${contextText}
`;

        const prompt = `${systemInstruction}\n\nStudent Question: ${question}\n\nAnswer:`;
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        return {
          answer: responseText.trim(),
          sources: uniqueSources,
        };
      } catch (err) {
        console.warn('Gemini API call failed, falling back to grounded extractive answer:', err);
      }
    }

    // High quality deterministic grounded synthesis fallback (runs offline or without API key)
    const primary = chunks[0];
    let synthesizedAnswer = `${primary.content}`;
    if (chunks.length > 1) {
      synthesizedAnswer += `\n\nAdditionally, related campus records note: ${chunks[1].content}`;
    }

    return {
      answer: synthesizedAnswer,
      sources: uniqueSources,
    };
  }
}

export const ragService = new RagService();
