# Building Type Page Standards & Migration Guide

## 1. Executive Summary
This document defines the naming conventions, technical standards, and maintenance procedures for the "Building Types" section of the Greenheck website. It serves as the single source of truth for adding new building type pages (e.g., Warehouses, Office Buildings) and refactoring existing ones.

## 2. Naming Convention Standards

### 2.1. Navigation Labels (User Facing)
**Rule:** Use **Plural Nouns** or **Broad Sector Names**.
**Rationale:** "Building Types" implies a category/sector, not a single object. Pluralization suggests breadth of solutions.

| Category | Rule | Example |
| :--- | :--- | :--- |
| **Sectors** | Use standard industry sector name. | *Healthcare*, *Education*, *Manufacturing* |
| **Building Types** | Use Plural Nouns. | *Warehouses*, *Restaurants*, *Office Buildings* |
| **Adjectives** | Avoid standalone adjectives; add context. | *Multi-Family Housing* (not just "Multi-Family") |

### 2.2. URL Slugs & File Names
**Rule:** `kebab-case` derived from the navigation label.
**Pattern:** `[label-in-kebab-case].html` or `/building-type/[label-in-kebab-case]`

| Navigation Label | Recommended Slug/File |
| :--- | :--- |
| K-12 Education | `k-12-education.html` |
| Office Buildings | `office-buildings.html` |
| Laboratories | `laboratories.html` |

### 2.3. Page Titles (<title>)
**Rule:** `[Building Type Name] Ventilation Systems | Greenheck`
**Example:** `K-12 Education Ventilation Systems | Greenheck`

### 2.4. Handling Special Characters
- **Spaces:** Replace with hyphens (`-`).
- **Ampersands (&):** Replace with `and` (e.g., "Food & Beverage" -> `food-and-beverage`).
- **Punctuation:** Remove all other punctuation (periods, commas).
- **Case:** Always lowercase for URLs/IDs; Title Case for UI labels.

## 3. Technical Implementation

### 3.1. ID Generation Logic
The codebase (`header.js`) generates DOM IDs dynamically. New pages must be compatible with this logic:
```javascript
// Current Logic in MenuBuilder
id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
```
*   Input: "Office Buildings" -> ID: `office-buildings`
*   Input: "K-12 Education" -> ID: `k-12-education`

### 3.2. Data Structure (`header-data.json`)
New entries must follow this schema:
```json
{
  "title": "Office Buildings",
  "url": "https://www.greenheck.com/building-type/office-buildings" // or local path
}
```

## 4. Documentation Template (For New Pages)

**Copy and fill this section when planning a new page:**

```markdown
### New Building Type Request
**Name:** [e.g., Data Centers]
**Navigation Label:** [e.g., Data Centers]
**Proposed URL:** /building-type/data-centers
**Parent Category:** Building Types
**Existing Greenheck Content to Link:** [List URLs]
**Primary Competitor Naming:** [Optional check]
```

## 5. Testing Criteria

Before launching a new building type page or renaming an existing one, verify:

1.  **URL Validity:**
    *   [ ] URL matches the kebab-case pattern exactly.
    *   [ ] No 404s on the new link.
2.  **Navigation Rendering:**
    *   [ ] Item appears in "Building Types" dropdown.
    *   [ ] ID attribute is correctly generated (inspect DOM: `id="dropdown-k-12-education"`).
3.  **Responsiveness:**
    *   [ ] **Desktop:** Dropdown aligns correctly.
    *   [ ] **Mobile:** Menu item is tap-friendly and expands if it has sub-items (though Building Types are usually direct links).
4.  **SEO Safety:**
    *   [ ] Old URL (if renaming) 301 redirects to new URL.
    *   [ ] Canonical tag points to the new URL.

## 6. Migration Plan
### Phase 1: Preparation (Completed)
- [x] Audit existing pages and navigation links.
- [x] Create `header-data.json` backup.
- [x] Define new names for all existing pages.

### Phase 2: File Renaming (In Progress)
- [x] Create new file `k-12-education.html` with updated metadata.
- [x] Update references in `header-data.json`, `footer.html`.
- [ ] Rename CSS file (Skipped by user).
- [ ] Delete `k-12-school.html` (User opted to keep for now).
- [ ] Set up 301 redirects on the server (Critical for SEO).

### Phase 3: Link Updates (In Progress)
- [x] Update internal links in HTML files.
- [x] Update JS references (none found in k-12-app.js).
- [x] Update `header-data.json` to point to new URLs.
- [x] Update footer links in `includes/footer.html`.
- [x] Update internal links in demo files (`k-12-svg-demo.html`).
- [x] Update canonical tags and Open Graph URLs in the new HTML file.

### Phase 4: Verification (Pending)
- [ ] Test all links in navigation.
- [ ] Verify 301 redirects (server-side).
- [ ] Check analytics for traffic continuity.

---
**Approved By:** Chetan (Lead Developer)
**Date:** 2026-02-03
