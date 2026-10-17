# AI / RAG Architecture & Grounding Rules

## 1. RAG Workflow
```
POST /api/assistant/chat
  |
  v
1. Request Validation (Zod schema checking)
  |
  v
2. Query Normalization & Intent Detection
  |
  v
3. Hybrid Retrieval
  +-- Keyword Search (substring matching on titles, content, and FAQs)
  +-- Semantic Vector Search (Gemini text-embedding-004 + pgvector cosine similarity)
  |
  v
4. Re-Ranking & Score Normalization
  |
  v
5. Relevance Threshold Check
  |-- Score >= threshold -> Build Grounded Prompt with retrieved context chunks
  `-- Score < threshold  -> Safe Fallback Response ("I could not find official information regarding... Please check krce.ac.in")
  |
  v
6. Generation via Gemini API
  (Model: gemini-1.5-flash / gemini-2.0-flash, temperature: 0.2, strict campus grounded prompt)
  |
  v
7. Output Formatting
  Returns { answer: string, sources: [ { title, url, snippet } ] }
```

## 2. Safety & Grounding Principles
- **No Hallucination**: The system instructions explicitly enforce answering exclusively from the provided campus context for factual inquiries.
- **Source Transparency**: Every answer must identify which KRCE official pages or documents were utilized.
- **Graceful Degradation**: If `GEMINI_API_KEY` is not present, the system employs an intelligent grounded retrieval fallback, ensuring zero service disruption during local evaluations or testing.
- **Credential Protection**: The mobile and frontend clients NEVER receive or store AI API keys. All inference and vector operations reside strictly on the backend.
