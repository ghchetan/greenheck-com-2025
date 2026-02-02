# K-12 School App API Data Structure Definition

This document outlines the data structure required for the K-12 School Application API. The API should return a JSON object containing the configuration and content for the interactive school map and its associated details.

## Endpoint Response

The API is expected to return a JSON object with a root key `spaces`, which contains a list of space definitions.

### Root Object

| Field | Type | Description |
|-------|------|-------------|
| `spaces` | Array\<Space\> | A collection of space objects representing different areas in the school (e.g., Classrooms, Gym, Cafeteria). |

---

### Data Models

#### 1. Space Object
Represents a specific area within the school environment.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Unique identifier for the space (e.g., `"classrooms"`, `"gym"`). |
| `name` | String | Display name of the space (e.g., "Classrooms"). |
| `systemName` | String | The name of the HVAC system applied in this space (e.g., "Dedicated Outdoor Air System (DOAS)"). |
| `markerImg` | String (URL) | URL path to the SVG marker image used on the map. |
| `overview` | [Overview](#2-overview-object) | Object containing the overview content for the space. |
| `systemEquipment` | Array\<[Equipment](#3-equipment-object)\> | A list of featured equipment associated with this space. |
| `designNarrative` | [DesignNarrative](#4-designnarrative-object) | Object containing the design narrative content. |

#### 2. Overview Object
Contains high-level information about the space's ventilation strategy.

| Field | Type | Description |
|-------|------|-------------|
| `title` | String | Title for the overview section (e.g., "Classroom Overview"). |
| `body` | String (HTML) | Rich text content describing the overview. Supports HTML tags like `<p>`, `<h4>`, `<ul>`, `<li>`. |
| `bgImg` | String (URL) | URL path to the background image for the overview section. |

#### 3. Equipment Object
Represents a specific piece of equipment featured in the space.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Unique identifier for the equipment (e.g., `"rve-85"`). |
| `title` | String | Display name of the equipment (e.g., "RVE-85"). |
| `slideImg` | String (URL) | URL path to the equipment image used in sliders or thumbnails. |
| `body` | String (HTML) | Rich text content describing the equipment features. |
| `productDetailsUrl` | String (URL) | Link to the full product details page. |
| `bgImg` | String (URL) | URL path to the background image associated with this equipment. |

#### 4. DesignNarrative Object
Provides a detailed narrative of the design implementation.

| Field | Type | Description |
|-------|------|-------------|
| `title` | String | Title for the design narrative section (e.g., "Classroom Design Narrative"). |
| `body` | String (HTML) | Rich text content explaining the design. |
| `img` | String (URL) | URL path to the image accompanying the narrative. |

---

### Example JSON Response

```json
{
  "spaces": [
    {
      "id": "classrooms",
      "name": "Classrooms",
      "systemName": "Dedicated Outdoor Air System (DOAS)",
      "markerImg": "./Content/imgs/Space Pins and Labels with Popover/K-12-Classrooms.svg",
      "overview": {
        "title": "Classroom Overview",
        "body": "<p>The flexible design decouples ventilation air and loads...</p>",
        "bgImg": "./Content/imgs/Space Pins and Labels with Popover/classroom-overview.png"
      },
      "systemEquipment": [
        {
          "id": "rve-85",
          "title": "RVE-85",
          "slideImg": "./Content/imgs/prd-1.png",
          "body": "<ul class=\"product-features\"><li>Direct drive plenum supply...</li></ul>",
          "productDetailsUrl": "#",
          "bgImg": "./Content/imgs/RooftopUnits.png"
        }
      ],
      "designNarrative": {
        "title": "Classroom Design Narrative",
        "body": "<p>The Dedicated Outdoor Air System (DOAS) model handles latent loads...</p>",
        "img": "./Content/imgs/k-12-hero-bg.png"
      }
    }
  ]
}
```
