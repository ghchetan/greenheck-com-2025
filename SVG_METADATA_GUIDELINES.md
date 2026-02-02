# SVG Metadata Guidelines for Dynamic Space Mapping

This document outlines the standards for creating and tagging SVG files to ensure they work seamlessly with the K-12 School Experience application. Following these guidelines allows the application to automatically recognize and interact with new spaces without requiring code changes.

## Overview

The application uses a dynamic processing system that scans SVG files for specific metadata attributes. By adding these attributes to your SVG elements (groups, paths, etc.), you link visual elements to data models.

## Standard Attributes

### `data-space-id`

This is the primary attribute used to link an SVG element to a space defined in the application data.

*   **Description**: Unique identifier for the space.
*   **Value Format**: Kebab-case string (lowercase, hyphen-separated).
*   **Required**: Yes (for interactive elements).
*   **Example**: `data-space-id="science-lab"`

## Implementation Guide for Designers

When creating SVGs in tools like Adobe Illustrator, Inkscape, or Figma, you must ensure that interactive elements (pins, room outlines) have the correct attributes preserved in the exported code.

### 1. Element Grouping
Group all components of a clickable area (e.g., the pin icon, the label text, the background shape) into a single `<g>` (Group) element.

### 2. Adding Attributes
Add the `data-space-id` attribute to the group or main element.

**Example Code:**
```xml
<g id="Classroom-Group" data-space-id="classrooms">
  <path d="..." fill="#ff0000" />
  <text x="10" y="20">Classrooms</text>
</g>
```

### 3. Naming Conventions (IDs)
While `data-space-id` is the primary connector, keeping semantic IDs is good practice for debugging.
*   **Format**: `[SpaceName]-marker`
*   **Example**: `Gym-marker`, `Library-marker`

## Validation Rules

The system enforces the following rules during runtime:

1.  **Existence**: Interactive elements must have a `data-space-id`.
2.  **Format**: The ID must contain only lowercase letters, numbers, and hyphens.
3.  **Data Matching**: The value of `data-space-id` must match an `id` entry in the JSON data source (e.g., `gym`, `cafeteria`).

## Backward Compatibility

The system supports legacy SVGs that use specific ID mappings (e.g., `id="Gym-marker"` maps to `gym`). However, all new or updated SVGs **must** use the `data-space-id` attribute.

## Example File Structure

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
  <!-- Background -->
  <image href="background.jpg" width="1000" height="1000" />

  <!-- Interactive Element: Gym -->
  <g data-space-id="gym" cursor="pointer">
    <circle cx="200" cy="300" r="20" fill="blue" />
    <text x="200" y="330" text-anchor="middle">Gym</text>
  </g>

  <!-- Interactive Element: Classrooms -->
  <g data-space-id="classrooms" cursor="pointer">
    <rect x="500" y="200" width="100" height="50" fill="green" />
  </g>
</svg>
```
