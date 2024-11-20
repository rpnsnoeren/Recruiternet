// Components module
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const html = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;
            
            // Re-initialize Alpine.js for the new content
            if (window.Alpine) {
                window.Alpine.initTree(element);
            }
        }
    } catch (error) {
        console.error('Error loading component:', error, 'Path:', componentPath);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load shared components
        await loadComponent('navbar', '/components/navbar.html');
        await loadComponent('footer', '/components/footer.html');
        
        // Load page-specific content based on URL
        const path = window.location.pathname;
        let contentPath = '/components/content/home.html';
        
        if (path.includes('features')) {
            contentPath = '/components/content/features.html';
        } else if (path.includes('membership')) {
            contentPath = '/components/content/membership.html';
        }
        
        await loadComponent('main-content', contentPath);
    } catch (error) {
        console.error('Error initializing components:', error);
    }
}); 