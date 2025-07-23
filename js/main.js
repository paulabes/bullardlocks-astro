/**
 * Bullard Locks Website - JavaScript
 * Handles header/footer inclusion and basic form validation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Load header and footer
    loadIncludes();
    
    // Initialize form validation
    initializeFormValidation();
    
    // Initialize mobile menu
    initializeMobileMenu();
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
        const src = img.getAttribute('src');
        if (src && src.startsWith('/images/')) {
            // Remove leading slash and add base path
            img.setAttribute('src', basePath + src.substring(1));
        }
    });
}

/**
 * Update navigation links for subdirectories
 */
function updateNavigationLinks(container, basePath) {
    const links = container.querySelectorAll('a[href]');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('tel:') && !href.startsWith('mailto:') && !href.startsWith('https://wa.me/')) {
            // Update relative paths
            if (basePath === '../') {
                // We're in a subdirectory, adjust paths
                if (!href.startsWith('../')) {
                    link.setAttribute('href', basePath + href);
                }
            }
        }
    });
}

/**
 * Highlight current page in navigation
 */
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
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
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
        
        // Close mobile menu when clicking on links
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbarCollapse.classList.remove('show');
            });
        });
    }
}

/**
 * Initialize form validation
 */
function initializeFormValidation() {
    // Contact form validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!name || !phone || !message) {
                showMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidPhone(phone)) {
                showMessage('Please enter a valid phone number.', 'error');
                return;
            }
            
            // Form is valid - you can add email functionality here
            showMessage('Thank you for your message! We will contact you soon.', 'success');
            contactForm.reset();
        });
    }
    
    // Quote form validation
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('quote-name').value.trim();
            const phone = document.getElementById('quote-phone').value.trim();
            const service = document.getElementById('service').value;
            const postcode = document.getElementById('postcode').value.trim();
            
            // Basic validation
            if (!name || !phone || !service || !postcode) {
                showMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidPhone(phone)) {
                showMessage('Please enter a valid phone number.', 'error');
                return;
            }
            
            // Form is valid - you can add email functionality here
            showMessage('Thank you for your quote request! We will contact you soon.', 'success');
            quoteForm.reset();
        });
    }
}

/**
 * Validate phone number (basic UK format)
 */
function isValidPhone(phone) {
    const phoneRegex = /^(\+44|0)[0-9]{10,11}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Show success/error messages
 */
function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message alert alert-${type === 'success' ? 'success' : 'danger'}`;
    messageDiv.textContent = message;
    
    // Add message to page
    const form = document.querySelector('form');
    if (form) {
        form.parentNode.insertBefore(messageDiv, form);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}
