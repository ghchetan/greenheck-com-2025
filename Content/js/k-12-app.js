/**
 * K-12 School Experience Application
 * Implements MVC Architecture:
 * - Service: Fetches data (Mocked for now)
 * - Model: Manages state
 * - View: Handles DOM and SVG manipulation
 * - Controller: Orchestrates logic and events
 */

/* ==========================================================================
   Service Layer
   ========================================================================== */
class SpaceService {
    constructor() {
        this.dataUrl = '/api/k-12-data'; // Mock URL
    }

    /**
     * Simulates fetching data from an API
     * @returns {Promise<Object>} The full JSON data structure
     */
    async fetchData() {
        // Simulate network delay
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.getMockData());
            }, 500);
        });
    }

    getMockData() {
        return {
            spaces: [
                {
                    id: "classrooms",
                    name: "Classrooms",
                    systemName: "Dedicated Outdoor Air System (DOAS)",
                    markerImg: "./Content/imgs/Space Pins and Labels with Popover/K-12-Classrooms.svg",
                    overview: {
                        title: "Classroom Overview",
                        body: `
                            <p>The flexible design decouples ventilation air and loads, allowing the DOAS units to handle latent loads and condition air while secondary HVAC systems handle sensible loads. 
                            This approach provides better control, energy efficiency, and comfort. Proper control is essential for maintaining comfort and extending equipment lifespan.</p>
                            <h4>Featured Equipment</h4>
                            <ul>
                                <li>Dedicated Outdoor Air System (DOAS) with energy recovery</li>
                                <li>Secondary HVAC system (not provided by Greenheck)</li>
                            </ul>
                        `,
                        bgImg: ""
                    },
                    systemEquipment: [
                        {
                            id: "rve-85",
                            title: "RVE-85",
                            slideImg: "", // Placeholder for 3D view
                            body: `
                                <ul class="product-features">
                                    <li>Direct drive plenum supply and optional exhaust fans with neoprene isolation and factory-provided variable frequency drive.</li>
                                    <li>2-inch double-wall cabinet with R13 injected foam insulation. R13 foam insulation thermally broken. Exterior Finish Permatector™ (2,500 hr salt spray rating under ASTM B117 testing conditions)</li>
                                </ul>
                            `,
                            productDetailsUrl: "#",
                            bgImg: ""
                        },
                        {
                            id: "atu-xg-th-500",
                            title: "ATU - XG-TH-500",
                            slideImg: "",
                            body: `
                                <ul class="product-features">
                                    <li>Damper rotates in a self-lubricating, long-life, low-friction thermoplastic bearing</li>
                                    <li>Industry leading continuous welded primary inlet duct to minimize leakage with three stiffening beads for added rigidity</li>
                                    <li>Mechanically fastened damper assembly shall be double layer, 18-gauge equivalent, galvanized</li>
                                </ul>
                            `,
                            productDetailsUrl: "#",
                            bgImg: ""
                        }
                    ],
                    designNarrative: {
                        title: "Classroom Design Narrative",
                        body: `
                            <p>The <strong>Dedicated Outdoor Air System (DOAS)</strong> model handles latent loads and conditions air while secondary HVAC systems handle sensible loads. The design centers on a <strong>Greenheck model RVE-85, rooftop ventilator</strong> equipped with a <strong>polymer total energy recovery wheel</strong> and a <strong>packaged Air Source Heat Pump (ASHP)</strong> with electric secondary heating.</p>
                            <p>The unit includes <strong>modulating, inverter scroll compressors</strong>, <strong>electronically commutated (EC) on all condenser fan motors</strong>, and <strong>modulating hot gas reheat</strong>. Supply and exhaust fans are controlled by <strong>factory provided, field mounted duct static pressure sensors</strong>.</p>
                            <p>Each room features <strong>motorized, single duct VAV boxes, Greenheck model XG-TH-500</strong>, which open/close based on occupancy to maintain ventilation. Air terminal units have <strong>1" fiberglass insulation with 1 1/2 lb weight</strong> and connect to a <strong>Greenheck XG-5750 air diffuser</strong>.</p>
                        `,
                        img: ""
                    }
                },
                {
                    id: "gym",
                    name: "Gym",
                    systemName: "DOAS",
                    markerImg: "./Content/imgs/Space Pins and Labels with Popover/K-12-Gym.svg",
                    overview: {
                        title: "Gym Overview",
                        body: `
                            <p>The gymnasium features a single-zone, variable airflow system designed for high occupancy and activity levels. The system includes demand-controlled ventilation and high-volume, low-speed fans for optimal air circulation.</p>
                            <h4>Featured Equipment</h4>
                            <ul>
                                <li>High Volume Low Speed (HVLS) fans</li>
                                <li>Demand-controlled ventilation system</li>
                            </ul>
                        `,
                        bgImg: ""
                    },
                    systemEquipment: [
                         {
                            id: "hvls-fan",
                            title: "HVLS Fan",
                            slideImg: "",
                            body: `
                                <ul class="product-features">
                                    <li>High-volume, low-speed fan for large open spaces.</li>
                                    <li>Improves air circulation and comfort.</li>
                                </ul>
                            `,
                            productDetailsUrl: "#",
                            bgImg: ""
                        }
                    ],
                    designNarrative: {
                        title: "Gym Design Narrative",
                        body: `<p>The gym design narrative is coming soon.</p>`,
                        img: ""
                    }
                },
                {
                    id: "admin-offices",
                    name: "Admin Offices",
                    systemName: "Multi-zone variable air volume",
                    markerImg: "./Content/imgs/Space Pins and Labels with Popover/K-12-Admin.svg",
                    overview: {
                        title: "Admin Offices Overview",
                        body: `<p>Efficient climate control for administrative areas.</p>`,
                        bgImg: ""
                    },
                    systemEquipment: [],
                    designNarrative: {
                        title: "Admin Offices Design Narrative",
                        body: `<p>Narrative coming soon.</p>`,
                        img: ""
                    }
                },
                {
                    id: "cafeteria",
                    name: "Cafeteria",
                    systemName: "DOAS",
                    markerImg: "./Content/imgs/Space Pins and Labels with Popover/K-12-Cafeteria.svg",
                    overview: {
                        title: "Cafeteria Overview",
                        body: `<p>Ventilation solutions for dining areas.</p>`,
                        bgImg: ""
                    },
                    systemEquipment: [],
                    designNarrative: {
                        title: "Cafeteria Design Narrative",
                        body: `<p>Narrative coming soon.</p>`,
                        img: ""
                    }
                },
                {
                    id: "kitchen",
                    name: "Kitchen",
                    systemName: "DOAS",
                    markerImg: "./Content/imgs/Space Pins and Labels with Popover/K-12-Kitchen.svg",
                    overview: {
                        title: "Kitchen Overview",
                        body: `<p>High-performance kitchen ventilation systems.</p>`,
                        bgImg: ""
                    },
                    systemEquipment: [],
                    designNarrative: {
                        title: "Kitchen Design Narrative",
                        body: `<p>Narrative coming soon.</p>`,
                        img: ""
                    }
                },
                {
                    id: "lobby",
                    name: "Lobby",
                    systemName: "DOAS",
                    markerImg: "./Content/imgs/Space Pins and Labels with Popover/K-12-Lobby.svg",
                    overview: {
                        title: "Lobby Overview",
                        body: `<p>Welcoming and comfortable entryways.</p>`,
                        bgImg: ""
                    },
                    systemEquipment: [],
                    designNarrative: {
                        title: "Lobby Design Narrative",
                        body: `<p>Narrative coming soon.</p>`,
                        img: ""
                    }
                },
                {
                    id: "locker-room",
                    name: "Locker Room",
                    systemName: "DOAS",
                    markerImg: "./Content/imgs/Space Pins and Labels with Popover/K-12-LockerRoom.svg",
                    overview: {
                        title: "Locker Room Overview",
                        body: `<p>Effective moisture and odor control.</p>`,
                        bgImg: ""
                    },
                    systemEquipment: [],
                    designNarrative: {
                        title: "Locker Room Design Narrative",
                        body: `<p>Narrative coming soon.</p>`,
                        img: ""
                    }
                },
                {
                    id: "science-lab",
                    name: "Science Lab",
                    systemName: "DOAS",
                    markerImg: "./Content/imgs/Space Pins and Labels with Popover/K-12-ScienceLab.svg",
                    overview: {
                        title: "Science Lab Overview",
                        body: `<p>Safe ventilation for laboratory environments.</p>`,
                        bgImg: ""
                    },
                    systemEquipment: [],
                    designNarrative: {
                        title: "Science Lab Design Narrative",
                        body: `<p>Narrative coming soon.</p>`,
                        img: ""
                    }
                }
            ]
        };
    }
}

/* ==========================================================================
   Model Layer
   ========================================================================== */
class SpaceModel {
    constructor() {
        this.spaces = [];
        this.currentSpaceId = null;
        this.currentTab = 'overview';
        this.currentProductIndex = 0;
        this.markerData = {}; // Stores SVG marker coordinates
    }

    setSpaces(spaces) {
        this.spaces = spaces;
    }

    getSpace(id) {
        return this.spaces.find(s => s.id === id);
    }

    getAllSpaces() {
        return this.spaces;
    }

    setCurrentSpace(id) {
        this.currentSpaceId = id;
    }

    getCurrentSpace() {
        return this.getSpace(this.currentSpaceId);
    }
}

/* ==========================================================================
   View Layer
   ========================================================================== */
class SpaceView {
    constructor() {
        // DOM Elements
        this.modal = document.getElementById('space-selection-modal');
        this.modalTitle = document.querySelector('.space-selection-modal-space-name');
        this.modalSystemName = document.getElementById('modal-system-name');
        this.modalTabs = document.querySelectorAll('.space-selection-modal-tab');
        this.tabContents = document.querySelectorAll('.tab-content');
        
        this.detailTitle = document.getElementById('detail-title');
        this.detailDescription = document.getElementById('detail-description');
        this.narrativeContent = document.getElementById('design-narrative-content');
        
        this.productCarousel = document.querySelector('.product-carousel');
        
        this.buildingSvgObject = document.getElementById('building-svg-object');
        this.spaceSvgObject = document.getElementById('space-svg-object');
        this.popover = document.getElementById('space-popover');
        
        // State for popover positioning
        this.isPopoverVisible = false;
        
        // Constants
        this.SPACE_POPOVER_OFFSET_X = 160;
        this.SPACE_POPOVER_OFFSET_Y = 10;
    }

    showModal() {
        this.modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    hideModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        this.hidePopover();
    }

    renderSpaceDetails(space, tab = 'overview') {
        if (!space) return;

        // Header
        this.modalTitle.textContent = space.name;
        this.modalSystemName.textContent = space.systemName;
        this.modalSystemName.style.display = 'block';

        // Tabs
        this.modalTabs.forEach(t => {
            t.classList.toggle('active', t.dataset.tab === tab);
            t.disabled = false;
        });

        // Content Areas
        this.tabContents.forEach(c => c.classList.remove('active'));
        
        if (tab === 'overview') {
            document.getElementById('overview-content').classList.add('active');
            // We need to inject the raw HTML for overview. 
            // The original HTML structure had title/desc separate from body. 
            // Our JSON has "body" which includes the description and lists.
            // We'll replace the innerHTML of the overview content container.
            const container = document.getElementById('overview-content');
            container.innerHTML = `<h3>${space.overview.title}</h3>${space.overview.body}`;
        } else if (tab === 'system-equipment') {
            document.getElementById('system-equipment-content').classList.add('active');
            this.renderProductCarousel(space.systemEquipment);
        } else if (tab === 'design-narrative') {
            const container = document.getElementById('design-narrative-content');
            container.classList.add('active');
            container.innerHTML = `<h3>${space.designNarrative.title}</h3>${space.designNarrative.body}`;
        }
    }

    renderProductCarousel(products) {
        const container = document.querySelector('.product-carousel');
        if (!products || products.length === 0) {
            container.innerHTML = '<p>No equipment data available for this space.</p>';
            return;
        }

        // Generate HTML for products
        let html = '';
        products.forEach((product, index) => {
            const activeClass = index === 0 ? 'active' : '';
            html += `
                <div class="product-card ${activeClass}" data-index="${index}">
                    <h3>${product.title}</h3>
                    <div class="product-image-container">
                        <button class="carousel-prev">‹</button>
                        <div class="product-image">
                            <div class="hvac-unit-3d">${product.title} 3D View</div> 
                        </div>
                        <button class="carousel-next">›</button>
                    </div>
                    <div class="carousel-dots">
                        ${products.map((_, i) => `<span class="dot ${i === index ? 'active' : ''}"></span>`).join('')}
                    </div>
                    ${product.body}
                    <button class="view-product-details-btn">View Product Details</button>
                </div>
            `;
        });
        container.innerHTML = html;
    }

    loadSpaceSvg(markerImg) {
        if (this.spaceSvgObject) {
            // Force reload by removing and re-adding if needed, or just set data
            this.spaceSvgObject.setAttribute('data', markerImg);
            
            // Log for debugging
            console.log('Loading Space SVG:', markerImg);
        } else {
            console.error('Space SVG Object not found in DOM');
        }
    }

    replaceLandingSvg(markerImg) {
        // This is the overlay logic from the original code
        const overlay = document.getElementById('building-space-overlay-object');
        if (overlay) {
            overlay.classList.add('is-visible');
            overlay.setAttribute('data', markerImg);
        }
    }

    restoreLandingSvg() {
        const overlay = document.getElementById('building-space-overlay-object');
        if (overlay) {
            overlay.classList.remove('is-visible');
            setTimeout(() => overlay.removeAttribute('data'), 100);
        }
    }

    showPopover(space, x, y, pointerLeft) {
        if (!space) return;
        
        const nameEl = document.getElementById('popover-space-name');
        const sysEl = document.getElementById('popover-system-name');
        
        nameEl.textContent = space.name;
        sysEl.textContent = space.systemName;
        
        // Ensure popover is in body
        if (this.popover.parentElement !== document.body) {
            document.body.appendChild(this.popover);
        }

        this.popover.style.display = 'flex';
        this.popover.style.left = `${x}px`;
        this.popover.style.top = `${y}px`;

        if (pointerLeft !== null) {
            this.popover.style.setProperty('--pointer-left', `${pointerLeft}px`);
            this.popover.setAttribute('data-pointer-left', pointerLeft);
        } else {
            this.popover.style.removeProperty('--pointer-left');
            this.popover.removeAttribute('data-pointer-left');
        }
        
        this.isPopoverVisible = true;
    }

    hidePopover() {
        this.popover.style.display = 'none';
        this.isPopoverVisible = false;
    }

    switchScene(sceneName) {
        const buildingScene = document.getElementById('building-overview-scene');
        const detailScene = document.getElementById('detail-scene');
        const backBtn = document.getElementById('modal-back-btn');
        const modalTabs = document.getElementById('modal-tabs');
        
        if (sceneName === 'detail') {
            buildingScene.classList.remove('active');
            detailScene.classList.add('active');
            backBtn.style.display = 'flex';
        } else {
            buildingScene.classList.add('active');
            detailScene.classList.remove('active');
            backBtn.style.display = 'none';
            // Hide system name in overview
            this.modalSystemName.style.display = 'none';
            this.modalTitle.textContent = '';
        }
    }
}

/* ==========================================================================
   Controller Layer
   ========================================================================== */
class SpaceController {
    constructor(service, model, view) {
        this.service = service;
        this.model = model;
        this.view = view;
        
        // Maps ID from SVG groups to Space IDs
        this.textIdToSpaceMap = {
            'Gym-marker': 'gym',
            'Lobby-marker': 'lobby',
            'Admin-marker': 'admin-offices',
            'LockerRoom-marker': 'locker-room',
            'ScienceLab-marker': 'science-lab',
            'Classrooms-marker': 'classrooms',
            'Kitchen-marker': 'kitchen',
            'cafeteria-marker': 'cafeteria'
        };
    }

    init() {
        this.bindEvents();
        // Initialize SVG handler for main building
        const svgObj = document.getElementById('building-svg-object');
        if (svgObj) {
            svgObj.addEventListener('load', () => this.attachSvgHandlers(svgObj));
            if (svgObj.contentDocument) {
                this.attachSvgHandlers(svgObj);
            }
        }

        // Initialize SVG handler for overlay (Space specific SVGs)
        const overlayObj = document.getElementById('building-space-overlay-object');
        if (overlayObj) {
            overlayObj.addEventListener('load', () => this.attachOverlayHandlers(overlayObj));
        }
    }

    bindEvents() {
        // "Select a Space" Button
        const btn = document.getElementById('select-space-btn');
        if (btn) {
            btn.addEventListener('click', async () => {
                this.view.showModal();
                // Fetch data if not loaded
                if (this.model.getAllSpaces().length === 0) {
                    // Show loading state if needed
                    const data = await this.service.fetchData();
                    this.model.setSpaces(data.spaces);
                }
                this.view.switchScene('overview');
            });
        }

        // Modal Close
        const closeBtn = document.getElementById('modal-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.view.hideModal();
                this.view.restoreLandingSvg();
            });
        }

        // Back Button
        const backBtn = document.getElementById('modal-back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                this.view.switchScene('overview');
                this.view.restoreLandingSvg();
            });
        }

        // Popover View Button
        const popViewBtn = document.getElementById('popover-view-btn');
        if (popViewBtn) {
            popViewBtn.addEventListener('click', () => {
                const space = this.model.getCurrentSpace();
                if (space) {
                    this.view.hidePopover();
                    this.view.switchScene('detail');
                    this.view.renderSpaceDetails(space, 'overview');
                    
                    // IMPORTANT: The "detail" scene has its own SVG container with ID "space-svg-object"
                    // We need to make sure this object loads the correct SVG
                    this.view.loadSpaceSvg(space.markerImg);
                }
            });
        }

        // Popover Close
        const popCloseBtn = document.getElementById('popover-close-btn');
        if (popCloseBtn) {
            popCloseBtn.addEventListener('click', () => {
                this.view.hidePopover();
                this.view.restoreLandingSvg();
            });
        }

        // Tabs
        const tabs = document.querySelectorAll('.space-selection-modal-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                const space = this.model.getCurrentSpace();
                this.view.renderSpaceDetails(space, tabName);
            });
        });

        // Product Carousel Delegation
        document.querySelector('.product-carousel').addEventListener('click', (e) => {
            if (e.target.closest('.carousel-next')) {
                this.nextProduct();
            } else if (e.target.closest('.carousel-prev')) {
                this.prevProduct();
            }
        });
    }

    nextProduct() {
        // Simple carousel logic for the generated HTML
        const space = this.model.getCurrentSpace();
        if (!space || !space.systemEquipment.length) return;
        
        let idx = this.model.currentProductIndex + 1;
        if (idx >= space.systemEquipment.length) idx = 0;
        this.model.currentProductIndex = idx;
        
        this.updateProductVisibility(idx);
    }

    prevProduct() {
        const space = this.model.getCurrentSpace();
        if (!space || !space.systemEquipment.length) return;
        
        let idx = this.model.currentProductIndex - 1;
        if (idx < 0) idx = space.systemEquipment.length - 1;
        this.model.currentProductIndex = idx;
        
        this.updateProductVisibility(idx);
    }

    updateProductVisibility(index) {
        const cards = document.querySelectorAll('.product-card');
        cards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });
    }

    // SVG Handling Logic
    attachSvgHandlers(svgObject) {
        const doc = svgObject.contentDocument;
        if (!doc) return;
        
        Object.keys(this.textIdToSpaceMap).forEach(svgId => {
            let el = doc.getElementById(svgId);
            
            // Fallback: search by ID attribute manually if getElementById fails
            // This helps if IDs are nested in a way that getElementById misses, 
            // or if there are case sensitivity issues that getElementById is strict about
            if (!el) {
                const groups = Array.from(doc.querySelectorAll('g'));
                el = groups.find(g => g.id === svgId);
            }

            if (el) {
                el.style.cursor = 'pointer';
                el.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const spaceId = this.textIdToSpaceMap[svgId];
                    this.handleMarkerClick(spaceId);
                });
                
                // Add hover effect for better feedback
                el.addEventListener('mouseenter', () => {
                    el.style.opacity = '0.8';
                });
                el.addEventListener('mouseleave', () => {
                    el.style.opacity = '1';
                });
            } else {
                console.warn(`Marker element not found: ${svgId}`);
            }
        });
    }

    attachOverlayHandlers(svgObject) {
        const doc = svgObject.contentDocument;
        if (!doc) return;

        // Helper to find element by ID with fallback
        const findElement = (id) => {
            let el = doc.getElementById(id);
            if (!el) {
                const groups = Array.from(doc.querySelectorAll('g'));
                el = groups.find(g => g.id === id);
            }
            return el;
        };

        // View Button
        const viewBtn = findElement('view-btn');
        if (viewBtn) {
            viewBtn.style.cursor = 'pointer';
            viewBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const space = this.model.getCurrentSpace();
                if (space) {
                    this.view.switchScene('detail');
                    this.view.renderSpaceDetails(space, 'overview');
                    this.view.loadSpaceSvg(space.markerImg);
                }
            });
             // Add hover effect
             viewBtn.addEventListener('mouseenter', () => {
                viewBtn.style.opacity = '0.8';
            });
            viewBtn.addEventListener('mouseleave', () => {
                viewBtn.style.opacity = '1';
            });
        } else {
             console.warn('View button not found in overlay SVG');
        }

        // Close Button
        const closeBtn = findElement('close-btn');
        if (closeBtn) {
            closeBtn.style.cursor = 'pointer';
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.view.restoreLandingSvg();
            });
             // Add hover effect
             closeBtn.addEventListener('mouseenter', () => {
                closeBtn.style.opacity = '0.8';
            });
            closeBtn.addEventListener('mouseleave', () => {
                closeBtn.style.opacity = '1';
            });
        } else {
            console.warn('Close button not found in overlay SVG');
        }
    }

    handleMarkerClick(spaceId) {
        const space = this.model.getSpace(spaceId);
        if (!space) return;

        this.model.setCurrentSpace(spaceId);
        this.view.replaceLandingSvg(space.markerImg);
    }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    const app = new SpaceController(
        new SpaceService(),
        new SpaceModel(),
        new SpaceView()
    );
    app.init();
});
