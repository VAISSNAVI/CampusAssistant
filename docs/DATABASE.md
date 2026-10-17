# Database Schema Specification

## 1. Relational & Vector Storage Architecture
The application uses SQLite via Prisma. The local database file is `apps/api/data/dev.db`. Run `npm run db:migrate` to create or update its tables, then `npm run db:seed` to load starter data. Vector embeddings are not stored in this SQLite schema; retrieval uses the application’s available text search and Gemini integration.

## 2. Table Schemas

### `users`
- `id`: UUID primary key
- `name`: String
- `email`: String (unique)
- `passwordHash`: String? (null for Google OAuth)
- `googleId`: String? (unique)
- `role`: Enum (`STUDENT`, `ADMIN`) default `STUDENT`
- `departmentId`: UUID foreign key?
- `year`: Int?
- `createdAt`: DateTime
- `updatedAt`: DateTime

### `departments`
- `id`: UUID primary key
- `name`: String (e.g. "Computer Science and Engineering")
- `code`: String (e.g. "CSE")

### `categories`
- `id`: String primary key (e.g. "academics", "administration", "examinations", "hostel", "library", "placements", "transport")
- `name`: String
- `description`: String?
- `parentId`: String? (self-referential foreign key)

### `documents`
- `id`: String primary key
- `title`: String
- `content`: Text
- `categoryId`: String foreign key -> `categories.id`
- `source`: String (official URL)
- `status`: Enum (`draft`, `published`, `archived`) default `published`
- `version`: Int default 1
- `publishedAt`: DateTime?
- `createdAt`: DateTime
- `updatedAt`: DateTime

### `document_chunks`
- `id`: UUID primary key
- `documentId`: String foreign key -> `documents.id` (on delete cascade)
- `chunkText`: Text
- `chunkIndex`: Int
- `embedding`: Unsupported("vector(768)")? or vector array
- `metadata`: JSON?

### `faqs`
- `id`: String primary key
- `question`: String
- `answer`: Text
- `categoryId`: String foreign key -> `categories.id`
- `source`: String?
- `status`: Enum (`draft`, `published`, `archived`) default `published`
- `createdAt`: DateTime
- `updatedAt`: DateTime

### `contacts`
- `id`: String primary key
- `name`: String
- `designation`: String
- `departmentId`: UUID?
- `phone`: String?
- `email`: String?
- `location`: String?
- `source`: String?
- `status`: Enum (`draft`, `published`, `archived`) default `published`
- `createdAt`: DateTime
- `updatedAt`: DateTime

### `procedures`
- `id`: String primary key
- `title`: String
- `description`: Text
- `categoryId`: String foreign key -> `categories.id`
- `eligibility`: String?
- `documentsRequired`: JSON (array of strings)
- `fees`: String?
- `processingTime`: String?
- `source`: String?
- `status`: Enum (`draft`, `published`, `archived`) default `published`
- `createdAt`: DateTime
- `updatedAt`: DateTime

### `procedure_steps`
- `id`: UUID primary key
- `procedureId`: String foreign key -> `procedures.id` (on delete cascade)
- `stepNumber`: Int
- `title`: String
- `description`: Text?

### `notices`
- `id`: String primary key
- `title`: String
- `content`: Text
- `categoryId`: String foreign key -> `categories.id`
- `source`: String?
- `publishedAt`: DateTime default now()
- `expiresAt`: DateTime?
- `issuedBy`: String?
- `status`: Enum (`draft`, `published`, `archived`) default `published`
- `createdAt`: DateTime

### `events`
- `id`: String primary key
- `title`: String
- `description`: Text
- `categoryId`: String foreign key -> `categories.id`
- `location`: String?
- `source`: String?
- `startsAt`: DateTime
- `endsAt`: DateTime?
- `status`: Enum (`draft`, `published`, `archived`) default `published`
- `createdAt`: DateTime

### `bookmarks`
- `id`: UUID primary key
- `userId`: UUID foreign key -> `users.id`
- `entityType`: String (`documents`, `procedures`, `contacts`, `notices`, `events`)
- `entityId`: String
- `createdAt`: DateTime

### `chat_sessions`
- `id`: UUID primary key
- `userId`: UUID foreign key? -> `users.id`
- `title`: String
- `createdAt`: DateTime
- `updatedAt`: DateTime

### `chat_messages`
- `id`: UUID primary key
- `sessionId`: UUID foreign key -> `chat_sessions.id` (on delete cascade)
- `role`: Enum (`user`, `assistant`, `system`)
- `content`: Text
- `sources`: JSON?
- `createdAt`: DateTime
