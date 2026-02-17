# K-12 Standalone Asset Cleanup Report
**Date:** 2026-02-04
**Project:** Greenheck K-12 Standalone
**Directory:** `/Users/chetan/Documents/CodeProjects/chetan-greenheck-git-repos/greenheck-com-2025/k12-standalone/Content/imgs`

## Overview
A comprehensive audit of the asset directory was performed to identify and remove unused, redundant, or orphaned files. This cleanup aims to reduce project size and maintain a clean codebase.

## Actions Taken
1.  **Audit:** Scanned `Content/imgs` and subdirectories for files not referenced in `index.html`, `k-12-app.js`, `data-adapter.js`, `k-12-data.json`, or CSS files.
2.  **Verification:** Confirmed usage via codebase search (`grep`) and logical analysis of data adapters.
3.  **Backup:** Created a temporary backup of high-risk files (PNGs and Logos) before deletion.
4.  **Correction:** Updated `k-12-data.json` to replace references to deleted PNG overviews with a default background (`k-12-hero-bg.png`) and fixed broken meta tags in `index.html`.
5.  **Deletion:** Permanently removed confirmed unused files.

## Deleted Files Log

| File Name | Original Path | Reason |
| :--- | :--- | :--- |
| **greenheck-logo-horizontal-blue.png** | `Content/imgs/` | Unused. Replaced by text/CSS or not present in new design. Removed from `index.html` schema. |
| **AirTerminalUnits.png** | `Content/imgs/` | Unused asset. |
| **Fans.png** | `Content/imgs/` | Unused asset. |
| **RooftopUnits.png** | `Content/imgs/` | Unused asset. |
| **prd-1.png** | `Content/imgs/` | Unused product placeholder. |
| **prd-2.png** | `Content/imgs/` | Unused product placeholder. |
| **admin-offices.svg** | `Content/imgs/Space Pins and Labels with Popover/` | Unused marker. |
| **cafeteria.svg** | `Content/imgs/Space Pins and Labels with Popover/` | Unused marker. |
| **kitchen.svg** | `Content/imgs/Space Pins and Labels with Popover/` | Unused marker. |
| **lobby.svg** | `Content/imgs/Space Pins and Labels with Popover/` | Unused marker. |
| **locker-room.svg** | `Content/imgs/Space Pins and Labels with Popover/` | Unused marker. |
| **science-lab.svg** | `Content/imgs/Space Pins and Labels with Popover/` | Unused marker. |
| **Various Icons** | `Content/imgs/icons/` | ~27 unused icon files (e.g., `visibility.svg`, `plus.svg`) removed in initial pass. |

## Codebase Updates
- **`k-12-data.json` / `Content/js/k-12-data.json`**:
    - Replaced references to deleted `*-overview.png` files with `k-12-hero-bg.png`.
- **`index.html`**:
    - Corrected `og:image` and `twitter:image` paths.
    - Removed `greenheck-logo-horizontal-blue.png` from JSON-LD structured data.

## Summary
- **Total Files Removed:** ~40 files
- **Space Reclaimed:** ~2-5 MB (Estimated)
- **Status:** Cleanup Complete. Codebase integrity verified.
