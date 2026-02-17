# SVG Marker Visibility Management System

## Overview
The Visibility Management System controls the display state of SVG markers on the K-12 School interactive map. It provides:
1.  **Dual-level visibility control**: Manages visibility of nested elements (pins vs. labels) within a marker group.
2.  **State-based dimming**: Automatically dims inactive markers when a specific space is selected.
3.  **Seamless transitions**: Uses CSS transitions for smooth opacity changes.
4.  **Exclusion logic**: Prevents background elements (like `school-roof`) from being affected.

## CSS Architecture
The system relies on four core CSS classes defined in `Content/css/k-12-education.css`:

| Class | Description |
|-------|-------------|
| `.gh-marker-group` | Applied to the top-level `<g>` of each marker. Enables opacity transitions. |
| `.gh-marker-dimmed` | Sets opacity to 0 and `pointer-events: none` for inactive markers. |
| `.gh-child-visible` | Ensures the primary pin element is visible. |
| `.gh-child-hidden` | Hides secondary elements (labels/popovers) by default. |

```css
.gh-marker-group { transition: opacity 0.3s ease-in-out; }
.gh-marker-dimmed { opacity: 0; pointer-events: none; }
```

## JavaScript Implementation
The logic is encapsulated in the `SpaceView` class within `Content/js/k-12-app.js`.

### Initialization (`initMarkerVisibility`)
Called when the SVG loads. It:
-   Identifies all `<g>` children of the main container (`K-12-Pins-Roof-Closed`).
-   Excludes `school-roof`.
-   Adds `.gh-marker-group` to valid markers.
-   Sets the first child `<g>` (Pin) to `.gh-child-visible`.
-   Sets subsequent children (Labels) to `.gh-child-hidden`.

### State Update (`updateMarkerVisibility`)
Called when a marker is clicked or the map is reset.
-   **Active State**: If an `activeId` is provided, adds `.gh-marker-dimmed` to all *other* markers.
-   **Restored State**: If `activeId` is `null`, removes `.gh-marker-dimmed` from all markers.

## Integration Points
1.  **Map Load**: `SpaceController.attachSvgHandlers` calls `initMarkerVisibility`.
2.  **Marker Click**: `SpaceController.handleMarkerClick` calls `updateMarkerVisibility(spaceId)` to dim others.
3.  **Close/Reset**: `SpaceView.restoreLandingSvg` calls `updateMarkerVisibility(null)` to restore all.

## Testing & Benchmarks

### Unit Test
Run `k12App.testVisibilityLogic()` in the browser console.
-   Verifies CSS class application on init.
-   Verifies dimming behavior on update.
-   Verifies restoration behavior.

### Performance Benchmark
Run `k12App.runPerformanceTest()` in the browser console.
-   Clones a marker 100 times.
-   Measures time to initialize, toggle, and restore visibility.
-   Ensures system scales to 100+ markers without UI lag.
