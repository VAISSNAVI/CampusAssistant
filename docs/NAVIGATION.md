# Navigation Architecture

## 1. Information Hierarchy & Sitemap

```
CampusMate KRCE
|-- Workspace
|   |-- Overview (home)
|   |-- Search campus (search)
|   `-- AI Assistant (assistant)
|-- Explore
|   |-- Campus directory (campus)
|   |-- Resources (documents)
|   |-- Procedures (procedures)
|   |-- Contacts (contacts)
|   |-- Notices (notices)
|   `-- Events (events)
|-- Personal
|   |-- Saved items (saved)
|   `-- My profile (profile)
`-- Manage
    `-- Content admin (admin)
```

## 2. Navigation Flows
### Student Authentication Flow
```
Entry -> Guest/Unauthenticated state
  |-> Explore content, search, ask assistant
  |-> Click "Sign In" -> Auth Modal / Popup
      |-> Email & Password Login OR Register
      |-> Google OAuth Sign-in
  |-> Authenticated State -> Profile displays student details, cloud synced bookmarks
```

### Content Discovery Flow
```
Overview Dashboard
  |-> Click Quick Access Category -> Filtered Campus / Resources View
  |-> Click Notice Row -> Slide-over Detail Drawer
  |-> Click "Ask the assistant" -> AI Assistant View
  |-> Search Box -> Live Search Results -> Slide-over Detail Drawer
```

### Procedure Execution Flow
```
Procedures Directory -> Select Procedure (e.g. Exam Revaluation)
  |-> Drawer opens showing:
      - Title & Description
      - Eligibility criteria
      - Documents required checklist
      - Fees & Processing time
      - Step 1..N instructions
      - Relevant Office Contact & official website link
      - Bookmark action
```

### AI Assistant Flow
```
AI Assistant Screen
  |-> Pick suggested question OR type natural language inquiry
  |-> In-flight thinking indicator
  |-> Grounded response appears
  |-> Expandable "Sources used" link(s) to official KRCE documentation
  |-> Click source -> Opens document in detail drawer or new tab
```
