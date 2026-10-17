# UI Screen Specification & Design System

## 1. Visual Language & Design Tokens
Based directly on `CampusMate for KRCE` (`https://campusmate-for-krce-04tdif.v2.appdeploy.ai/`):

- **Typography**:
  - Primary Font: `DM Sans`, sans-serif
  - Header & Brand Font: `Manrope`, sans-serif (800 weight for headlines)
- **Color Palette**:
  - Background: `#f6f8fa`
  - Text Primary: `#193744`
  - Text Muted: `#73838d`, `#87959c`, `#96a6ae`
  - Primary Teal/Blue: `#1d6079`, `#1e6b85`, `#206b85`, `#2785a2`
  - Hero Card Gradient: `#1d536b` to `#1b465d`
  - Card Border / Separators: `#e5edef`, `#dfe7ea`
  - Active Nav / Pill Background: `#eaf5f8`, `#f1f7f8`
  - Success / Info Accents: `#b5e4d8`, `#a6d7e2`
  - Warning / Danger: `#e05252`, `#d9534f`
  - Toast Dark: `#173f50`

## 2. Layout Structure
- **Persistent Left Sidebar (248px desktop, slide drawer on mobile)**:
  - Brand Mark: 40x40 rounded teal badge with icon
  - Brand Title: **Campus**<span style="color:#2785a2">mate</span>
  - Subtitle: `KRCE STUDENT HUB`
  - Campus Pill: `K. Ramakrishnan College of Engineering • Trichy`
  - Navigation Groups with small uppercase labels: `WORKSPACE`, `EXPLORE`, `PERSONAL`, `MANAGE`
  - Sidebar Bottom: Help Card ("Need a hand? Ask the campus assistant.") and official link to `https://www.krce.ac.in/`
- **Sticky Topbar (66px height)**:
  - Mobile Menu Hamburger Toggle (displayed `< 760px`)
  - Dynamic Breadcrumbs (`KRCE / Overview`, `KRCE / Search campus`, etc.)
  - User Chip ("Student" / user display name)
  - Action Button ("Sign In" / "Sign Out")
- **Main Content Container**:
  - Max width 1400px, responsive padding (36px desktop down to 14px mobile)
  - Eyebrow header: `K. RAMAKRISHNAN COLLEGE OF ENGINEERING`

## 3. Screen Specifications
### 3.1 Overview (Home)
- **Hero Card**: Dark teal rounded banner (min-height 265px) with headline:
  `YOUR CAMPUS COMPANION` - "Everything campus. One simple place. Find answers, discover resources and stay in the loop with KRCE." CTA button: "Ask the assistant".
- **Quick Access Grid**: 4 columns (Academics, Examinations, Library, Procedures).
- **Two-Column Split**:
  - Left (1.15fr): "Latest updates" notice list.
  - Right (1fr): "Frequently used" shortcut links.
- **Popular Resources Grid**: 2-column card grid with icon, category badge, excerpt, and bookmark action.

### 3.2 Search Campus
- Search bar with clear button and magnifying glass.
- Category dropdown filter.
- Dynamic count: `Showing X campus items`.
- Responsive resource card grid.

### 3.3 AI Assistant
- Split view: Left Chat Panel, Right "Try asking" suggestions card.
- Chat stream with distinct user message bubbles and assistant responses.
- Grounded answer citations badge: "Sources used: [Title](source)".
- Input composer with Send icon and disclaimer notice.

### 3.4 Procedures Guide
- Procedure cards with step count badge and category.
- Detail drawer with Eligibility, Documents Checklist, Fees, Time, and Step-by-Step guides.

### 3.5 Contacts Directory
- Card view of campus offices and officials with direct `tel:` and `mailto:` links, plus physical office location.

### 3.6 Slide-Over Detail Drawer
- Fixed slide-in drawer on the right (max-width 530px).
- Full item content, metadata, official source button, and bookmark toggle.
