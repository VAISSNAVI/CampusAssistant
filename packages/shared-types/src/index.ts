export type UserRole = 'STUDENT' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  departmentId?: string | null;
  year?: number | null;
  createdAt?: string | Date;
}

export type ContentStatus = 'draft' | 'published' | 'archived';

export interface Category {
  id: string;
  name: string;
  description?: string | null;
  parentId?: string | null;
}

export interface DocumentItem {
  id: string;
  title: string;
  content: string;
  category: string;
  source: string;
  status: ContentStatus;
  version?: number;
  publishedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  source?: string;
  status: ContentStatus;
  createdAt?: string;
}

export interface ContactItem {
  id: string;
  name: string;
  designation: string;
  phone?: string;
  email?: string;
  location?: string;
  source?: string;
  status: ContentStatus;
  createdAt?: string;
}

export interface ProcedureItem {
  id: string;
  title: string;
  description: string;
  category: string;
  eligibility?: string;
  documentsRequired: string[];
  fees?: string;
  processingTime?: string;
  steps: string[];
  source?: string;
  status: ContentStatus;
  createdAt?: string;
}

export interface NoticeItem {
  id: string;
  title: string;
  content: string;
  category: string;
  source?: string;
  publishedAt?: string;
  status: ContentStatus;
  createdAt?: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  category: string;
  location?: string;
  date?: string;
  source?: string;
  status: ContentStatus;
  createdAt?: string;
}

export interface BookmarkItem {
  id: string;
  userId: string;
  entityType: 'documents' | 'procedures' | 'contacts' | 'notices' | 'events' | 'faqs';
  entityId: string;
  createdAt: string;
}

export interface ChatSource {
  title: string;
  url: string;
  snippet?: string;
}

export interface ChatMessage {
  id?: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  sources?: ChatSource[];
  createdAt?: string;
}

export interface ContentBundle {
  categories: Category[];
  documents: DocumentItem[];
  faqs: FAQItem[];
  contacts: ContactItem[];
  procedures: ProcedureItem[];
  notices: NoticeItem[];
  events: EventItem[];
}

export interface SearchResult {
  query: string;
  total: number;
  items: Array<(DocumentItem | FAQItem | ContactItem | ProcedureItem | NoticeItem | EventItem) & { _type: string }>;
}
