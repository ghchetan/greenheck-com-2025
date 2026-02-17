const fs = require('fs');
const path = require('path');
const DataAdapter = require('./data-adapter.js');

// Helper to load JSON
const loadJSON = (filename) => {
    const filePath = path.join(__dirname, filename);
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const runTests = () => {
    console.log('Running DataAdapter Tests...');
    let passed = 0;
    let failed = 0;

    const assert = (condition, message) => {
        if (condition) {
            console.log(`✅ PASS: ${message}`);
            passed++;
        } else {
            console.error(`❌ FAIL: ${message}`);
            failed++;
        }
    };

    try {
        // Load Data
        const apiResponse = loadJSON('api-response.json');
        const expectedData = loadJSON('k-12-data.json');

        // Transform
        const result = DataAdapter.transform(apiResponse);

        // Test 1: Root Structure
        assert(result.pageMetadata !== undefined, 'Result should have pageMetadata');
        assert(Array.isArray(result.spaces), 'Result should have spaces array');

        // Test 2: Page Metadata
        assert(result.pageMetadata.title === apiResponse.value[0].Title, 'Page title matches');
        assert(result.pageMetadata.heroSection.title === apiResponse.value[0].HeroSection[0].Title, 'Hero title matches');
        assert(result.pageMetadata.heroSection.actions.length === 2, 'Hero actions count matches');
        assert(result.pageMetadata.heroSection.actions[0].type === 'primary', 'First action is primary');
        assert(result.pageMetadata.heroSection.backgroundImage.includes('k-12-hero-bg'), 'Hero background fallback applied');

        // Test 3: Spaces
        const classRoom = result.spaces.find(s => s.id === 'classrooms');
        assert(classRoom !== undefined, 'Classrooms space found with correct ID');
        assert(classRoom.name === 'Classrooms', 'Space name matches');
        assert(classRoom.systemName === 'Dedicated Outdoor Air System (DOAS)', 'System name matches description');
        
        // Test 4: Gym ID Override
        const gym = result.spaces.find(s => s.id === 'gym');
        assert(gym !== undefined, 'Gym space found with overridden ID "gym"');
        assert(gym.name === 'School Gym', 'Gym name matches');

        // Test 5: Overview
        assert(classRoom.overview.title === 'Classroom Overview', 'Overview title matches');
        assert(classRoom.overview.bgImg.includes('warehouse_master'), 'Overview background image extracted');

        // Test 6: System Equipment
        assert(classRoom.systemEquipment.length > 0, 'Equipment list not empty');
        assert(classRoom.systemEquipment[0].title === 'ATU-XG-TH-500', 'Equipment title matches');
        assert(classRoom.systemEquipment[0].slideImg.includes('taub-36'), 'Equipment slider image extracted');

        // Test 7: Error Handling (Empty input)
        const emptyResult = DataAdapter.transform({});
        assert(emptyResult.spaces.length === 0, 'Empty input returns safe default');

        console.log(`\nTests Completed: ${passed} Passed, ${failed} Failed.`);
        
        if (failed > 0) process.exit(1);

    } catch (e) {
        console.error('Test Runner Error:', e);
        process.exit(1);
    }
};

runTests();
