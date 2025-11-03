/**
 * HTML Include Utility
 * Loads and injects HTML fragments from separate files into the page
 * Ensures includes are loaded synchronously before other scripts run
 */
(function () {
    function loadInclude(element, path) {
        return fetch(path)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${path}: ${response.statusText}`);
                }
                return response.text();
            })
            .then((html) => {
                // Create a temporary container to parse the HTML
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html.trim();

                // Replace the placeholder element with the loaded content
                const parent = element.parentNode;
                
                // Move all children from tempDiv into the parent before the element
                while (tempDiv.firstChild) {
                    parent.insertBefore(tempDiv.firstChild, element);
                }
                
                // Remove the placeholder element
                parent.removeChild(element);
            })
            .catch((error) => {
                console.error(`Error loading include ${path}:`, error);
                // Remove the placeholder element even on error
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            });
    }

    function initializeIncludes() {
        // Find all elements with data-include attribute
        const includes = document.querySelectorAll('[data-include]');
        
        if (includes.length === 0) {
            return Promise.resolve();
        }
        
        // Load all includes in parallel
        const loadPromises = Array.from(includes).map((element) => {
            const path = element.getAttribute('data-include');
            return loadInclude(element, path);
        });

        // Wait for all includes to load
        return Promise.all(loadPromises);
    }

    // Initialize immediately if DOM is ready, otherwise wait
    // This ensures includes load before other scripts that depend on them
    const initPromise = (document.readyState === 'loading') 
        ? new Promise((resolve) => {
            document.addEventListener('DOMContentLoaded', () => {
                initializeIncludes().then(resolve);
            });
        })
        : initializeIncludes();

    // Store promise globally so other scripts can wait for it if needed
    window.includesLoaded = initPromise;
})();

