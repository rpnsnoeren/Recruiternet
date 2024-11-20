// Components module
async function loadComponent(elementId, componentPath) {
    try {
        // Bepaal het basis pad voor componenten
        const basePath = window.location.pathname.includes('/src/') ? '.' : './src';
        const response = await fetch(`${basePath}/components/${componentPath}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const html = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;
        } else {
            console.warn(`Element with id '${elementId}' not found`);
        }
    } catch (error) {
        console.error('Error loading component:', error, 'Path:', componentPath);
    }
}

// Function to determine which content to load based on current page
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('features.html')) return 'features';
    if (path.includes('membership.html')) return 'membership';
    return 'home';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load shared components
        await loadComponent('navbar', 'navbar.html');
        await loadComponent('footer', 'footer.html');
        
        // Load page-specific content
        const currentPage = getCurrentPage();
        await loadComponent('main-content', `content/${currentPage}.html`);

        // Re-initialize Alpine.js after loading components
        if (window.Alpine) {
            window.Alpine.initTree(document.body);
        }
    } catch (error) {
        console.error('Error initializing components:', error);
    }
}); 