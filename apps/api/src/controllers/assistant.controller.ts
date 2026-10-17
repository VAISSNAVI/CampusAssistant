import { Request, Response } from 'express';
import { chatRequestSchema } from '@campus-assistant/validation';
import { ragService } from '../services/rag.service';
import { dbService } from '../services/db.service';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export async function chat(req: AuthenticatedRequest, res: Response) {
  const { question, history, sessionId } = chatRequestSchema.parse(req.body);
  const userId = req.user?.id;

  // Ensure or create session
  let activeSessionId = sessionId;
  if (!activeSessionId) {
    const session = await dbService.createSession(userId, question.slice(0, 30));
    activeSessionId = session.id;
  }

  // Store user message
  await dbService.addMessage(activeSessionId, 'user', question);

  // Invoke Grounded RAG
  const result = await ragService.answerQuestion(question, history);

  // Store assistant message
  await dbService.addMessage(activeSessionId, 'assistant', result.answer, result.sources);

  return res.json({
    answer: result.answer,
    sources: result.sources,
    sessionId: activeSessionId,
  });
}

export async function getSessions(req: AuthenticatedRequest, res: Response) {
  const userId = req.user?.id;
  const sessions = await dbService.getSessions(userId);
  return res.json(sessions);
}

export async function getSessionDetail(req: Request, res: Response) {
  const { id } = req.params;
  const messages = await dbService.getSessionMessages(id);
  return res.json({ id, messages });
}

export async function deleteSession(req: Request, res: Response) {
  return res.json({ success: true });
}
