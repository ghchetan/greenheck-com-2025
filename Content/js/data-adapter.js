/**
 * Data Adapter for K-12 School Application
 * Transforms API response format to the application's expected data structure.
 */

(function(global) {
    const K12_DEFAULTS = {
        heroBg: './Content/imgs/k-12-hero-bg.png',
        mapImage: './Content/imgs/k-12-map.svg',
        markersImage: './Content/imgs/k-12-markers.svg',
        icons: {
            primary: './Content/imgs/icons/select-a-space.svg',
            secondary: './Content/imgs/icons/share.svg'
        }
    };

    const SPACE_ID_OVERRIDES = {
        'school-gym': 'gym'
    };

    class DataAdapter {
        /**
         * Transforms the API response into the application's expected format.
         * @param {Object} apiResponse - The raw JSON response from the API.
         * @returns {Object} The transformed data object.
         */
        static transform(apiResponse) {
            try {
                if (!apiResponse || !apiResponse.value || apiResponse.value.length === 0) {
                    throw new Error('Invalid API response format');
                }

                const root = apiResponse.value[0];
                
                return {
                    pageMetadata: this.transformPageMetadata(root),
                    spaces: this.transformSpaces(root.Spaces)
                };
            } catch (error) {
                console.error('Data transformation error:', error);
                // Return minimal valid structure to prevent app crash
                return { pageMetadata: {}, spaces: [] };
            }
        }

        static transformPageMetadata(root) {
            const hero = (root.HeroSection && root.HeroSection.length > 0) ? root.HeroSection[0] : {};
            
            return {
                title: root.Title || 'K-12 Education',
                heroSection: {
                    backgroundImage: K12_DEFAULTS.heroBg, // API missing this
                    title: hero.Title || '',
                    description: hero.Description || '',
                    actions: this.transformActions(hero.ActionButton)
                },
                modalMapImage: K12_DEFAULTS.mapImage, // API missing this
                modalMarkersImage: K12_DEFAULTS.markersImage // API missing this
            };
        }

        static transformActions(actions) {
            if (!actions || !Array.isArray(actions)) return [];

            return actions.map(action => {
                const type = action.Type === '1' ? 'primary' : 'secondary';
                return {
                    type: type,
                    label: action.Title,
                    iconClass: type === 'primary' ? K12_DEFAULTS.icons.primary : K12_DEFAULTS.icons.secondary,
                    actionId: action.Action === '1' ? 'select-space-btn' : 'share-btn' // Infer ID
                };
            });
        }

        static transformSpaces(spaces) {
            if (!spaces || !Array.isArray(spaces)) return [];

            return spaces.map(space => {
                // Use Title for ID generation and Name property as it matches human readable name
                const spaceName = space.Title || space.Name;
                const generatedId = this.generateId(spaceName);
                
                return {
                    id: generatedId,
                    name: spaceName,
                    systemName: space.Description || space.Name, // Fallback to Name if Description missing
                    markerImg: `./Content/imgs/Space Pins and Labels with Popover/${generatedId}.svg`, // Construct path
                    overview: this.transformOverview(space.Overview, generatedId),
                    systemEquipment: this.transformEquipment(space.SystemEquipment),
                    designNarrative: this.transformNarrative(space.DesignNarrative, generatedId)
                };
            });
        }

        static generateId(name) {
            if (!name) return 'unknown-space';
            const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            return SPACE_ID_OVERRIDES[slug] || slug;
        }

        static transformOverview(overviewArray, spaceId) {
            const overview = (overviewArray && overviewArray.length > 0) ? overviewArray[0] : {};
            return {
                title: overview.Title || '',
                body: overview.Body || '',
                bgImg: this.extractImageUrl(overview.BackgroundImage) || `./Content/imgs/Space Pins and Labels with Popover/${spaceId}-overview.png` // Fallback
            };
        }

        static transformEquipment(equipmentArray) {
            if (!equipmentArray || !Array.isArray(equipmentArray)) return [];

            return equipmentArray.map(item => ({
                id: item.Id,
                title: item.Title,
                slideImg: this.extractImageUrl(item.SliderImage) || './Content/imgs/prd-1.png',
                body: item.Body,
                productDetailsUrl: item.ProductUrl || '#',
                bgImg: this.extractImageUrl(item.BackgroundImage) || './Content/imgs/RooftopUnits.png'
            }));
        }

        static transformNarrative(narrativeArray, spaceId) {
            const narrative = (narrativeArray && narrativeArray.length > 0) ? narrativeArray[0] : {};
            return {
                title: narrative.Title || '',
                body: narrative.Body || '',
                img: this.extractImageUrl(narrative.BackgroundImage) || './Content/imgs/k-12-hero-bg.png'
            };
        }

        static extractImageUrl(imageArray) {
            if (imageArray && imageArray.length > 0 && imageArray[0].Url) {
                return imageArray[0].Url;
            }
            return null;
        }
    }

    // Expose to Global (Browser)
    global.DataAdapter = DataAdapter;

    // Expose to Module (Node.js)
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = DataAdapter;
    }

})(typeof window !== 'undefined' ? window : this);
