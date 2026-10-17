import { initialCampusData } from './seed-data';
import bcrypt from 'bcryptjs';

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'STUDENT' | 'ADMIN';
  departmentId?: string;
  year?: number;
}

class CampusDatabaseService {
  private users: StoredUser[] = [];
  private categories = [...initialCampusData.categories];
  private documents = [...initialCampusData.documents];
  private faqs = [...initialCampusData.faqs];
  private contacts = [...initialCampusData.contacts];
  private procedures = [...initialCampusData.procedures];
  private notices = [...initialCampusData.notices];
  private events = [...initialCampusData.events];
  private bookmarks: Array<{ id: string; userId: string; entityType: string; entityId: string; createdAt: string }> = [];
  private sessions: Array<{ id: string; userId?: string; title: string; createdAt: string }> = [];
  private messages: Array<{ id: string; sessionId: string; role: string; content: string; sources?: any; createdAt: string }> = [];

  constructor() {
    this.initDefaultUsers();
  }

  private async initDefaultUsers() {
    const salt = bcrypt.genSaltSync(10);
    this.users = [
      {
        id: 'user-admin',
        name: 'KRCE Administrator',
        email: 'admin@krce.ac.in',
        passwordHash: bcrypt.hashSync('Admin@12345', salt),
        role: 'ADMIN',
      },
      {
        id: 'user-student',
        name: 'Arun Kumar',
        email: 'student@krce.ac.in',
        passwordHash: bcrypt.hashSync('Student@12345', salt),
        role: 'STUDENT',
        year: 3,
      },
    ];
  }

  // --- Users & Auth ---
  async findUserByEmail(email: string) {
    return this.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  async findUserById(id: string) {
    return this.users.find((u) => u.id === id);
  }

  async createUser(data: Omit<StoredUser, 'id'>) {
    const user: StoredUser = {
      id: 'usr-' + Math.random().toString(36).substring(2, 9),
      ...data,
    };
    this.users.push(user);
    return user;
  }

  // --- Content Bundle ---
  async getContentBundle() {
    return {
      categories: this.categories,
      documents: this.documents.filter((d) => d.status === 'published'),
      faqs: this.faqs.filter((f) => f.status === 'published'),
      contacts: this.contacts.filter((c) => c.status === 'published'),
      procedures: this.procedures.filter((p) => p.status === 'published'),
      notices: this.notices.filter((n) => n.status === 'published'),
      events: this.events.filter((e) => e.status === 'published'),
    };
  }

  // --- Categories ---
  async getCategories() {
    return this.categories;
  }

  async getCategoryById(id: string) {
    return this.categories.find((c) => c.id === id);
  }

  // --- Documents ---
  async getDocuments(category?: string, status?: string) {
    return this.documents.filter((d) => {
      if (category && category !== 'all' && d.category !== category) return false;
      if (status && d.status !== status) return false;
      return true;
    });
  }

  async getDocumentById(id: string) {
    return this.documents.find((d) => d.id === id);
  }

  // --- Procedures ---
  async getProcedures(category?: string) {
    return this.procedures.filter((p) => {
      if (category && category !== 'all' && p.category !== category) return false;
      return true;
    });
  }

  async getProcedureById(id: string) {
    return this.procedures.find((p) => p.id === id);
  }

  // --- Contacts ---
  async getContacts() {
    return this.contacts;
  }

  async getContactById(id: string) {
    return this.contacts.find((c) => c.id === id);
  }

  // --- Notices ---
  async getNotices() {
    return this.notices;
  }

  async getNoticeById(id: string) {
    return this.notices.find((n) => n.id === id);
  }

  // --- Events ---
  async getEvents() {
    return this.events;
  }

  async getEventById(id: string) {
    return this.events.find((e) => e.id === id);
  }

  // --- Bookmarks ---
  async getBookmarks(userId: string) {
    return this.bookmarks.filter((b) => b.userId === userId);
  }

  async addBookmark(userId: string, entityType: string, entityId: string) {
    const existing = this.bookmarks.find(
      (b) => b.userId === userId && b.entityType === entityType && b.entityId === entityId
    );
    if (!existing) {
      const b = {
        id: 'bm-' + Date.now(),
        userId,
        entityType,
        entityId,
        createdAt: new Date().toISOString(),
      };
      this.bookmarks.push(b);
      return b;
    }
    return existing;
  }

  async removeBookmark(userId: string, entityType: string, entityId: string) {
    this.bookmarks = this.bookmarks.filter(
      (b) => !(b.userId === userId && b.entityType === entityType && b.entityId === entityId)
    );
    return { success: true };
  }

  // --- Search ---
  async search(query: string, category?: string) {
    const q = (query || '').toLowerCase().trim();
    const allItems: any[] = [
      ...this.documents.map((d) => ({ ...d, _type: 'documents' })),
      ...this.faqs.map((f) => ({ ...f, _type: 'faqs', title: f.question, content: f.answer })),
      ...this.contacts.map((c) => ({ ...c, _type: 'contacts', title: c.name, content: c.designation })),
      ...this.procedures.map((p) => ({ ...p, _type: 'procedures', content: p.description })),
      ...this.notices.map((n) => ({ ...n, _type: 'notices' })),
      ...this.events.map((e) => ({ ...e, _type: 'events', content: e.description })),
    ];

    return allItems.filter((item) => {
      if (category && category !== 'all' && item.category !== category) return false;
      if (!q) return true;
      const haystack = `${item.title || ''} ${item.name || ''} ${item.question || ''} ${item.content || ''} ${item.description || ''} ${item.designation || ''} ${item.category || ''}`.toLowerCase();
      return haystack.includes(q);
    });
  }

  // --- Admin CRUD ---
  async getAdminItems(type: string) {
    switch (type) {
      case 'documents':
        return this.documents;
      case 'faqs':
        return this.faqs;
      case 'contacts':
        return this.contacts;
      case 'procedures':
        return this.procedures;
      case 'notices':
        return this.notices;
      case 'events':
        return this.events;
      case 'categories':
        return this.categories;
      default:
        return this.documents;
    }
  }

  async upsertAdminItem(type: string, itemData: any) {
    const targetArray = (this as any)[type];
    if (!targetArray) throw new Error(`Unknown type: ${type}`);

    const id = itemData.id || `${type.slice(0, 3)}-${Date.now()}`;
    const existingIndex = targetArray.findIndex((i: any) => i.id === id);

    const record = {
      ...itemData,
      id,
      updatedAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      targetArray[existingIndex] = { ...targetArray[existingIndex], ...record };
      return targetArray[existingIndex];
    } else {
      record.createdAt = new Date().toISOString();
      targetArray.unshift(record);
      return record;
    }
  }

  async deleteAdminItem(type: string, id: string) {
    const targetArray = (this as any)[type];
    if (!targetArray) throw new Error(`Unknown type: ${type}`);

    (this as any)[type] = targetArray.filter((i: any) => i.id !== id);
    return { success: true };
  }

  // --- Sessions & Messages ---
  async createSession(userId?: string, title?: string) {
    const session = {
      id: 'sess-' + Date.now(),
      userId,
      title: title || 'Campus Inquiry',
      createdAt: new Date().toISOString(),
    };
    this.sessions.push(session);
    return session;
  }

  async getSessions(userId?: string) {
    if (!userId) return this.sessions.slice(-10);
    return this.sessions.filter((s) => s.userId === userId);
  }

  async addMessage(sessionId: string, role: string, content: string, sources?: any) {
    const msg = {
      id: 'msg-' + Date.now(),
      sessionId,
      role,
      content,
      sources,
      createdAt: new Date().toISOString(),
    };
    this.messages.push(msg);
    return msg;
  }

  async getSessionMessages(sessionId: string) {
    return this.messages.filter((m) => m.sessionId === sessionId);
  }
}

export const dbService = new CampusDatabaseService();
