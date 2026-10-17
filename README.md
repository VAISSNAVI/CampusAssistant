# Campus Assistant (CampusMate for KRCE)

> **End-to-End Student Information Platform & Grounded AI Assistant**  
> *Internet-connected • React Native (Expo) • React/Next Admin • Node.js Express • SQLite • Gemini RAG*

UI Reference: [CampusMate for KRCE](https://campusmate-for-krce-04tdif.v2.appdeploy.ai/)  
Institution: **K. Ramakrishnan College of Engineering (Autonomous), Samayapuram, Tiruchirappalli, Tamil Nadu**

---

## 1. Overview & Key Capabilities

Campus Assistant is a full-stack, mobile and web student information platform designed to centralize fragmented campus resources, provide step-by-step administrative procedures, and deliver intelligent, source-grounded answers powered by Retrieval-Augmented Generation (RAG).

- **Overview Dashboard**: Hero banner, quick access cards for Academics, Examinations, Library, and Procedures, live notices, and frequently used links.
- **Global Search**: Deterministic keyword and semantic search across documents, procedures, FAQs, notices, and contacts.
- **Grounded AI Assistant**: Students ask natural-language inquiries and receive verified answers with transparent citations to official KRCE sources.
- **Administrative Procedures**: Step-by-step checklists with eligibility criteria, required documents, fee structures, processing times, and department contacts.
- **Contacts Directory**: Direct phone (`tel:`), email (`mailto:`), and physical campus office locations.
- **Content Administration (CMS)**: Authorized administrators can add, edit, publish, and archive content, trigger vector re-indexing, or extract and draft public notices from `https://krce.ac.in/`.
- **Saved Items (Bookmarks)**: Offline-first student bookmarking.

---

## 2. Monorepo Architecture

```
campus-assistant/
|-- apps/
|   |-- admin/            # React + Vite web application with the exact reference UI
|   |-- api/              # Node.js + Express + Prisma + RAG backend
|   `-- mobile/           # React Native + Expo Router student mobile app
|-- packages/
|   |-- shared-types/     # Shared TypeScript domain definitions
|   `-- validation/       # Shared Zod validation schemas
|-- docs/                 # Architectural specifications
|   |-- PRODUCT-SPEC.md
|   |-- NAVIGATION.md
|   |-- UI-SCREEN-SPEC.md
|   |-- DATABASE.md
|   |-- API.md
|   |-- AI-RAG.md
|   |-- ARCHITECTURE.md
|   `-- VIBE-CODING-RULES.md
|-- docker-compose.yml    # API container with persistent SQLite storage
|-- package.json          # Monorepo workspaces and scripts
|-- .env.example          # Environment variables template
`-- README.md
```

---

## 3. Quickstart: Clone-and-Run Contract

### Prerequisites
- Node.js `v18+` or `v20+` (Tested on Node `v24`)
- npm `v9+` or `v10+`
- (Optional) Docker & Docker Compose

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment
```bash
cp .env.example .env
```
*(SQLite stores data in `apps/api/data/dev.db`. If `GEMINI_API_KEY` is not provided, the assistant uses built-in grounded extractive synthesis with citations.)*

### Step 3: Run Database Migrations & Seed
```bash
npm run db:migrate
npm run db:seed
```

### Step 4: Start Development Servers
To start the Web Application (CampusMate UI):
```bash
npm run dev:web
```
Access the application at: `http://localhost:3001`

To start the Express REST API:
```bash
npm run dev:api
```
API runs on: `http://localhost:3000` (Health check at `http://localhost:3000/health`)

To run both concurrently:
```bash
npm run dev:all
```

---

## 4. Default Seed & Test Accounts

| Role | Email | Password | Access |
|---|---|---|---|
| **Administrator** | `admin@krce.ac.in` | `Admin@12345` | Content Admin, Scraper, CRUD, Re-index |
| **Student** | `student@krce.ac.in` | `Student@12345` | Student profile, search, RAG, bookmarks |

---

## 5. Running Tests

Execute the unit and API integration test suite:
```bash
npm test
```

Tests cover:
- Health check endpoints
- JWT user registration and authentication
- Rejection of invalid credentials
- Global campus search
- Grounded RAG with source citations
- Safe fallback responses for out-of-domain inquiries

---

## 6. Official Website & Support
- Official KRCE Portal: [https://www.krce.ac.in/](https://www.krce.ac.in/)
- TNEA Counselling Code: **3814**
- Campus Address: NH 45, Samayapuram, Tiruchirappalli, Tamil Nadu 621112
