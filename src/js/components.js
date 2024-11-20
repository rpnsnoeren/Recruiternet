// Function to load components
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

// Function to determine which content to load based on current page
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('features.html')) return 'features';
    if (path.includes('membership.html')) return 'membership';
    return 'home';
}

// Load all components when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Load shared components
    loadComponent('navbar', './components/navbar.html');
    loadComponent('footer', './components/footer.html');
    
    // Load page-specific content
    const currentPage = getCurrentPage();
    loadComponent('main-content', `./components/content/${currentPage}.html`);
}); 