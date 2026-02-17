# API Mismatch Analysis & Mapping Strategy

This document details the discrepancies between the expected data structure (as defined in `k-12-data.json` and consumed by `k-12-app.js`) and the actual API response format (`api-response.json`). It also outlines the transformation logic required to bridge these gaps.

## 1. Root Structure Mismatch
- **Expected**: A JSON object containing `pageMetadata` and `spaces`.
- **Actual**: A JSON object with a `value` array, where the first element contains the data.
- **Resolution**: Unwrap `response.value[0]` to access the main data object.

## 2. Field Naming & Casing
- **Expected**: `camelCase` (e.g., `pageMetadata`, `heroSection`).
- **Actual**: `PascalCase` (e.g., `Title`, `HeroSection`).
- **Resolution**: Map PascalCase fields to camelCase properties.

## 3. Page Metadata Mapping
| Expected Field | API Field (Path from Root) | Notes |
|----------------|---------------------------|-------|
| `title` | `Title` | Direct mapping. |
| `heroSection` | `HeroSection` (Array) | API returns array, expected object. Take first item. |
| `heroSection.backgroundImage` | N/A | **MISSING**. Need fallback or lookup. |
| `heroSection.title` | `HeroSection[0].Title` | Direct mapping. |
| `heroSection.description` | `HeroSection[0].Description` | Direct mapping. |
| `heroSection.actions` | `HeroSection[0].ActionButton` (Array) | Map array items. |
| `modalMapImage` | `MarkerImage` (Array) | API array is empty. **MISSING**. |
| `modalMarkersImage` | N/A | **MISSING**. |

### Action Button Mapping
| Expected Field | API Field | Transformation |
|----------------|-----------|----------------|
| `type` | `Type` | Map "1" -> "primary", "2" -> "secondary". |
| `label` | `Title` | Direct mapping. |
| `iconClass` | N/A | **MISSING**. Infer from type or label? |
| `actionId` | N/A | **MISSING**. Generate slug from label? |

## 4. Spaces Mapping
- **Expected**: `spaces` (Array of objects).
- **Actual**: `Spaces` (Array of objects).

| Expected Field | API Field | Transformation |
|----------------|-----------|----------------|
| `id` | `Id` (UUID) | **CRITICAL MISMATCH**. App expects slug IDs (e.g., "classrooms") to match SVG elements. API provides UUIDs. **Resolution**: Create a lookup map or normalize `Name` (e.g., "Classrooms" -> "classrooms"). |
| `name` | `Name` | Direct mapping. |
| `systemName` | `Description` | Confirmed by content ("Dedicated Outdoor Air System (DOAS)"). |
| `markerImg` | N/A | **MISSING**. Need fallback path based on ID. |
| `overview` | `Overview` (Array) | API returns array, expected object. Take first item. |
| `systemEquipment` | `SystemEquipment` (Array) | Direct mapping of array items. |
| `designNarrative` | `DesignNarrative` (Array) | API returns array, expected object. Take first item. |

### Overview Object Mapping
| Expected Field | API Field | Transformation |
|----------------|-----------|----------------|
| `title` | `Title` | Direct mapping. |
| `body` | `Body` | Direct mapping (HTML content). |
| `bgImg` | `BackgroundImage[0].Url` | Extract URL from first item of array. |

### System Equipment Object Mapping
| Expected Field | API Field | Transformation |
|----------------|-----------|----------------|
| `id` | `Id` | UUID is fine here, as it's not used for SVG linking. |
| `title` | `Title` | Direct mapping. |
| `slideImg` | `SliderImage[0].Url` | Extract URL from first item. |
| `body` | `Body` | Direct mapping. |
| `productDetailsUrl` | `ProductUrl` | Direct mapping. |
| `bgImg` | `BackgroundImage[0].Url` | Extract URL from first item. |

### Design Narrative Object Mapping
| Expected Field | API Field | Transformation |
|----------------|-----------|----------------|
| `title` | `Title` | Direct mapping. |
| `body` | `Body` | Direct mapping. |
| `img` | `BackgroundImage[0].Url` | Extract URL from first item. |

## 5. Missing Data Handling Strategy
- **Images**: Use placeholder images or hardcoded paths from the original JSON where API data is missing (e.g., Hero BG, Map SVGs).
- **IDs**: Implement a robust slugification or lookup to ensure SVG interactivity works.
- **Empty Arrays**: Add checks for empty `Overview`, `DesignNarrative` arrays to prevent crashes.

