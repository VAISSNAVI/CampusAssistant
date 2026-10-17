import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import * as contentController from '../controllers/content.controller';
import * as assistantController from '../controllers/assistant.controller';
import * as adminController from '../controllers/admin.controller';
import { authenticate, optionalAuthenticate, requireRole } from '../middleware/auth.middleware';

const router = Router();

// --- Auth Routes ---
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/logout', authController.logout);
router.post('/auth/forgot-password', authController.forgotPassword);
router.get('/auth/me', authenticate, authController.getMe);

// --- Core Campus Content Routes ---
router.get('/content', contentController.getContentBundle);
router.get('/categories', contentController.getCategories);
router.get('/categories/:id', contentController.getCategoryById);

router.get('/documents', contentController.getDocuments);
router.get('/documents/:id', contentController.getDocumentById);

router.get('/procedures', contentController.getProcedures);
router.get('/procedures/:id', contentController.getProcedureById);

router.get('/contacts', contentController.getContacts);
router.get('/contacts/:id', contentController.getContactById);

router.get('/notices', contentController.getNotices);
router.get('/notices/:id', contentController.getNoticeById);

router.get('/events', contentController.getEvents);
router.get('/events/:id', contentController.getEventById);

// --- Search Route ---
router.get('/search', contentController.search);

// --- Bookmarks Routes ---
router.get('/bookmarks', optionalAuthenticate, contentController.getBookmarks);
router.post('/bookmarks/:entityType/:entityId', optionalAuthenticate, contentController.addBookmark);
router.delete('/bookmarks/:entityType/:entityId', optionalAuthenticate, contentController.removeBookmark);

// --- AI Assistant Routes ---
router.post('/assistant/chat', optionalAuthenticate, assistantController.chat);
router.get('/assistant/sessions', optionalAuthenticate, assistantController.getSessions);
router.get('/assistant/sessions/:id', assistantController.getSessionDetail);
router.delete('/assistant/sessions/:id', assistantController.deleteSession);

// --- Admin Content Management Routes ---
router.get('/admin/items', adminController.getAdminItems);
router.post('/admin/items', adminController.createAdminItem);
router.put('/admin/items/:id', adminController.updateAdminItem);
router.delete('/admin/items/:id', adminController.deleteAdminItem);
router.post('/admin/reindex', adminController.reindexKnowledge);
router.post('/admin/scrape', adminController.scrapePage);

export default router;
