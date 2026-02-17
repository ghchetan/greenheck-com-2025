
// Simple DOM Mock
class MockElement {
    constructor(tagName) {
        this.tagName = tagName;
        this.innerHTML = '';
        this.classList = {
            add: () => {},
            remove: () => {},
            toggle: () => {}
        };
        this.style = {};
        this.attributes = {};
        this.children = [];
    }

    setAttribute(key, value) {
        this.attributes[key] = value;
    }
    
    querySelector(selector) {
        return new MockElement('div'); // Return dummy
    }
    
    querySelectorAll(selector) {
        return [];
    }
    
    addEventListener() {}
}

const elements = {
    'overview-content': new MockElement('div'),
    'system-equipment-content': new MockElement('div'),
    'design-narrative-content': new MockElement('div'),
    '.product-carousel': new MockElement('div')
};

global.document = {
    getElementById: (id) => elements[id] || new MockElement('div'),
    querySelector: (sel) => elements[sel] || new MockElement('div'),
    body: { style: {} }
};

global.Image = class { constructor() {} };

// Mock Data (taken from k-12-app.js)
const mockData = {
    spaces: [
        {
            id: "classrooms",
            name: "Classrooms",
            systemName: "Dedicated Outdoor Air System (DOAS)",
            overview: {
                title: "Classroom Overview",
                body: "<p>Overview Body</p>",
                bgImg: "./Content/imgs/overview.png"
            },
            systemEquipment: [
                {
                    id: "prod1",
                    title: "Product 1",
                    slideImg: "./Content/imgs/p1.png",
                    body: "<p>Product Body</p>",
                    bgImg: "./Content/imgs/p1-bg.png"
                }
            ],
            designNarrative: {
                title: "Classroom Design Narrative",
                body: "<p>Narrative Body</p>",
                img: "./Content/imgs/narrative.png"
            }
        }
    ]
};

// Mock Class Structure based on k-12-app.js
class SpaceView {
    constructor() {
        this.modalTitle = { textContent: '' };
        this.modalSystemName = { textContent: '', style: {} };
        this.modalTabs = [];
        this.tabContents = [{ classList: { remove: () => {} } }];
    }

    renderSpaceDetails(space, tab = 'overview') {
        if (!space) return;

        if (tab === 'overview') {
            const container = document.getElementById('overview-content');
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
            this.renderProductCarousel(space.systemEquipment);
        } else if (tab === 'design-narrative') {
            const container = document.getElementById('design-narrative-content');
            
            const bgImg = space.designNarrative.img || '';
            
            container.innerHTML = `
                <div class="overview-full-layout" style="background-image: url('${bgImg}')">
                    <div class="overview-overlay-card">
                        <h2>${space.designNarrative.title}</h2>
                        ${space.designNarrative.body}
                    </div>
                </div>
            `;
        }
    }

    renderProductCarousel(products) {
        const container = document.querySelector('.product-carousel');
        if (!products || products.length === 0) return;

        let html = '<div class="carousel-live-region visually-hidden" aria-live="polite"></div>';
        
        products.forEach((product, index) => {
            const activeClass = index === 0 ? 'active' : '';
            const bgImg = product.bgImg || '';
            const bgStyle = bgImg ? `background-image: url('${bgImg}');` : 'background-color: #f0f0f0;';

            html += `
                <div class="product-slide ${activeClass}" 
                     style="${bgStyle}" 
                     data-index="${index}">
                    <div class="product-overlay-card">
                        <div class="product-card-header">
                            <h3>${product.title}</h3>
                        </div>
                        <div class="product-visual-section">
                            <img src="${product.slideImg}" alt="${product.title}">
                        </div>
                        <div class="product-info-section">
                            ${product.body}
                        </div>
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
    }
    
    preloadImages(products) {} // No-op for test
    updateProductVisibility(index, source) {} // No-op for test
}

// Run Test
const view = new SpaceView();
const space = mockData.spaces[0];

console.log("--- Testing Overview Rendering ---");
view.renderSpaceDetails(space, 'overview');
const overviewHTML = elements['overview-content'].innerHTML;
console.log(overviewHTML.includes("background-image: url('./Content/imgs/overview.png')") ? "PASS: Background Image Set" : "FAIL: Background Image Missing");
console.log(overviewHTML.includes('<h2>Classroom Overview</h2>') ? "PASS: Title Set" : "FAIL: Title Missing");

console.log("\n--- Testing System Equipment Rendering ---");
view.renderSpaceDetails(space, 'system-equipment');
const carouselHTML = elements['.product-carousel'].innerHTML;
console.log(carouselHTML.includes("style=\"background-image: url('./Content/imgs/p1-bg.png');\"") ? "PASS: Slide Background Set" : "FAIL: Slide Background Missing");
console.log(carouselHTML.includes('<h3>Product 1</h3>') ? "PASS: Product Title Set" : "FAIL: Product Title Missing");

console.log("\n--- Testing Design Narrative Rendering ---");
view.renderSpaceDetails(space, 'design-narrative');
const narrativeHTML = elements['design-narrative-content'].innerHTML;
console.log(narrativeHTML.includes("background-image: url('./Content/imgs/narrative.png')") ? "PASS: Background Image Set" : "FAIL: Background Image Missing");
console.log(narrativeHTML.includes('<h2>Classroom Design Narrative</h2>') ? "PASS: Title Set" : "FAIL: Title Missing");
