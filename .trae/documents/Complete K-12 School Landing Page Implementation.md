I will refactor the implementation to follow a strict **MVC (Model-View-Controller)** pattern with a separate **Service** layer, as requested. This will ensure the data source is decoupled from the UI logic, allowing easy replacement with a real API later.

## 1. Data Structure (JSON Schema)
I will define a standardized JSON structure that the Service will fetch.
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
        "body": "<p>HTML content...</p>",
        "bgImg": "url/to/image.png"
      },
      "systemEquipment": [
        {
          "title": "RVE-85",
          "slideImg": "url/to/3d-model.png",
          "body": "<ul><li>Feature 1</li>...</ul>",
          "productDetailsUrl": "/product/rve-85",
          "bgImg": "url/to/bg.png"
        }
      ],
      "designNarrative": {
        "title": "Classroom Design Narrative",
        "body": "<p>HTML content...</p>",
        "img": "url/to/narrative-image.png"
      }
    }
  ]
}
```

## 2. Architecture & Modules
I will split the JavaScript logic into distinct modules (likely in a new `Content/js/k-12-app.js` or separated files if preferred):

*   **`SpaceService`**:
    *   `fetchData()`: Simulates an async API call to download the full JSON on "Select a Space" click.
    *   `getSpace(id)`: Helper to find specific space data.

*   **`SpaceModel`**:
    *   Stores the loaded JSON data.
    *   Tracks state: `currentSpace`, `currentTab`, `currentProductIndex`.

*   **`SpaceView`**:
    *   **Modal Rendering**: Updates the Title, Tabs, and Tab Content (Overview/Equipment/Narrative) based on data.
    *   **SVG Management**: Handles switching between the "Landing SVG" and "Space Specific SVG".
    *   **Popover**: Renders the popover with data from the Model.

*   **`SpaceController`**:
    *   **Event Listeners**: Binds clicks on "Select a Space", Map Markers, "View" buttons, and Tabs.
    *   **Logic**:
        1.  User clicks "Select a Space" -> Controller calls `Service.fetchData()`.
        2.  Data Loaded -> Controller initializes `View` with the Landing SVG.
        3.  User clicks Marker -> Controller updates `View` to show specific `markerImg` SVG and Popover.
        4.  User clicks "View" -> Controller triggers `View` to open the Modal populated with `Overview` data.

## 3. Implementation Steps
1.  **Create JS Structure**: Setup the class/module structure.
2.  **Mock Data Generation**: Create the full JSON object for all 8 spaces (Classrooms, Gym, Admin, etc.) with placeholder data where content is missing.
3.  **Refactor Logic**: Port the existing SVG interaction logic (pin clicking, coordinate calculation) into the `SpaceView` and `SpaceController`.
4.  **Dynamic Rendering**: Replace hardcoded HTML in the modal with dynamic injection based on the selected space's JSON data.

Does this data structure and architectural breakdown match your requirements?