# Campus Assistant - Product Specification

## 1. Product Overview
Campus Assistant (CampusMate for KRCE) is an intelligent, mobile-first and web student information platform designed specifically for K. Ramakrishnan College of Engineering (KRCE), Trichy. It centralizes campus information, administrative procedures, official notices, academic schedules, and provides a grounded AI assistant powered by Retrieval-Augmented Generation (RAG).

## 2. Core Value Proposition
- **Centralized Knowledge**: Consolidates fragmented information across academic departments, controller of examinations, library, hostel, placement cell, and administrative offices.
- **Natural Language Assistant**: Students ask natural-language questions and receive answers strictly grounded in official KRCE documents, with transparent citations and zero hallucinations.
- **Administrative Transparency**: Step-by-step procedures detailing eligibility, required documents, fees, and office contacts for campus procedures (admission, revaluation, bonafide certificates).
- **Decoupled Admin Panel**: Authorized administrators can create, edit, publish, archive, and re-index campus knowledge or scrape/import public announcements from official college sources without needing an app release.

## 3. User Personas
### Student
- **Goals**: Quick access to exam schedules, syllabus, circulars, bus routes, mess menus, procedure steps, and direct contact numbers.
- **Capabilities**: Global search, browse campus categories, ask AI assistant questions, bookmark items, view notices and events, manage personal profile.

### Administrator
- **Goals**: Publish announcements, update FAQs and procedures, import official pages, review drafted content, and trigger vector re-indexing for AI.
- **Capabilities**: Full CRUD over documents, categories, FAQs, notices, events, contacts, and procedures. Vector re-indexing trigger and scraping tool.

## 4. Key Functional Modules
1. **Overview / Home Dashboard**: Hero greeting, quick category access, live notice updates, popular campus resources.
2. **Global Search**: Deterministic full-text and semantic keyword search with category filtering.
3. **AI Assistant with RAG**: Grounded question-answering with official KRCE document sources and safe out-of-domain fallback.
4. **Campus Directory**: Hierarchical campus taxonomy (Academics, Administration, Examinations, Hostel, Library, Placements, Transport).
5. **Procedures Guide**: Actionable procedural workflows with document checklists, eligibility, fees, processing time, and ordered steps.
6. **Contacts Directory**: Direct phone, email, and campus office location directory.
7. **Notices & Events**: Timely announcements and campus event calendar.
8. **Bookmarks (Saved Items)**: Persistent local and cloud bookmarks.
9. **Authentication & Profile**: JWT and Google OAuth authentication with role-based access.
10. **Admin CMS**: Content management dashboard with status lifecycle (draft, published, archived) and webpage importer.
