/**
 * Bullard Locks Website - Simple JavaScript
 * Handles header/footer inclusion only
 */

document.addEventListener('DOMContentLoaded', function() {
    // Load header and footer
    loadIncludes();
});

/**
 * Load header and footer includes
 */
function loadIncludes() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');
    
    // Determine the correct path based on current location
    const path = getBasePath();
    
    // Load header
    if (headerPlaceholder) {
        fetch(path + 'includes/header.html')
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                // Update image paths in the loaded header
                updateImagePaths(headerPlaceholder, path);
                // Update navigation links
                updateNavigationLinks(headerPlaceholder, path);
                highlightCurrentPage();
                // Initialize mobile menu after header is loaded
                initializeMobileMenu();
                // Initialize Bootstrap dropdowns for dynamically inserted header
                initializeBootstrapDropdowns(headerPlaceholder);
            })
            .catch(error => {
                console.error('Error loading header:', error);
            });
    }
    
    // Load footer
    if (footerPlaceholder) {
        fetch(path + 'includes/footer.html')
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
                // Update image paths in the loaded footer
                updateImagePaths(footerPlaceholder, path);
            })
            .catch(error => {
                console.error('Error loading footer:', error);
            });
    }
}

/**
 * Get the correct base path for includes
 */
function getBasePath() {
    const currentPath = window.location.pathname;
    
    // If we're in a subdirectory (services/, locations/), go up one level
    if (currentPath.includes('/services/') || currentPath.includes('/locations/')) {
        return '../';
    }
    
    // If we're in the root directory
    return '';
}

/**
 * Update image paths in loaded content
 */
function updateImagePaths(container, basePath) {
    const images = container.querySelectorAll('img');
    images.forEach(img => {
        if (img.src && !img.src.startsWith('http')) {
            img.src = basePath + img.src.replace(window.location.origin, '');
        }
    });
}

/**
 * Update navigation links in loaded content
 */
function updateNavigationLinks(container, basePath) {
    const links = container.querySelectorAll('a[href^="./"], a[href^="/"]');
    links.forEach(link => {
        if (link.href && !link.href.startsWith('http')) {
            link.href = basePath + link.href.replace(window.location.origin, '');
        }
    });
}

/**
 * Highlight current page in navigation
 */
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        if (link.href && link.href.includes(currentPath)) {
            link.classList.add('active');
        }
    });
}

/**
 * Initialize mobile menu functionality
 */
function initializeMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const toggleIcon = document.querySelector('.toggle-icon');
    
    if (navbarToggler && navbarCollapse && toggleIcon) {
        navbarToggler.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isOpen = navbarCollapse.classList.contains('show');
            
            if (isOpen) {
                navbarCollapse.classList.remove('show');
                toggleIcon.classList.remove('menu-open');
                toggleIcon.textContent = '☰';
            } else {
                navbarCollapse.classList.add('show');
                toggleIcon.classList.add('menu-open');
                toggleIcon.textContent = 'X';
            }
        });
    }
}

/**
 * Initialize Bootstrap dropdowns for any dynamically inserted content
 */
function initializeBootstrapDropdowns(container) {
    try {
        // Bootstrap 5 exposes global "bootstrap" when using bundle
        if (typeof bootstrap !== 'undefined' && bootstrap.Dropdown) {
            const dropdownToggles = (container || document).querySelectorAll('[data-bs-toggle="dropdown"]');
            dropdownToggles.forEach(el => {
                // eslint-disable-next-line no-new
                new bootstrap.Dropdown(el);
            });
        }
    } catch (e) {
        console.error('Error initializing dropdowns:', e);
    }
}
