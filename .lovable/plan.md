## Plan: Public University Discovery Platform

### Architecture
- Add a "Switch to Public Site" button in the CRM dashboard navbar
- Add a "Back to Dashboard" button on the public site
- Use separate route structure: `/public/*` for public pages, `/` for CRM dashboard

### Phase 1: Foundation
1. **Mock data** - Universities, programs, scholarships (`src/data/mockUniversities.ts`)
2. **Public layout** - Header/footer for public pages (`src/components/public/PublicLayout.tsx`)
3. **Compare context** - Global state for comparison selections (`src/contexts/CompareContext.tsx`)

### Phase 2: Public Pages
4. **Homepage** - Hero search, featured universities, CTA
5. **University Listing** (`/public/universities`) - Cards with filters, compare toggle
6. **University Detail** (`/public/universities/:id`) - Tabs: Overview, Programs, Scholarships, Contact
7. **Program cards** inside university detail with compare functionality

### Phase 3: Comparison System
8. **Sticky Compare Bar** - Global component showing selected items
9. **University Compare Page** (`/public/compare/universities`)
10. **Program Compare Page** (`/public/compare/programs`) - With highlight best values

### Phase 4: Integration
11. **Route setup** - Add all public routes to App.tsx
12. **Switch button** - Add toggle between CRM and Public views in navbar

### Not included (future):
- Login/signup, saved comparisons, dashboard for students (needs backend)
- These will be UI-only placeholders for now

### Design
- Primary blue `#065CA9`, clean minimal SaaS style
- Rounded cards, soft shadows, strong typography
- Mobile-responsive with card layouts
