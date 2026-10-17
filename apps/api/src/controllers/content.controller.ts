import { Request, Response } from 'express';
import { dbService } from '../services/db.service';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import { searchRequestSchema } from '@campus-assistant/validation';

export async function getContentBundle(req: Request, res: Response) {
  const bundle = await dbService.getContentBundle();
  return res.json(bundle);
}

export async function getCategories(req: Request, res: Response) {
  const categories = await dbService.getCategories();
  return res.json(categories);
}

export async function getCategoryById(req: Request, res: Response) {
  const cat = await dbService.getCategoryById(req.params.id);
  if (!cat) return res.status(404).json({ error: 'Category not found' });
  return res.json(cat);
}

export async function getDocuments(req: Request, res: Response) {
  const { category, status } = req.query as { category?: string; status?: string };
  const docs = await dbService.getDocuments(category, status);
  return res.json(docs);
}

export async function getDocumentById(req: Request, res: Response) {
  const doc = await dbService.getDocumentById(req.params.id);
  if (!doc) return res.status(404).json({ error: 'Document not found' });
  return res.json(doc);
}

export async function getProcedures(req: Request, res: Response) {
  const { category } = req.query as { category?: string };
  const procs = await dbService.getProcedures(category);
  return res.json(procs);
}

export async function getProcedureById(req: Request, res: Response) {
  const proc = await dbService.getProcedureById(req.params.id);
  if (!proc) return res.status(404).json({ error: 'Procedure not found' });
  return res.json(proc);
}

export async function getContacts(req: Request, res: Response) {
  const contacts = await dbService.getContacts();
  return res.json(contacts);
}

export async function getContactById(req: Request, res: Response) {
  const con = await dbService.getContactById(req.params.id);
  if (!con) return res.status(404).json({ error: 'Contact not found' });
  return res.json(con);
}

export async function getNotices(req: Request, res: Response) {
  const notices = await dbService.getNotices();
  return res.json(notices);
}

export async function getNoticeById(req: Request, res: Response) {
  const notice = await dbService.getNoticeById(req.params.id);
  if (!notice) return res.status(404).json({ error: 'Notice not found' });
  return res.json(notice);
}

export async function getEvents(req: Request, res: Response) {
  const events = await dbService.getEvents();
  return res.json(events);
}

export async function getEventById(req: Request, res: Response) {
  const event = await dbService.getEventById(req.params.id);
  if (!event) return res.status(404).json({ error: 'Event not found' });
  return res.json(event);
}

export async function search(req: Request, res: Response) {
  const parsed = searchRequestSchema.parse(req.query);
  const items = await dbService.search(parsed.q || '', parsed.category);
  return res.json({
    query: parsed.q || '',
    total: items.length,
    items,
  });
}

export async function getBookmarks(req: AuthenticatedRequest, res: Response) {
  const userId = req.user?.id || 'guest';
  const bookmarks = await dbService.getBookmarks(userId);
  return res.json(bookmarks);
}

export async function addBookmark(req: AuthenticatedRequest, res: Response) {
  const userId = req.user?.id || 'guest';
  const { entityType, entityId } = req.params;
  const item = await dbService.addBookmark(userId, entityType, entityId);
  return res.json(item);
}

export async function removeBookmark(req: AuthenticatedRequest, res: Response) {
  const userId = req.user?.id || 'guest';
  const { entityType, entityId } = req.params;
  const result = await dbService.removeBookmark(userId, entityType, entityId);
  return res.json(result);
}
