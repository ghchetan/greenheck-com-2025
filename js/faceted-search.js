/**
 * Faceted Search Implementation
 * Handles filtering, URL state management, localStorage persistence, and quick view popover
 */

class FacetedSearch {
    constructor() {
      this.filters = {
        application: new Set(),
        certifications: new Set(),
        impeller: new Set(),
        drive: new Set(),
        housing: new Set(),
        discharge: new Set()
      };
      
      this.products = [];
      this.visibleProducts = [];
      this.quickViewPopover = null;
      
      this.init();
    }
  
    /**
     * Initialize the faceted search functionality
     */
    init() {
      this.loadProducts();
      this.initializeFilters();
      this.bindEvents();
      this.updateResults();
      
    }
  
    /**
     * Load product data from DOM elements
     */
    loadProducts() {
      const productElements = document.querySelectorAll('.product-card');
      this.products = Array.from(productElements);
      this.visibleProducts = [...this.products];
    }
  
    /**
     * Initialize filters from URL parameters or localStorage
     */
    initializeFilters() {
      const urlParams = new URLSearchParams(window.location.search);
      const hasUrlFilters = urlParams.toString().length > 0;
  
      if (hasUrlFilters) {
        // Load filters from URL
        this.loadFiltersFromUrl(urlParams);
      } else {
        // Load filters from localStorage
        this.loadFiltersFromStorage();
      }
  
      this.updateFilterUI();
    }
  
    /**
     * Load filters from URL parameters
     */
    loadFiltersFromUrl(urlParams) {
      Object.keys(this.filters).forEach(filterType => {
        const values = urlParams.getAll(filterType);
        this.filters[filterType] = new Set(values);
      });
    }
  
    /**
     * Load filters from localStorage
     */
    loadFiltersFromStorage() {
      try {
        const stored = localStorage.getItem('roof-products-filters');
        if (stored) {
          const parsed = JSON.parse(stored);
          Object.keys(this.filters).forEach(filterType => {
            if (parsed[filterType]) {
              this.filters[filterType] = new Set(parsed[filterType]);
            }
          });
        }
      } catch (error) {
        console.warn('Failed to load filters from localStorage:', error);
      }
    }
  
    /**
     * Save current filter state to localStorage
     */
    saveFiltersToStorage() {
      try {
        const filtersObj = {};
        Object.keys(this.filters).forEach(filterType => {
          filtersObj[filterType] = Array.from(this.filters[filterType]);
        });
        localStorage.setItem('roof-products-filters', JSON.stringify(filtersObj));
      } catch (error) {
        console.warn('Failed to save filters to localStorage:', error);
      }
    }
  
    /**
     * Update URL with current filter state
     */
    updateUrl() {
      const url = new URL(window.location);
      url.search = ''; // Clear existing search params
  
      Object.keys(this.filters).forEach(filterType => {
        if (this.filters[filterType].size > 0) {
          this.filters[filterType].forEach(value => {
            url.searchParams.append(filterType, value);
          });
        }
      });
  
      // Update URL without page reload
      window.history.pushState({}, '', url);
    }
  
    /**
     * Update filter UI to reflect current state
     */
    updateFilterUI() {
      Object.keys(this.filters).forEach(filterType => {
        const checkboxes = document.querySelectorAll(`input[name="${filterType}"]`);
        checkboxes.forEach(checkbox => {
          checkbox.checked = this.filters[filterType].has(checkbox.value);
        });
      });
    }
  
    /**
     * Bind event listeners
     */
    bindEvents() {
      // Filter checkbox events
      document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
          this.handleFilterChange(e.target);
        });
      });
  
      // Quick view links - toggle card flip to show product overview
      const quickViewLinks = document.querySelectorAll('.quick-view-link');
      console.log('Found quick-view-link elements:', quickViewLinks.length);
      
      quickViewLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const card = link.closest('.product-card');
          console.log('Toggling is-flipped on card:', card);
          card.classList.toggle('is-flipped');
        });
      });
  
      // Click on product overview (back side) to close and return to card front
      document.querySelectorAll('.product-card-back').forEach(backSide => {
        backSide.addEventListener('click', () => {
          const card = backSide.closest('.product-card');
          card.classList.remove('is-flipped');
        });
      });
  
      // ESC key to close any flipped card
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          document.querySelectorAll('.product-card.is-flipped').forEach(card => {
            card.classList.remove('is-flipped');
          });
        }
      });
  
      // Browser back/forward navigation
      window.addEventListener('popstate', () => {
        this.initializeFilters();
        this.updateResults();
      });
    }
  
    /**
     * Handle filter checkbox change
     */
    handleFilterChange(checkbox) {
      const filterType = checkbox.name;
      const value = checkbox.value;
  
      if (checkbox.checked) {
        this.filters[filterType].add(value);
      } else {
        this.filters[filterType].delete(value);
      }
  
      this.updateResults();
      this.updateActiveFilters();
      this.updateUrl();
      this.saveFiltersToStorage();
    }
  
    /**
     * Update product visibility based on active filters
     */
    updateResults() {
      this.visibleProducts = this.products.filter(product => {
        return this.productMatchesFilters(product);
      });
  
      this.updateProductVisibility();
      this.updateResultsCount();
    }
  
    /**
     * Check if a product matches all active filters
     */
    productMatchesFilters(product) {
      return Object.keys(this.filters).every(filterType => {
        if (this.filters[filterType].size === 0) {
          return true; // No filters applied for this type
        }
  
        const productValues = this.getProductFilterValues(product, filterType);
        const hasMatch = Array.from(this.filters[filterType]).some(filterValue => 
          productValues.includes(filterValue)
        );
  
        return hasMatch;
      });
    }
  
    /**
     * Get filter values for a product from data attributes
     */
    getProductFilterValues(product, filterType) {
      const dataValue = product.getAttribute(`data-${filterType}`);
      return dataValue ? dataValue.split(' ') : [];
    }
  
    /**
     * Update product visibility in DOM
     */
    updateProductVisibility() {
      this.products.forEach(product => {
        if (this.visibleProducts.includes(product)) {
          product.style.display = 'block';
          product.classList.remove('filtered-out');
        } else {
          product.style.display = 'none';
          product.classList.add('filtered-out');
        }
      });
    }
  
    /**
     * Update results count display
     */
    updateResultsCount() {
      const countElement = document.getElementById('results-count');
      if (countElement) {
        const count = this.visibleProducts.length;
        countElement.textContent = `Filtered Results: ${count} Products`;
      }
    }
  
    /**
     * Update active filter tags display
     */
    updateActiveFilters() {
      const activeFiltersContainer = document.getElementById('active-filters');
      if (!activeFiltersContainer) return;
  
      activeFiltersContainer.innerHTML = '';
  
      let hasActiveFilters = false;
  
      Object.keys(this.filters).forEach(filterType => {
        this.filters[filterType].forEach(value => {
          hasActiveFilters = true;
          const tag = this.createFilterTag(filterType, value);
          activeFiltersContainer.appendChild(tag);
        });
      });
  
      if (hasActiveFilters) {
        const clearAllBtn = document.createElement('button');
        clearAllBtn.className = 'clear-filters-btn';
        clearAllBtn.innerHTML = 'Clear Filters ×';
        clearAllBtn.addEventListener('click', () => this.clearAllFilters());
        activeFiltersContainer.appendChild(clearAllBtn);
      }
    }
  
    /**
     * Create a filter tag element
     */
    createFilterTag(filterType, value) {
      const tag = document.createElement('span');
      tag.className = 'filter-tag';
      tag.innerHTML = `${this.getFilterDisplayName(filterType, value)} ×`;
      
      tag.addEventListener('click', () => {
        this.removeFilter(filterType, value);
      });
  
      return tag;
    }
  
    /**
     * Get display name for filter value
     */
    getFilterDisplayName(filterType, value) {
      const displayNames = {
        'special-ventilation': 'Special Ventilation',
        'restaurant': 'Restaurant',
        'high-temp': 'High Temp',
        'smoke-control': 'Smoke Control',
        'amca-air-sound': 'AMCA Air & Sound',
        'amca-feg-sound-air': 'AMCA FEG Sound & Air',
        'amca-feg-air': 'AMCA FEG Air',
        'ul-705': 'UL/CUL 705',
        'ul-smoke-control': 'UL Smoke Control',
        'ul-restaurant-exhaust': 'UL/cUL Restaurant Exhaust',
        'high-wind': 'High Wind',
        'miami-dade': 'Miami Dade',
        'oshpd': 'OSHPD',
        'centaxial-wheel': 'CentAxial Wheel',
        'mixed-flow-wheel': 'Mixed-Flow Wheel',
        'propeller': 'Propeller',
        'belt-drive': 'Belt Drive',
        'direct-drive': 'Direct Drive',
        'spun-aluminum': 'Spun Aluminum',
        'fab-h-hood': 'Fab-H-Hood',
        'tubular': 'Tubular',
        'downblast': 'Downblast',
        'upblast': 'Upblast'
      };
  
      return displayNames[value] || value;
    }
  
    /**
     * Remove a specific filter
     */
    removeFilter(filterType, value) {
      this.filters[filterType].delete(value);
      
      // Update checkbox state
      const checkbox = document.querySelector(`input[name="${filterType}"][value="${value}"]`);
      if (checkbox) {
        checkbox.checked = false;
      }
  
      this.updateResults();
      this.updateActiveFilters();
      this.updateUrl();
      this.saveFiltersToStorage();
    }
  
    /**
     * Clear all active filters
     */
    clearAllFilters() {
      Object.keys(this.filters).forEach(filterType => {
        this.filters[filterType].clear();
      });
  
      // Uncheck all filter checkboxes
      document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
      });
  
      this.updateResults();
      this.updateActiveFilters();
      this.updateUrl();
      this.saveFiltersToStorage();
    }
  
    /**
     * Initialize quick view functionality
     */
    initializeQuickView() {
      this.currentFlippedCard = null;
    }
  
    /**
     * Show quick view by flipping the card
     */
    showQuickView(productCard) {
      const cardInner = productCard.querySelector('.product-card-inner');
      if (!cardInner) return;
  
      // Check if the card has the new data attributes
      const hasDisplayData = productCard.hasAttribute('data-display-model');
      
      if (!hasDisplayData) {
        console.warn('Product card does not have display data attributes');
        return;
      }
  
      try {
        this.populateQuickViewCard(productCard);
        
        // Add flip animation
        cardInner.classList.add('flipped');
        
        // Store reference to flipped card
        this.currentFlippedCard = productCard;
      } catch (error) {
        console.error('Failed to populate quick view data:', error);
      }
    }
  
    /**
     * Populate quick view card with product data from data attributes
     */
    populateQuickViewCard(productCard) {
      const quickViewCard = productCard.querySelector('.product-card-back');
      if (!quickViewCard) return;
  
      const descriptionElement = quickViewCard.querySelector('.quick-view-description');
      const specsListElement = quickViewCard.querySelector('.quick-view-specs .quick-view-list');
      const certificationsListElement = quickViewCard.querySelector('.quick-view-certifications .quick-view-list');
  
      // Get data from data attributes
      const description = productCard.getAttribute('data-display-description');
      const specificationsData = productCard.getAttribute('data-display-specifications');
      const certificationsData = productCard.getAttribute('data-display-certifications');
  
      if (descriptionElement && description) {
        descriptionElement.textContent = description;
      }
  
      if (specsListElement && specificationsData) {
        specsListElement.innerHTML = '';
        try {
          const specs = JSON.parse(specificationsData);
          specs.forEach(spec => {
            const li = document.createElement('li');
            li.textContent = spec;
            specsListElement.appendChild(li);
          });
        } catch (error) {
          console.error('Failed to parse specifications data:', error);
        }
      }
  
      if (certificationsListElement && certificationsData) {
        certificationsListElement.innerHTML = '';
        try {
          const certifications = JSON.parse(certificationsData);
          certifications.forEach(cert => {
            const li = document.createElement('li');
            li.textContent = cert;
            certificationsListElement.appendChild(li);
          });
        } catch (error) {
          console.error('Failed to parse certifications data:', error);
        }
      }
    }
  
  
     
  }
  
  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    new FacetedSearch();
  });
  
  // Export for potential module usage
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = FacetedSearch;
  }