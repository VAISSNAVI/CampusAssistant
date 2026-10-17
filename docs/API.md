# REST API Specification

Base URL: `/api`

## 1. Authentication
- `POST /api/auth/register`
  - Body: `{ name, email, password, departmentId?, year? }`
  - Returns: `{ user, token }`
- `POST /api/auth/login`
  - Body: `{ email, password }`
  - Returns: `{ user, token }`
- `POST /api/auth/refresh`
  - Body: `{ refreshToken }`
  - Returns: `{ token }`
- `POST /api/auth/logout`
  - Headers: `Authorization: Bearer <token>`
- `GET /api/auth/me`
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ user }`

## 2. Content & Categories
- `GET /api/content`
  - Returns bundled active campus dataset:
    `{ categories, documents, faqs, contacts, procedures, notices, events }`
- `GET /api/categories`
  - Returns: `[ { id, name, description } ]`
- `GET /api/categories/:id`
  - Returns category detail with related items.

## 3. Documents
- `GET /api/documents`
  - Query: `category`, `status`, `page`, `limit`
- `GET /api/documents/:id`

## 4. Search
- `GET /api/search?q=&category=&page=`
  - Returns: `{ query, total, items: [ ... ] }`

## 5. Assistant & RAG
- `POST /api/assistant/chat`
  - Body: `{ question: string, history?: [ { role, content } ], sessionId?: string }`
  - Returns: `{ answer: string, sources: [ { title, url, snippet } ] }`
- `GET /api/assistant/sessions`
- `GET /api/assistant/sessions/:id`
- `DELETE /api/assistant/sessions/:id`

## 6. Procedures
- `GET /api/procedures`
- `GET /api/procedures/:id`

## 7. Contacts
- `GET /api/contacts`
- `GET /api/contacts/:id`

## 8. Notices & Events
- `GET /api/notices`
- `GET /api/notices/:id`
- `GET /api/events`
- `GET /api/events/:id`

## 9. Bookmarks
- `GET /api/bookmarks`
  - Headers: `Authorization: Bearer <token>`
- `POST /api/bookmarks/:entityType/:entityId`
- `DELETE /api/bookmarks/:entityType/:entityId`

## 10. Admin Content Management
- `GET /api/admin/items?type=<documents|faqs|notices|events|contacts|procedures|categories>`
- `POST /api/admin/items`
  - Body: `{ type, item: { ... } }`
- `PUT /api/admin/items/:id`
  - Body: `{ type, item: { ... } }`
- `DELETE /api/admin/items/:id?type=<entityType>`
- `POST /api/admin/reindex`
  - Triggers chunking and vector embedding regeneration.
- `POST /api/admin/scrape`
  - Body: `{ url: string }`
  - Extracts title and content from `https://krce.ac.in/*` and saves as draft.
