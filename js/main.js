/**
 * Bullard Locks Website - Simple JavaScript
 * Handles header/footer inclusion only
 */

document.addEventListener('DOMContentLoaded', function() {
    // Load header and footer
    loadIncludes();
    
    // Initialize animations after a short delay to ensure page is loaded
    setTimeout(() => {
        initializeScrollAnimations();
        initializeMicroAnimations();
    }, 100);
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

/**
 * Initialize scroll-based animations
 */
function initializeScrollAnimations() {
    // Add animation classes to elements that should animate on scroll
    const animationTargets = [
        { selector: '.service-card', animation: 'animate-on-scroll' },
        { selector: '.testimonial-card', animation: 'animate-on-scroll' },
        { selector: '.hero-section h1', animation: 'animate-on-scroll slide-left' },
        { selector: '.hero-section .lead', animation: 'animate-on-scroll slide-right' },
        { selector: '.about-preview h2', animation: 'animate-on-scroll' },
        { selector: '.services-overview h2', animation: 'animate-on-scroll scale-up' },
        { selector: '.feature-item', animation: 'animate-on-scroll' }
    ];
    
    // Apply animation classes
    animationTargets.forEach(target => {
        const elements = document.querySelectorAll(target.selector);
        elements.forEach(el => {
            if (!el.classList.contains('animate-on-scroll')) {
                el.className += ` ${target.animation}`;
            }
        });
    });
    
    // Create intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));
}

/**
 * Initialize micro animations and interactions
 */
function initializeMicroAnimations() {
    // Add staggered animation to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add staggered animation to testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
    });
    
    // Add subtle hover effect to images
    const images = document.querySelectorAll('.img-fluid');
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add button click ripple effect
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple animation
    if (!document.querySelector('#ripple-animation-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation-styles';
        style.textContent = `
            @keyframes ripple {
                from {
                    transform: scale(0);
                    opacity: 1;
                }
                to {
                    transform: scale(1);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}
