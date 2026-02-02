/**
 * K-12 School Experience Application
 * 
 * Architecture: Model-View-Controller (MVC)
 * -----------------------------------------
 * This application allows users to explore different spaces within a K-12 school environment.
 * It uses an interactive SVG map to select spaces and view detailed information about
 * HVAC systems and Greenheck products.
 * 
 * Components:
 * - SpaceService: Handles data fetching (currently uses mock data).
 * - SpaceModel: Manages the application state (current space, list of spaces, etc.).
 * - SpaceView: Handles all DOM manipulations, SVG interactions, and UI rendering.
 * - SpaceController: Connects the Model and View, handling user inputs and application logic.
 */

/* ==========================================================================
   Service Layer
   ========================================================================== */
/**
 * Service class responsible for data retrieval.
 * In a real-world scenario, this would make HTTP requests to a backend API.
 */
class SpaceService {
    constructor() {
        this.dataUrl = '/api/k-12-data'; // Placeholder for API endpoint
    }

    /**
     * Fetches the K-12 space data.
     * Currently simulates an asynchronous network request with a delay.
     * 
     * @param {string} buildingType - Optional building type to fetch data for.
     * @returns {Promise<Object>} A promise that resolves to the data object containing spaces and page metadata.
     */
    async fetchData(buildingType = 'k-12') {
        // Simulate network delay to mimic real API behavior
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.getMockData(buildingType));
            }, 500);
        });
    }

    /**
     * Returns the hardcoded mock data used for the application.
     * This data structure defines all spaces, their content, and related products.
     * 
     * @param {string} buildingType - The type of building to retrieve data for.
     * @returns {Object} The mock data object.
     */
    getMockData(buildingType) {
        // Enhanced Data Structure
        return {
            pageMetadata: {
                title: "K-12 School Pradeep",
                heroSection: {
                    backgroundImage: "./Content/imgs/k-12-hero-bg.png",
                    title: "SHARE 1",
                    description: "THIS INFORMATIVE, USEFUL<br>& ENGAGING EXPERIENCE",
                    actions: [
                        {
                            type: "primary",
                            label: "Select a Space",
                            iconClass: "./Content/imgs/icons/select-a-space.svg",
                            actionId: "select-space-btn"
                        },
                        {
                            type: "secondary",
                            label: "Share",
                            iconClass: "./Content/imgs/icons/share.svg",
                            actionId: "share-btn"
                        }
                    ]
                },
                modalLandingImage: "./Content/imgs/Space Pins and Labels with Popover/K-12-Pins-Roof-Closed.svg"
            },
            spaces: [
                {
                    id: "classrooms",
                    name: "Classrooms",
                    systemName: "Dedicated Outdoor Air System (DOAS)",
                    markerImg: "./Content/imgs/Space Pins and Labels with Popover/classrooms.svg",
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
                        bgImg: "./Content/imgs/Space Pins and Labels with Popover/classroom-overview.png"
                    },
                    systemEquipment: [
                        {
                            id: "rve-85",
                            title: "RVE-85",
                            slideImg: "./Content/imgs/prd-1.png", // Placeholder for 3D view
                            body: `
                                <ul class="product-features">
                                    <li>Direct drive plenum supply and optional exhaust fans with neoprene isolation and factory-provided variable frequency drive.</li>
                                    <li>2-inch double-wall cabinet with R13 injected foam insulation. R13 foam insulation thermally broken. Exterior Finish Permatector™ (2,500 hr salt spray rating under ASTM B117 testing conditions)</li>
                                </ul>
                            `,
                            productDetailsUrl: "#",
                            bgImg: "./Content/imgs/RooftopUnits.png"
                        },
                        {
                            id: "atu-xg-th-500",
                            title: "ATU - XG-TH-500",
                            slideImg: "./Content/imgs/prd-2.png",
                            body: `
                                <ul class="product-features">
                                    <li>Damper rotates in a self-lubricating, long-life, low-friction thermoplastic bearing</li>
                                    <li>Industry leading continuous welded primary inlet duct to minimize leakage with three stiffening beads for added rigidity</li>
                                    <li>Mechanically fastened damper assembly shall be double layer, 18-gauge equivalent, galvanized</li>
                                </ul>
                            `,
                            productDetailsUrl: "#",
                            bgImg: "./Content/imgs/AirTerminalUnits.png"
                        }
                    ],
                    designNarrative: {
                        title: "Classroom Design Narrative",
                        body: `
                            <p>The <strong>Dedicated Outdoor Air System (DOAS)</strong> model handles latent loads and conditions air while secondary HVAC systems handle sensible loads. The design centers on a <strong>Greenheck model RVE-85, rooftop ventilator</strong> equipped with a <strong>polymer total energy recovery wheel</strong> and a <strong>packaged Air Source Heat Pump (ASHP)</strong> with electric secondary heating.</p>
                            <p>The unit includes <strong>modulating, inverter scroll compressors</strong>, <strong>electronically commutated (EC) on all condenser fan motors</strong>, and <strong>modulating hot gas reheat</strong>. Supply and exhaust fans are controlled by <strong>factory provided, field mounted duct static pressure sensors</strong>.</p>
                            <p>Each room features <strong>motorized, single duct VAV boxes, Greenheck model XG-TH-500</strong>, which open/close based on occupancy to maintain ventilation. Air terminal units have <strong>1" fiberglass insulation with 1 1/2 lb weight</strong> and connect to a <strong>Greenheck XG-5750 air diffuser</strong>.</p>
                        `,
                        img: "./Content/imgs/k-12-hero-bg.png"
                    }
                },
                {
                    id: "gym",
                    name: "Gym",
                    systemName: "DOAS",
                    markerImg: "./Content/imgs/Space Pins and Labels with Popover/gym.svg",
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
                        bgImg: "./Content/imgs/k-12-hero-bg.png"
                    },
                    systemEquipment: [
                         {
                            id: "hvls-fan",
                            title: "HVLS Fan",
                            slideImg: "./Content/imgs/prd-1.png",
                            body: `
                                <ul class="product-features">
                                    <li>High-volume, low-speed fan for large open spaces.</li>
                                    <li>Improves air circulation and comfort.</li>
                                </ul>
                            `,
                            productDetailsUrl: "#",
                            bgImg: "./Content/imgs/Fans.png"
                        },
                        {
                            id: "rv-110",
                            title: "RV-110",
                            slideImg: "./Content/imgs/prd-2.png",
                            body: `
                                <ul class="product-features">
                                    <li>Rooftop ventilation unit optimized for large spaces.</li>
                                    <li>Energy-efficient operation with advanced controls.</li>
                                </ul>
                            `,
                            productDetailsUrl: "#",
                            bgImg: "./Content/imgs/RooftopUnits.png"
                        }
                    ],
                    designNarrative: {
                        title: "Gym Design Narrative",
                        body: `<p>The gymnasium features a single-zone, variable airflow system designed for high occupancy and activity levels. The design centers on a <strong>Greenheck model RV-110 rooftop unit</strong> for ventilation, supplemented by <strong>high-volume, low-speed (HVLS) fans</strong> to ensure optimal air circulation and occupant comfort.</p>`,
                        img: "./Content/imgs/k-12-hero-bg.png"
                    }
                },
                {
                    id: "admin-offices",
                    name: "Admin Offices",
                    systemName: "Multi-zone variable air volume",
                    markerImg: "./Content/imgs/Space Pins and Labels with Popover/admin-offices.svg",
                    overview: {
                        title: "Admin Offices Overview",
                        body: `<p>Efficient climate control for administrative areas.</p>`,
                        bgImg: "./Content/imgs/Space Pins and Labels with Popover/admin-offices-overview.png"
                    },
                    systemEquipment: [
                        {
                            id: "vav-box",
                            title: "VAV Box",
                            slideImg: "./Content/imgs/prd-2.png",
                            body: `
                                <ul class="product-features">
                                    <li>Precision airflow control for individual zones.</li>
                                    <li>Quiet operation suitable for office environments.</li>
                                </ul>
                            `,
                            productDetailsUrl: "#",
                            bgImg: "./Content/imgs/AirTerminalUnits.png"
                        },
                        {
                            id: "diffuser",
                            title: "Air Diffuser",
                            slideImg: "./Content/imgs/prd-1.png",
                            body: `
                                <ul class="product-features">
                                    <li>Ensures proper air distribution within the office space.</li>
                                    <li>Aesthetically designed to blend with ceiling grids.</li>
                                </ul>
                            `,
                            productDetailsUrl: "#",
                            bgImg: "./Content/imgs/GrillesRegistersDiffusers.png"
                        }
                    ],
                    designNarrative: {
                        title: "Admin Offices Design Narrative",
                        body: `<p>Administrative areas utilize a <strong>Multi-zone Variable Air Volume (VAV) system</strong>. This setup allows for individual temperature control in different offices using <strong>Greenheck VAV boxes</strong> and <strong>air diffusers</strong>, ensuring comfort while maximizing energy efficiency.</p>`,
                        img: "./Content/imgs/k-12-hero-bg.png"
                    }
                },
                {
                    id: "cafeteria",
                    name: "Cafeteria",
                    systemName: "DOAS",
                    markerImg: "./Content/imgs/Space Pins and Labels with Popover/cafeteria.svg",
                    overview: {
                        title: "Cafeteria Overview",
                        body: `<p>Ventilation solutions for dining areas.</p>`,
                        bgImg: "./Content/imgs/Space Pins and Labels with Popover/cafeteria-overview.png"
                    },
                    systemEquipment: [
                        {
                            id: "makeup-air",
                            title: "Make-Up Air",
                            slideImg: "./Content/imgs/prd-1.png",
                            body: `
                                <ul class="product-features">
                                    <li>Replaces exhausted air to maintain pressure balance.</li>
                                    <li>Tempered air for occupant comfort.</li>
                                </ul>
                            `,
                            productDetailsUrl: "#",
                            bgImg: "./Content/imgs/100OutdoorAir.png"
                        },
                        {
                            id: "exhaust-fan",
                            title: "Exhaust Fan",
                            slideImg: "./Content/imgs/prd-2.png",
                            body: `
                                <ul class="product-features">
                                    <li>Removes stale air and odors.</li>
                                    <li>High efficiency and low sound levels.</li>
                                </ul>
                            `,
                            productDetailsUrl: "#",
                            bgImg: "./Content/imgs/Fans.png"
                        }
                    ],
                    designNarrative: {
                        title: "Cafeteria Design Narrative",
                        body: `<p>The cafeteria ventilation system is designed to handle variable occupancy loads and food odors. It integrates <strong>Greenheck make-up air units</strong> with the kitchen's exhaust system to maintain pressure balance and prevent odor migration into adjacent spaces.</p>`,
                        img: "./Content/imgs/k-12-hero-bg.png"
                    }
                },
                {
                    id: "kitchen",
                    name: "Kitchen",
                    systemName: "DOAS",
                    markerImg: "./Content/imgs/Space Pins and Labels with Popover/kitchen.svg",
                    overview: {
                        title: "Kitchen Overview",
                        body: `<p>High-performance kitchen ventilation systems.</p>`,
                        bgImg: "./Content/imgs/Space Pins and Labels with Popover/kitchen-overview.png"
                    },
                    systemEquipment: [
                        {
                            id: "kitchen-hood",
                            title: "Vari-Flow Hood",
                            slideImg: "./Content/imgs/prd-1.png",
                            body: `
                                <ul class="product-features">
                                    <li>High-efficiency grease extraction and containment.</li>
                                    <li>Integrated LED lighting and fire suppression.</li>
                                </ul>
                            `,
                            productDetailsUrl: "#",
                            bgImg: "./Content/imgs/Exhuast Hoods.png"
                        },
                        {
                            id: "pcu",
                            title: "Pollution Control",
                            slideImg: "./Content/imgs/prd-2.png",
                            body: `
                                <ul class="product-features">
                                    <li>Removes grease and odors from exhaust air.</li>
                                    <li>Ensures compliance with environmental regulations.</li>
                                </ul>
                            `,
                            productDetailsUrl: "#",
                            bgImg: "./Content/imgs/Pollution Control.png"
                        }
                    ],
                    designNarrative: {
                        title: "Kitchen Design Narrative",
                        body: `<p>The kitchen requires a robust ventilation system to capture heat, grease, and odors. A dedicated <strong>Greenheck Make-Up Air Unit</strong> pairs with <strong>Vari-Flow Exhaust Hoods</strong> and a <strong>Pollution Control Unit</strong> to ensure safety, compliance, and comfort for kitchen staff.</p>`,
                        img: "./Content/imgs/Exhuast Hoods.png"
                    }
                },
                {
                    id: "lobby",
                    name: "Lobby",
                    systemName: "DOAS",
                    markerImg: "./Content/imgs/Space Pins and Labels with Popover/lobby.svg",
                    overview: {
                        title: "Lobby Overview",
                        body: `<p>Welcoming and comfortable entryways.</p>`,
                        bgImg: "./Content/imgs/Space Pins and Labels with Popover/lobby-overhead-overview.png"
                    },
                    systemEquipment: [
                        {
                            id: "air-curtain",
                            title: "Air Curtain",
                            slideImg: "./Content/imgs/prd-1.png",
                            body: `
                                <ul class="product-features">
                                    <li>Creates an air seal to prevent infiltration.</li>
                                    <li>Keeps conditioned air inside and pests outside.</li>
                                </ul>
                            `,
                            productDetailsUrl: "#",
                            bgImg: "./Content/imgs/AirTerminalUnits.png"
                        },
                        {
                            id: "doas-unit",
                            title: "DOAS Unit",
                            slideImg: "./Content/imgs/prd-2.png",
                            body: `
                                <ul class="product-features">
                                    <li>Supplies conditioned outdoor air.</li>
                                    <li>Maintains optimal indoor air quality.</li>
                                </ul>
                            `,
                            productDetailsUrl: "#",
                            bgImg: "./Content/imgs/RooftopUnits.png"
                        }
                    ],
                    designNarrative: {
                        title: "Lobby Design Narrative",
                        body: `<p>The lobby serves as a transition space, requiring a system that can handle rapid load changes. <strong>Greenheck Air Curtains</strong> protect against infiltration at the entry, while a dedicated <strong>DOAS unit</strong> maintains a comfortable, conditioned environment for occupants.</p>`,
                        img: "./Content/imgs/k-12-hero-bg.png"
                    }
                },
                {
                    id: "locker-room",
                    name: "Locker Room",
                    systemName: "DOAS",
                    markerImg: "./Content/imgs/Space Pins and Labels with Popover/locker-room.svg",
                    overview: {
                        title: "Locker Room Overview",
                        body: `<p>Effective moisture and odor control.</p>`,
                        bgImg: "./Content/imgs/k-12-hero-bg.png"
                    },
                    systemEquipment: [
                        {
                            id: "erv",
                            title: "Energy Recovery",
                            slideImg: "./Content/imgs/prd-1.png",
                            body: `
                                <ul class="product-features">
                                    <li>Transfers heat and moisture between airstreams.</li>
                                    <li>Reduces heating and cooling loads.</li>
                                </ul>
                            `,
                            productDetailsUrl: "#",
                            bgImg: "./Content/imgs/EnergyRecovery.png"
                        }
                    ],
                    designNarrative: {
                        title: "Locker Room Design Narrative",
                        body: `<p>Locker rooms require high ventilation rates to effectively control humidity and odors. A <strong>Greenheck Energy Recovery Ventilator (ERV)</strong> provides ample fresh air while recovering energy from the exhaust stream to minimize operating costs.</p>`,
                        img: "./Content/imgs/k-12-hero-bg.png"
                    }
                },
                {
                    id: "science-lab",
                    name: "Science Lab",
                    systemName: "DOAS",
                    markerImg: "./Content/imgs/Space Pins and Labels with Popover/science-lab.svg",
                    overview: {
                        title: "Science Lab Overview",
                        body: `<p>Safe ventilation for laboratory environments.</p>`,
                        bgImg: "./Content/imgs/HealthcareLaboratoriesCleanrooms.png"
                    },
                    systemEquipment: [
                        {
                            id: "fume-exhaust",
                            title: "Fume Exhaust",
                            slideImg: "./Content/imgs/prd-1.png",
                            body: `
                                <ul class="product-features">
                                    <li>High-velocity discharge to safely disperse fumes.</li>
                                    <li>Corrosion-resistant construction.</li>
                                </ul>
                            `,
                            productDetailsUrl: "#",
                            bgImg: "./Content/imgs/Fans.png"
                        },
                        {
                            id: "venturi-valve",
                            title: "Venturi Valve",
                            slideImg: "./Content/imgs/prd-2.png",
                            body: `
                                <ul class="product-features">
                                    <li>Maintains precise airflow and room pressurization.</li>
                                    <li>Fast response to changing conditions.</li>
                                </ul>
                            `,
                            productDetailsUrl: "#",
                            bgImg: "./Content/imgs/AirTerminalUnits.png"
                        }
                    ],
                    designNarrative: {
                        title: "Science Lab Design Narrative",
                        body: `<p>Safety is paramount in science labs. The ventilation system uses <strong>Greenheck high-plume exhaust fans</strong> to safely disperse fumes and <strong>Venturi valves</strong> to maintain precise room pressurization and containment of hazardous substances.</p>`,
                        img: "./Content/imgs/k-12-hero-bg.png"
                    }
                }
            ]
        };
    }
}

/* ==========================================================================
   Model Layer
   ========================================================================== */
/**
 * Model class responsible for managing the application's state.
 * Stores the list of spaces and the currently selected space.
 */
class SpaceModel {
    constructor() {
        this.spaces = [];             // List of all available spaces
        this.pageMetadata = null;     // Page-specific metadata (hero, title, etc.)
        this.currentSpaceId = null;   // ID of the currently selected space
        this.currentTab = 'overview'; // Default active tab in the detail modal
        this.currentProductIndex = 0; // Index of the currently visible product in the carousel
        this.markerData = {};         // Stores SVG marker coordinates
    }

    /**
     * Updates the list of spaces.
     * @param {Array<Object>} spaces - Array of space objects.
     */
    setSpaces(spaces) {
        this.spaces = spaces;
    }

    /**
     * Sets the page metadata.
     * @param {Object} metadata - The page metadata object.
     */
    setPageMetadata(metadata) {
        this.pageMetadata = metadata;
    }

    /**
     * Retrieves the page metadata.
     * @returns {Object|null} The page metadata object.
     */
    getPageMetadata() {
        return this.pageMetadata;
    }

    /**
     * Retrieves a specific space by its ID.
     * @param {string} id - The unique identifier of the space.
     * @returns {Object|undefined} The space object if found, otherwise undefined.
     */
    getSpace(id) {
        return this.spaces.find(s => s.id === id);
    }

    /**
     * Retrieves all available spaces.
     * @returns {Array<Object>} Array of all space objects.
     */
    getAllSpaces() {
        return this.spaces;
    }

    /**
     * Sets the currently active space ID.
     * @param {string} id - The unique identifier of the space to select.
     */
    setCurrentSpace(id) {
        this.currentSpaceId = id;
    }

    /**
     * Retrieves the currently active space object.
     * @returns {Object|undefined} The currently selected space object.
     */
    getCurrentSpace() {
        return this.getSpace(this.currentSpaceId);
    }
}

/* ==========================================================================
   View Layer
   ========================================================================== */
/**
 * View class responsible for UI updates and DOM interaction.
 * Handles rendering of modals, popovers, SVGs, and dynamic content.
 */
class SpaceView {
    constructor() {
        // --- DOM Elements ---
        // Modal elements
        this.modal = document.getElementById('space-selection-modal');
        this.modalTitle = document.querySelector('.space-selection-modal-space-name');
        this.modalSystemName = document.getElementById('modal-system-name');
        this.modalTabs = document.querySelectorAll('.space-selection-modal-tab');
        this.tabContents = document.querySelectorAll('.tab-content');
        
        // Detail section elements
        this.detailTitle = document.getElementById('detail-title');
        this.detailDescription = document.getElementById('detail-description');
        this.narrativeContent = document.getElementById('design-narrative-content');
        
        // Product Carousel
        this.productCarousel = document.querySelector('.product-carousel');
        
        // SVG Object Containers
        this.buildingSvgObject = document.getElementById('building-svg-object');
        this.spaceSvgObject = document.getElementById('space-svg-object');
        
        // Popover element
        this.popover = document.getElementById('space-popover');
        
        // --- State ---
        this.isPopoverVisible = false;
        
        // --- Constants ---
        this.SPACE_POPOVER_OFFSET_X = 160;
        this.SPACE_POPOVER_OFFSET_Y = 10;
    }

    /**
     * Renders the dynamic page content including hero section.
     * @param {Object} metadata - The page metadata object.
     */
    renderPageContent(metadata) {
        if (!metadata) return;

        // Update Page Title
        const pageTitle = document.getElementById('page-title');
        if (pageTitle) pageTitle.textContent = metadata.title;
        document.title = `${metadata.title} | Greenheck`;

        // Update Hero Section
        const hero = metadata.heroSection;
        if (hero) {
            const bgImg = document.getElementById('hero-bg-img');
            if (bgImg) bgImg.src = hero.backgroundImage;

            const heroTitle = document.getElementById('hero-title');
            if (heroTitle) heroTitle.textContent = hero.title;

            const heroDesc = document.getElementById('hero-description');
            if (heroDesc) heroDesc.innerHTML = hero.description;

            // Render Hero Buttons
            const btnContainer = document.getElementById('hero-buttons-container');
            if (btnContainer) {
                btnContainer.innerHTML = ''; // Clear existing

                hero.actions.forEach(action => {
                    const btn = document.createElement('button');
                    btn.className = `hero-btn ${action.type === 'primary' ? 'hero-btn-primary' : ''}`;
                    if (action.actionId) btn.id = action.actionId;

                    const img = document.createElement('img');
                    img.src = action.iconClass;
                    img.alt = action.label;
                    
                    btn.appendChild(img);
                    btn.appendChild(document.createTextNode(`\u00A0${action.label}`)); // Add non-breaking space
                    
                    btnContainer.appendChild(btn);
                });
            }
        }
        
        // Update Modal Landing Image
        if (metadata.modalLandingImage) {
            const svgObj = document.getElementById('building-svg-object');
            if (svgObj) {
                // Only update if different to avoid reload loop
                const currentData = svgObj.getAttribute('data');
                if (currentData !== metadata.modalLandingImage) {
                    svgObj.setAttribute('data', metadata.modalLandingImage);
                }
            }
        }
    }

    /**
     * Displays the space selection modal and prevents background scrolling.
     */
    showModal() {
        this.modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    /**
     * Hides the space selection modal and restores background scrolling.
     * Also ensures any active popover is hidden.
     */
    hideModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        this.hidePopover();
    }

    /**
     * Renders the details for a specific space into the modal.
     * Updates titles, descriptions, and handles tab content switching.
     * 
     * @param {Object} space - The space object containing details to render.
     * @param {string} tab - The ID of the tab to display (default: 'overview').
     */
    renderSpaceDetails(space, tab = 'overview') {
        if (!space) return;

        // Update Header Information
        this.modalTitle.textContent = space.name;
        this.modalSystemName.textContent = space.systemName;
        this.modalSystemName.style.display = 'block';

        // Update Tab States (Active/Inactive)
        this.modalTabs.forEach(t => {
            t.classList.toggle('active', t.dataset.tab === tab);
            t.disabled = false;
        });

        // Hide all tab contents first
        this.tabContents.forEach(c => c.classList.remove('active'));
        
        // Render specific tab content based on selection
        if (tab === 'overview') {
            document.getElementById('overview-content').classList.add('active');
            
            // Inject Overview Content
            // The JSON structure includes HTML in 'body', which allows for rich text.
            const container = document.getElementById('overview-content');
            
            // Use bgImg from data or fallback to empty string
            const bgImg = space.overview.bgImg || '';
            
            container.innerHTML = `
                <div class="overview-full-layout" style="background-image: url('${bgImg}')">
                    <div class="overview-overlay-card">
                        <h2>${space.overview.title}</h2>
                        ${space.overview.body}
                    </div>
                </div>
            `;
        } else if (tab === 'system-equipment') {
            document.getElementById('system-equipment-content').classList.add('active');
            this.renderProductCarousel(space.systemEquipment);
        } else if (tab === 'design-narrative') {
            const container = document.getElementById('design-narrative-content');
            container.classList.add('active');
            
            const bgImg = space.designNarrative.img || '';
            
            container.innerHTML = `
                <div class="design-narrative-layout">
                    <h2>${space.designNarrative.title}</h2>
                    <div class="design-narrative-split">
                        <div class="design-narrative-text">
                            ${space.designNarrative.body}
                        </div>
                        <div class="design-narrative-image">
                             <img src="${bgImg}" alt="${space.name} Design Narrative" />
                        </div>
                    </div>
                </div>
            `;
        }
    }

    /**
     * Renders the product carousel for the "System Equipment" tab.
     * Generates HTML slides for each product, handles accessibility attributes,
     * and sets up dot navigation.
     * 
     * @param {Array<Object>} products - Array of product objects to display.
     */
    renderProductCarousel(products) {
        const container = document.querySelector('.product-carousel');
        if (!products || products.length === 0) {
            container.innerHTML = '<p>No equipment data available for this space.</p>';
            return;
        }

        // Accessibility: Define the container as a region
        container.setAttribute('role', 'region');
        container.setAttribute('aria-roledescription', 'carousel');
        container.setAttribute('aria-label', 'System Equipment Carousel');
        
        // Preload images to ensure smooth transitions
        this.preloadImages(products);

        // Create a live region for screen reader announcements
        let html = '<div class="carousel-live-region visually-hidden" aria-live="polite"></div>';
        
        // Generate HTML for each product slide
        products.forEach((product, index) => {
            const activeClass = index === 0 ? 'active' : '';
            const bgImg = product.bgImg || '';
            const bgStyle = bgImg ? `background-image: url('${bgImg}');` : 'background-color: #f0f0f0;';

            html += `
                <div class="product-slide ${activeClass}" 
                     style="${bgStyle}" 
                     data-index="${index}"
                     role="group" 
                     aria-roledescription="slide" 
                     aria-label="${index + 1} of ${products.length}">
                     
                    <div class="product-overlay-card">
                        <div class="product-card-header">
                            <h3>${product.title}</h3>
                        </div>
                        
                        <div class="product-visual-section">
                            <button class="carousel-nav-btn prev" aria-label="Previous product">
                                <span class="material-symbols-outlined">arrow_back_ios_new</span>
                            </button>
                            
                            <div class="product-image-wrapper">
                                ${product.slideImg ? 
                                    `<img src="${product.slideImg}" alt="${product.title}" loading="eager">` : 
                                    `<div class="hvac-unit-3d">${product.title} 3D View</div>`
                                }
                            </div>
                            
                            <button class="carousel-nav-btn next" aria-label="Next product">
                                <span class="material-symbols-outlined">arrow_forward_ios</span>
                            </button>
                            
                            <div class="carousel-dots">
                                ${products.map((_, i) => `
                                    <button class="dot ${i === index ? 'active' : ''}" 
                                            aria-label="Go to slide ${i+1}"
                                            aria-current="${i === index ? 'true' : 'false'}"
                                            data-index="${i}">
                                    </button>
                                `).join('')}
                            </div>
                        </div>

                        <div class="product-info-section">
                            <div class="product-body-content">
                                ${product.body}
                            </div>
                            <button class="view-product-details-btn">View Product Details</button>
                        </div>
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
        
        // Attach click listeners to the navigation dots
        const dots = container.querySelectorAll('.dot');
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                const idx = parseInt(e.target.dataset.index);
                this.model.currentProductIndex = idx;
                this.updateProductVisibility(idx, 'dot');
            });
        });
    }

    /**
     * Preloads background and slide images to prevent flickering during carousel navigation.
     * @param {Array<Object>} products - Array of product objects containing image URLs.
     */
    preloadImages(products) {
        products.forEach(product => {
            if (product.bgImg) {
                const img = new Image();
                img.src = product.bgImg;
            }
            if (product.slideImg) {
                const img = new Image();
                img.src = product.slideImg;
            }
        });
    }

    /**
     * Loads the SVG for a specific space into the detail view.
     * @param {string} markerImg - The path to the SVG file.
     */
    loadSpaceSvg(markerImg) {
        if (this.spaceSvgObject) {
            // Force reload by setting data attribute
            this.spaceSvgObject.setAttribute('data', markerImg);
            
            // Log for debugging purposes
            console.log('Loading Space SVG:', markerImg);
        } else {
            console.error('Space SVG Object not found in DOM');
        }
    }

    /**
     * Shows the overlay SVG on the main building view when a space is selected.
     * This highlights the selected area on the main map.
     * 
     * @param {string} markerImg - The path to the overlay SVG file.
     */
    replaceLandingSvg(markerImg) {
        const overlay = document.getElementById('building-space-overlay-object');
        if (overlay) {
            overlay.classList.add('is-visible');
            overlay.setAttribute('data', markerImg);
        }
    }

    /**
     * Hides the overlay SVG and resets the main building view.
     */
    restoreLandingSvg() {
        const overlay = document.getElementById('building-space-overlay-object');
        if (overlay) {
            overlay.classList.remove('is-visible');
            // Small delay to ensure transition completes before clearing data
            setTimeout(() => overlay.removeAttribute('data'), 100);
        }
    }

    /**
     * Displays a popover with space information at specific coordinates.
     * 
     * @param {Object} space - The space object to display information for.
     * @param {number} x - The X coordinate for the popover (left position).
     * @param {number} y - The Y coordinate for the popover (top position).
     * @param {number|null} pointerLeft - Optional custom position for the popover arrow/pointer.
     */
    showPopover(space, x, y, pointerLeft) {
        if (!space) return;
        
        const nameEl = document.getElementById('popover-space-name');
        const sysEl = document.getElementById('popover-system-name');
        
        nameEl.textContent = space.name;
        sysEl.textContent = space.systemName;
        
        // Ensure popover is appended to body to avoid z-index/clipping issues
        if (this.popover.parentElement !== document.body) {
            document.body.appendChild(this.popover);
        }

        this.popover.style.display = 'flex';
        this.popover.style.left = `${x}px`;
        this.popover.style.top = `${y}px`;

        // Handle custom pointer position if provided
        if (pointerLeft !== null) {
            this.popover.style.setProperty('--pointer-left', `${pointerLeft}px`);
            this.popover.setAttribute('data-pointer-left', pointerLeft);
        } else {
            this.popover.style.removeProperty('--pointer-left');
            this.popover.removeAttribute('data-pointer-left');
        }
        
        this.isPopoverVisible = true;
    }

    /**
     * Hides the space information popover.
     */
    hidePopover() {
        this.popover.style.display = 'none';
        this.isPopoverVisible = false;
    }

    /**
     * Enables or disables the tabs in the modal.
     * Used when switching between 'building' and 'detail' scenes within the modal.
     * 
     * @param {boolean} enabled - True to enable tabs, false to disable.
     */
    setTabsState(enabled) {
        this.modalTabs.forEach(t => {
            t.disabled = !enabled;
            if (!enabled) {
                t.style.opacity = '0.5';
                t.style.cursor = 'not-allowed';
                t.classList.remove('active');
            } else {
                t.style.opacity = '1';
                t.style.cursor = 'pointer';
            }
        });
    }

    /**
     * Switches between the main building view and the detailed space view within the modal.
     * 
     * @param {string} sceneName - 'detail' for the space detail view, 'building' (or others) for the main map.
     */
    switchScene(sceneName) {
        const buildingScene = document.getElementById('building-overview-scene');
        const detailScene = document.getElementById('detail-scene');
        const backBtn = document.getElementById('modal-back-btn');
        
        if (sceneName === 'detail') {
            buildingScene.classList.remove('active');
            detailScene.classList.add('active');
            backBtn.style.display = 'flex';
            this.setTabsState(true);
        } else {
            buildingScene.classList.add('active');
            detailScene.classList.remove('active');
            backBtn.style.display = 'none';
            // Reset modal header for overview mode
            this.modalSystemName.style.display = 'none';
            this.modalTitle.textContent = '';
            this.setTabsState(false);
        }
    }
}

/* ==========================================================================
   Controller Layer
   ========================================================================== */
/**
 * Controller class responsible for application logic and event handling.
 * Coordinates interactions between the Model (state) and View (UI).
 */
class SpaceController {
    /**
     * @param {SpaceService} service - The data service instance.
     * @param {SpaceModel} model - The state model instance.
     * @param {SpaceView} view - The UI view instance.
     */
    constructor(service, model, view) {
        this.service = service;
        this.model = model;
        this.view = view;
    }

    /**
     * Initializes the controller.
     * Sets up event listeners and waits for SVGs to load.
     */
    async init() {
        try {
            // Fetch initial data for the page (Metadata + Spaces)
            // In a real app, we might parse the URL or receive a building type config
            const data = await this.service.fetchData();
            
            this.model.setSpaces(data.spaces);
            this.model.setPageMetadata(data.pageMetadata);
            
            // Render the dynamic page content
            this.view.renderPageContent(data.pageMetadata);
            
            // Bind events AFTER content is rendered (specifically for dynamic buttons)
            this.bindEvents();
            
            // Initialize SVG handler for main building (Modal Landing)
            // We need to wait for the 'load' event to access the SVG's internal DOM
            const svgObj = document.getElementById('building-svg-object');
            if (svgObj) {
                // If the data attribute was just set in renderPageContent, it might take a moment to load
                svgObj.addEventListener('load', () => this.attachSvgHandlers(svgObj));
                // If already loaded (cached), attach immediately
                if (svgObj.contentDocument) {
                    this.attachSvgHandlers(svgObj);
                }
            }

            // Initialize SVG handler for overlay (Space specific SVGs)
            const overlayObj = document.getElementById('building-space-overlay-object');
            if (overlayObj) {
                overlayObj.addEventListener('load', () => this.attachOverlayHandlers(overlayObj));
            }
        } catch (error) {
            console.error("Failed to initialize application:", error);
            // Fallback or Error UI could be triggered here
        }
    }

    /**
     * Binds global DOM event listeners for the application.
     * Includes modal controls, navigation buttons, and tab switching.
     */
    bindEvents() {
        // Dynamic Hero Buttons
        const heroActions = this.model.getPageMetadata()?.heroSection?.actions || [];
        if (heroActions.length > 0) {
            const firstActionId = heroActions[0].actionId;
            const btn = document.getElementById(firstActionId);
            
            if (btn) {
                btn.addEventListener('click', () => {
                    this.view.showModal();
                    this.view.switchScene('overview');
                });
            }
        }

        // Modal Close Button
        const closeBtn = document.getElementById('modal-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.view.hideModal();
                this.view.restoreLandingSvg();
            });
        }

        // Back Button (Returns to Building Overview)
        const backBtn = document.getElementById('modal-back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                this.view.switchScene('overview');
                this.view.restoreLandingSvg();
            });
        }

        // Popover "View" Button (Navigates to Space Detail)
        const popViewBtn = document.getElementById('popover-view-btn');
        if (popViewBtn) {
            popViewBtn.addEventListener('click', () => {
                const space = this.model.getCurrentSpace();
                if (space) {
                    this.view.hidePopover();
                    this.view.switchScene('detail');
                    this.view.renderSpaceDetails(space, 'overview');
                    
                    // IMPORTANT: The "detail" scene has its own SVG container with ID "space-svg-object"
                    // We need to make sure this object loads the correct SVG for the selected space
                    this.view.loadSpaceSvg(space.markerImg);
                }
            });
        }

        // Popover Close Button
        const popCloseBtn = document.getElementById('popover-close-btn');
        if (popCloseBtn) {
            popCloseBtn.addEventListener('click', () => {
                this.view.hidePopover();
                this.view.restoreLandingSvg();
            });
        }

        // Modal Tabs (Overview, System Equipment, Design Narrative)
        const tabs = document.querySelectorAll('.space-selection-modal-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                const space = this.model.getCurrentSpace();
                this.view.renderSpaceDetails(space, tabName);
            });
        });

        // Product Carousel Delegation
        // Uses event delegation to handle clicks on dynamic carousel elements
        document.querySelector('.product-carousel').addEventListener('click', (e) => {
            if (e.target.closest('.carousel-nav-btn.next')) {
                this.nextProduct();
            } else if (e.target.closest('.carousel-nav-btn.prev')) {
                this.prevProduct();
            }
        });
    }

    /**
     * Advances the product carousel to the next item.
     * Cycles back to the first item if currently at the end.
     */
    nextProduct() {
        const space = this.model.getCurrentSpace();
        if (!space || !space.systemEquipment.length) return;
        
        let idx = this.model.currentProductIndex + 1;
        if (idx >= space.systemEquipment.length) idx = 0;
        this.model.currentProductIndex = idx;
        
        this.updateProductVisibility(idx, 'next');
    }

    /**
     * Moves the product carousel to the previous item.
     * Cycles to the last item if currently at the beginning.
     */
    prevProduct() {
        const space = this.model.getCurrentSpace();
        if (!space || !space.systemEquipment.length) return;
        
        let idx = this.model.currentProductIndex - 1;
        if (idx < 0) idx = space.systemEquipment.length - 1;
        this.model.currentProductIndex = idx;
        
        this.updateProductVisibility(idx, 'prev');
    }

    /**
     * Updates the visual state of the carousel to show the specified product.
     * Handles CSS classes for slides and dots, and manages accessibility focus.
     * 
     * @param {number} index - The index of the product to show.
     * @param {string|null} source - The source of the navigation action ('next', 'prev', 'dot', or null).
     */
    updateProductVisibility(index, source = null) {
        const slides = document.querySelectorAll('.product-slide');
        let newActiveSlide = null;
        
        // Toggle active class on slides
        slides.forEach((slide, i) => {
            const isActive = i === index;
            slide.classList.toggle('active', isActive);
            if (isActive) newActiveSlide = slide;
        });
        
        // Update dots in ALL slides (since they are replicated in each slide)
        // This is necessary because each slide contains its own set of navigation dots
        const allDotContainers = document.querySelectorAll('.carousel-dots');
        allDotContainers.forEach(container => {
            const dots = container.querySelectorAll('.dot');
            dots.forEach((dot, i) => {
                const isActive = i === index;
                dot.classList.toggle('active', isActive);
                dot.setAttribute('aria-current', isActive ? 'true' : 'false');
            });
        });

        // Accessibility: Announce slide change to screen readers
        const liveRegion = document.querySelector('.carousel-live-region');
        if (liveRegion && newActiveSlide) {
            const title = newActiveSlide.querySelector('h3')?.textContent || `Slide ${index + 1}`;
            liveRegion.textContent = `Showing ${title}`;
        }

        // Accessibility: Manage Focus if triggered by user interaction
        if (source && newActiveSlide) {
            if (source === 'next') {
                const nextBtn = newActiveSlide.querySelector('.carousel-nav-btn.next');
                if (nextBtn) nextBtn.focus();
            } else if (source === 'prev') {
                const prevBtn = newActiveSlide.querySelector('.carousel-nav-btn.prev');
                if (prevBtn) prevBtn.focus();
            } else if (source === 'dot') {
                // If clicked via dot, keep focus on the specific dot in the new slide
                const dots = newActiveSlide.querySelectorAll('.dot');
                if (dots[index]) dots[index].focus();
            }
        }
    }

    // --- SVG Handling Logic ---

    /**
     * Attaches click and hover handlers to the main building SVG.
     * Identifies interactable elements based on dynamic metadata (data-space-id)
     * and legacy ID mappings.
     * 
     * @param {HTMLObjectElement} svgObject - The <object> element containing the SVG.
     */
    attachSvgHandlers(svgObject) {
        const doc = svgObject.contentDocument;
        if (!doc) return;
        
        const processedElements = new Set();

        // 1. Dynamic Metadata Handling (New Standard)
        // Scans for elements with 'data-space-id' attribute
        const dynamicElements = doc.querySelectorAll('[data-space-id]');
        dynamicElements.forEach(el => {
            const spaceId = el.getAttribute('data-space-id');
            if (spaceId) {
                this.attachInteraction(el, spaceId);
                processedElements.add(el);
            }
        });

        // 2. ID Handling (Matches SVG IDs to Model IDs)
        // Automatically maps elements whose ID matches a known space ID
        const spaces = this.model.getAllSpaces();
        spaces.forEach(space => {
            let el = doc.getElementById(space.id);
            
            // Fallback: search by ID attribute manually if getElementById fails
            if (!el) {
                const groups = Array.from(doc.querySelectorAll('g'));
                el = groups.find(g => g.id === space.id);
            }

            // Special handling for singular/plural mismatch (e.g. classroom vs classrooms)
            if (!el && space.id.endsWith('s')) {
                const singularId = space.id.slice(0, -1);
                el = doc.getElementById(singularId);
                if (!el) {
                    const groups = Array.from(doc.querySelectorAll('g'));
                    el = groups.find(g => g.id === singularId);
                }
            }

            // Only attach if not already processed by dynamic handler
            if (el && !processedElements.has(el)) {
                this.attachInteraction(el, space.id);
                processedElements.add(el);
            }
        });
    }

    /**
     * Helper to attach standard interaction listeners to an SVG element.
     * 
     * @param {Element} el - The SVG element.
     * @param {string} spaceId - The ID of the space to link to.
     */
    attachInteraction(el, spaceId) {
        el.style.cursor = 'pointer';
        
        // Handle Click: Select the space
        el.addEventListener('click', (e) => {
            e.stopPropagation();
            this.handleMarkerClick(spaceId);
        });
        
        // Handle Hover: Visual feedback
        el.addEventListener('mouseenter', () => {
            el.style.opacity = '0.8';
        });
        el.addEventListener('mouseleave', () => {
            el.style.opacity = '1';
        });
    }

    /**
     * Attaches handlers to the overlay SVG (the highlighted space view).
     * Manages "View Details" and "Close" buttons within the SVG.
     * 
     * @param {HTMLObjectElement} svgObject - The <object> element containing the overlay SVG.
     */
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

        // "View" Button in Overlay (Navigates to Detail Scene)
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

        // "Close" Button in Overlay (Deselects space)
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

    /**
     * Handles the click event on a space marker in the main building SVG.
     * Updates the model and triggers the view to show the overlay.
     * 
     * @param {string} spaceId - The ID of the selected space.
     */
    handleMarkerClick(spaceId) {
        const space = this.model.getSpace(spaceId);
        if (!space) return;

        this.model.setCurrentSpace(spaceId);
        this.view.replaceLandingSvg(space.markerImg);
    }
}

// Initialize Application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new SpaceController(
        new SpaceService(),
        new SpaceModel(),
        new SpaceView()
    );
    app.init();
});
