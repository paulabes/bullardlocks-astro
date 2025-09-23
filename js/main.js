/**
 * Bullard Locks Website - Simple JavaScript
 * Handles header/footer inclusion only
 */

document.addEventListener('DOMContentLoaded', function() {
    // Load reCAPTCHA script
    loadRecaptchaScript();
    
    // Load header and footer
    loadIncludes();
    
    // Initialize main contact form handler
    initializeContactForm();
    
    // Force floating buttons positioning
    forceFloatingButtons();
    
    // Initialize animations after a short delay to ensure page is loaded
    setTimeout(() => {
        initializeScrollAnimations();
        initializeMicroAnimations();
        // Force buttons again after animations
        forceFloatingButtons();
    }, 100);
});

/**
 * Show form message to user
 */
function showFormMessage(message, type = 'info', formId = null) {
    console.log('Showing form message:', type, message, 'for form:', formId);
    
    let messageContainer;
    
    // For contact form, use in-form container
    if (formId === 'quoteForm' || document.getElementById('contact-form-messages')) {
        messageContainer = document.getElementById('contact-form-messages');
        if (messageContainer) {
            // Clear existing messages
            messageContainer.innerHTML = '';
            
            // Create message element
            let alertType = 'info';
            if (type === 'error') alertType = 'danger';
            else if (type === 'success') alertType = 'success';
            else if (type === 'warning') alertType = 'warning';
            
            const messageEl = document.createElement('div');
            messageEl.className = `alert alert-${alertType} alert-dismissible mb-3`;
            messageEl.innerHTML = `
                ${message}
                <button type="button" class="btn-close" onclick="this.parentElement.innerHTML=''"></button>
            `;
            
            messageContainer.appendChild(messageEl);
            
            // Auto-remove after 8 seconds
            setTimeout(() => {
                if (messageEl.parentNode) {
                    messageEl.remove();
                }
            }, 8000);
            return;
        }
    }
    
    // Fallback to top-right notification for other forms
    messageContainer = document.getElementById('form-message-container');
    if (!messageContainer) {
        messageContainer = document.createElement('div');
        messageContainer.id = 'form-message-container';
        messageContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            max-width: 400px;
        `;
        document.body.appendChild(messageContainer);
    }
    
    // Create message element
    let alertType = 'info';
    if (type === 'error') alertType = 'danger';
    else if (type === 'success') alertType = 'success';
    else if (type === 'warning') alertType = 'warning';
    
    const messageEl = document.createElement('div');
    messageEl.className = `alert alert-${alertType} alert-dismissible`;
    messageEl.style.cssText = `
        margin-bottom: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    messageEl.innerHTML = `
        ${message}
        <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
    `;
    
    messageContainer.appendChild(messageEl);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.remove();
        }
    }, 5000);
}

/**
 * Initialize main contact form with AJAX submission
 */
function initializeContactForm() {
    // Wait a bit for DOM to be fully ready
    setTimeout(() => {
        const contactForm = document.getElementById('quoteForm');
        if (!contactForm) {
            console.log('Contact form with ID "quoteForm" not found on this page');
            return;
        }
        
        console.log('Contact form found, adding event listener');
        
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('Form submitted, processing...');
            
            // Clear any existing messages first
            const existingMessages = document.getElementById('contact-form-messages');
            if (existingMessages) {
                existingMessages.innerHTML = '';
            }
            
            // Get form data
            const formData = new FormData(contactForm);
        
            // Validate required fields client-side with specific messages
            const name = formData.get('name');
            const phone = formData.get('phone');
            const postcode = formData.get('postcode');
            const service = formData.get('service');
            
            // Add visual validation feedback
            let isValid = true;
            let errorMessages = [];
            
            // Reset all field states
            contactForm.querySelectorAll('.form-control, .form-select').forEach(field => {
                field.classList.remove('is-invalid', 'is-valid');
            });
            
            if (!name || name.trim() === '') {
                document.getElementById('name').classList.add('is-invalid');
                errorMessages.push('Please enter your name.');
                isValid = false;
            }
            
            if (!phone || phone.trim() === '') {
                document.getElementById('phone').classList.add('is-invalid');
                errorMessages.push('Please enter your phone number.');
                isValid = false;
            }
            
            if (!postcode || postcode.trim() === '') {
                document.getElementById('postcode').classList.add('is-invalid');
                errorMessages.push('Please enter your postcode.');
                isValid = false;
            }
            
            if (!service || service.trim() === '') {
                document.getElementById('service').classList.add('is-invalid');
                errorMessages.push('Please select a service.');
                isValid = false;
            }
            
            // If validation failed, show all errors and stop
            if (!isValid) {
                showFormMessage(errorMessages.join('<br>'), 'error', 'quoteForm');
                // Focus on first invalid field
                const firstInvalid = contactForm.querySelector('.is-invalid');
                if (firstInvalid) {
                    firstInvalid.focus();
                    firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }
            
            // Mark valid fields
            contactForm.querySelectorAll('.form-control, .form-select').forEach(field => {
                if (!field.classList.contains('is-invalid')) {
                    field.classList.add('is-valid');
                }
            });
        
        // Log form data for debugging
        console.log('Contact form submission - Form data:');
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
        submitBtn.disabled = true;
        
        // Get reCAPTCHA V3 token first
        console.log('Contact form: Getting reCAPTCHA token...');
        try {
            const recaptchaToken = await getRecaptchaToken('contact_form');
            console.log('Contact form: reCAPTCHA token received');
            formData.append('g-recaptcha-response', recaptchaToken);
        } catch (error) {
            console.error('Contact form reCAPTCHA error:', error);
            // Don't reset button or return - continue with form submission
            showFormMessage('Security verification temporarily unavailable. Your form will still be processed.', 'warning', 'quoteForm');
            // Add fallback token so form can still submit
            formData.append('g-recaptcha-response', 'recaptcha_error_fallback');
        }
        
        // Submit form directly to PHP script
        console.log('Contact form: Submitting to send_email.php...');
        fetch('send_email.php', {
            method: 'POST',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: formData
        })
        .then(response => {
            console.log('Contact form response status:', response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Contact form response data:', data);
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            if (data.success) {
                // Reset form
                contactForm.reset();
                // Clear validation states
                contactForm.querySelectorAll('.form-control, .form-select').forEach(field => {
                    field.classList.remove('is-invalid', 'is-valid');
                });
                showFormMessage(data.message, 'success', 'quoteForm');
                console.log('Contact form submitted successfully');
            } else {
                // Show the specific server error message
                showFormMessage(data.message, 'error', 'quoteForm');
                console.error('Contact form server error:', data.message);
            }
        })
        .catch(error => {
            console.error('Contact form submission error:', error);
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            showFormMessage('Sorry, there was a connection error. Please try again or call us directly at 07809 887 883.', 'error', 'quoteForm');
        });
    });
        }, 100); // Close setTimeout
        
        // Add real-time validation feedback
        contactForm.querySelectorAll('input[required], select[required]').forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
            
            field.addEventListener('input', function() {
                // Clear invalid state when user starts typing
                if (this.classList.contains('is-invalid')) {
                    this.classList.remove('is-invalid');
                    // Clear error message if this was the last invalid field
                    const invalidFields = contactForm.querySelectorAll('.is-invalid');
                    if (invalidFields.length === 0) {
                        const messageContainer = document.getElementById('contact-form-messages');
                        if (messageContainer) messageContainer.innerHTML = '';
                    }
                }
            });
        });
        
        function validateField(field) {
            const value = field.value.trim();
            const isRequired = field.hasAttribute('required');
            
            if (isRequired && !value) {
                field.classList.add('is-invalid');
                field.classList.remove('is-valid');
            } else if (value) {
                field.classList.remove('is-invalid');
                field.classList.add('is-valid');
            }
        }
}/**
 * Load Google reCAPTCHA V3 script
 */
function loadRecaptchaScript() {
    // Only load if not already loaded
    if (!document.querySelector('script[src*="recaptcha"]')) {
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js?render=6LeyKsArAAAAAC0ssQkPmDD_K3ibyLgp2kvRYHmD';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    }
}

/**
 * Get reCAPTCHA V3 token for form submission with timeout
 */
async function getRecaptchaToken(action = 'submit') {
    return new Promise((resolve, reject) => {
        console.log('Attempting to get reCAPTCHA token for action:', action);
        
        // Set a timeout for reCAPTCHA operations
        const timeout = setTimeout(() => {
            console.error('reCAPTCHA timeout after 10 seconds');
            resolve('recaptcha_timeout');
        }, 10000);
        
        if (typeof grecaptcha === 'undefined') {
            console.error('reCAPTCHA not loaded, using fallback');
            clearTimeout(timeout);
            // Fallback: resolve with a placeholder token
            resolve('recaptcha_not_available');
            return;
        }
        
        grecaptcha.ready(() => {
            console.log('reCAPTCHA ready, executing...');
            grecaptcha.execute('6LeyKsArAAAAAC0ssQkPmDD_K3ibyLgp2kvRYHmD', { action: action })
                .then(token => {
                    clearTimeout(timeout);
                    console.log('reCAPTCHA token received:', token.substring(0, 20) + '...');
                    resolve(token);
                })
                .catch(error => {
                    clearTimeout(timeout);
                    console.error('reCAPTCHA execute error:', error);
                    // Fallback: resolve with a placeholder token instead of rejecting
                    resolve('recaptcha_execute_failed');
                });
        });
    });
}

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
/**
 * Initialize scroll animations - REMOVED
 * All scroll-triggered animations have been removed for cleaner user experience
 */
function initializeScrollAnimations() {
    // Scroll animations have been removed
}

/**
 * Initialize micro animations - REMOVED
 * All micro animations have been removed for cleaner user experience
 */
function initializeMicroAnimations() {
    // Micro animations have been removed
}

/**
 * Create and position floating buttons directly on body
 */
function forceFloatingButtons() {
    // Remove any existing button container first
    const existingContainer = document.getElementById('floating-buttons-container');
    if (existingContainer) existingContainer.remove();

    // Check if we're on desktop (hide phone/WhatsApp buttons on desktop)
    const isDesktop = window.innerWidth >= 992; // Bootstrap lg breakpoint

    // Create container div (only for mobile/tablet)
    let buttonContainer = null;
    if (!isDesktop) {
        buttonContainer = document.createElement('div');
        buttonContainer.id = 'floating-buttons-container';
        buttonContainer.style.cssText = `
            position: fixed !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            z-index: 2147483647 !important;
            display: flex !important;
            flex-direction: row !important;
            gap: 0 !important;
            align-items: stretch !important;
            justify-content: space-between !important;
            width: 100% !important;
            height: 60px !important;
            margin: 0 !important;
            padding: 0 !important;
        `;
    }

    // Only create phone button on mobile/tablet
    let testBtn = null;
    if (!isDesktop) {
        testBtn = document.createElement('a');
        testBtn.id = 'test-btn-fixed';
        testBtn.href = 'tel:07809887883';
        testBtn.innerHTML = '<i class="fas fa-phone"></i>';
        testBtn.style.cssText = `
            background-color: #e67e22 !important;
            color: white !important;
            border: none !important;
            border-left: none !important;
            border-right: none !important;
            border-bottom: none !important;
            padding: 1rem !important;
            border-radius: 0 !important;
            font-size: 1.1rem !important;
            font-weight: 500 !important;
            cursor: pointer !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
            display: flex !important;
            width: 33.333% !important;
            height: 100% !important;
            margin: 0 !important;
            top: auto !important;
            left: auto !important;
            transform: none !important;
            opacity: 1 !important;
            visibility: visible !important;
            flex: 1 !important;
            justify-content: center !important;
            align-items: center !important;
            transition: all 0.3s ease !important;
            text-decoration: none !important;
            outline: none !important;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
            line-height: 1.5 !important;
            position: relative !important;
            text-align: center !important;
            box-sizing: border-box !important;
        `;

        // Add hover effect for test button (matching site style)
        testBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) !important';
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15) !important';
        });

        testBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) !important';
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15) !important';
        });

        // Add active state for test button (matching site style)
        testBtn.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) !important';
            this.style.transition = 'all 0.1s ease !important';
        });

        testBtn.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) !important';
            this.style.transition = 'all 0.3s ease !important';
        });

        // Add ripple effect for test button (matching site style)
        testBtn.addEventListener('click', function(e) {
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
                background: rgba(255, 255, 255, 0.1);
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
    }

    // Create chat button (always visible)
    const chatBtn = document.createElement('button');
    chatBtn.id = 'chat-btn-fixed';
    chatBtn.innerHTML = '<i class="fas fa-robot"></i>';
    chatBtn.onclick = openChatbot;
    chatBtn.setAttribute('aria-label', 'Open Chat Assistant');

    // Adjust width and positioning based on whether phone/WhatsApp buttons are present
    const chatBtnWidth = isDesktop ? 'auto' : '33.333%';
    const chatBtnPosition = isDesktop ? 'fixed' : 'static';
    const chatBtnBottom = isDesktop ? '20px' : 'auto';
    const chatBtnRight = isDesktop ? '20px' : 'auto';
    const chatBtnFontSize = isDesktop ? '1.5rem' : '0.9rem'; // Reduced size for better proportion
    const chatBtnPadding = isDesktop ? '1.75rem' : '1.25rem'; // Increased button size while keeping icon size the same
    const chatBtnBorderRadius = isDesktop ? '50%' : '0';

    chatBtn.style.cssText = `
        background-color: #0d6efd !important;
        color: white !important;
        border: none !important;
        border-left: none !important;
        border-right: none !important;
        border-bottom: none !important;
        padding: ${chatBtnPadding} !important;
        border-radius: ${chatBtnBorderRadius} !important;
        font-size: ${chatBtnFontSize} !important;
        font-weight: 500 !important;
        cursor: pointer !important;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
        display: flex !important;
        width: ${chatBtnWidth} !important;
        height: ${isDesktop ? 'auto' : '100%'} !important;
        margin: 0 !important;
        top: auto !important;
        left: auto !important;
        bottom: ${chatBtnBottom} !important;
        right: ${chatBtnRight} !important;
        position: ${chatBtnPosition} !important;
        transform: none !important;
        opacity: 1 !important;
        visibility: visible !important;
        flex: 1 !important;
        justify-content: center !important;
        align-items: center !important;
        transition: all 0.3s ease !important;
        text-decoration: none !important;
        outline: none !important;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
        line-height: 1.5 !important;
        z-index: 2147483647 !important;
        text-align: center !important;
        box-sizing: border-box !important;
    `;

    // Add hover effect for chat button (matching site style)
    chatBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) !important';
        this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15) !important';
    });

    chatBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) !important';
        this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15) !important';
    });

    // Add active state for chat button (matching site style)
    chatBtn.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(0) !important';
        this.style.transition = 'all 0.1s ease !important';
    });

    chatBtn.addEventListener('mouseup', function() {
        this.style.transform = 'translateY(-2px) !important';
        this.style.transition = 'all 0.3s ease !important';
    });

    // Add ripple effect for chat button (matching site style)
    chatBtn.addEventListener('click', function(e) {
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
            background: rgba(255, 255, 255, 0.1);
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

    // Only create WhatsApp button on mobile/tablet
    let whatsappBtn = null;
    if (!isDesktop) {
    whatsappBtn = document.createElement('a');
    whatsappBtn.id = 'whatsapp-btn-fixed';
    whatsappBtn.href = 'https://wa.me/447809887883';
    // Open WhatsApp in a new window safely
    whatsappBtn.target = '_blank';
    whatsappBtn.rel = 'noopener noreferrer';
        whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
        whatsappBtn.setAttribute('aria-label', 'Contact via WhatsApp');
        whatsappBtn.style.cssText = `
            background-color: #198754 !important;
            color: white !important;
            border: none !important;
            border-left: none !important;
            border-right: none !important;
            border-bottom: none !important;
            padding: 1rem !important;
            border-radius: 0 !important;
            font-size: 1.1rem !important;
            font-weight: 500 !important;
            cursor: pointer !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
            display: flex !important;
            width: 33.333% !important;
            height: 100% !important;
            margin: 0 !important;
            top: auto !important;
            left: auto !important;
            transform: none !important;
            opacity: 1 !important;
            visibility: visible !important;
            flex: 1 !important;
            justify-content: center !important;
            align-items: center !important;
            transition: all 0.3s ease !important;
            text-decoration: none !important;
            outline: none !important;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
            line-height: 1.5 !important;
            position: relative !important;
            text-align: center !important;
            box-sizing: border-box !important;
        `;

        // Add hover effect for WhatsApp button
        whatsappBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) !important';
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15) !important';
        });

        whatsappBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) !important';
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15) !important';
        });

        // Add active state for WhatsApp button (matching site style)
        whatsappBtn.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) !important';
            this.style.transition = 'all 0.1s ease !important';
        });

        whatsappBtn.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) !important';
            this.style.transition = 'all 0.3s ease !important';
        });

        // Add ripple effect for WhatsApp button
        whatsappBtn.addEventListener('click', function(e) {
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
                background: rgba(255, 255, 255, 0.1);
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
    }

    // Add buttons to container (only add phone and WhatsApp if not desktop)
    if (buttonContainer) {
        // Mobile/tablet: add buttons to container
        if (testBtn) buttonContainer.appendChild(testBtn);
        if (whatsappBtn) buttonContainer.appendChild(whatsappBtn);
        buttonContainer.appendChild(chatBtn);

        // Append container to html element
        document.documentElement.appendChild(buttonContainer);
    } else {
        // Desktop: append chat button directly to document
        document.documentElement.appendChild(chatBtn);
    }

    console.log('Floating buttons container created and appended to document root');

    // Add resize listener to handle dynamic screen size changes
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            forceFloatingButtons(); // Recreate buttons with new screen size
        }, 250); // Debounce resize events
    });
}

/**
 * Open professional chatbot modal with current site styling
 */
function openChatbot() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.id = 'chatbot-modal-overlay';
    modal.style.cssText = `
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
        background-color: rgba(0, 0, 0, 0.7) !important;
        display: flex !important;
        justify-content: center !important;
        align-items: flex-start !important;
    padding-top: 2vh !important;
        z-index: 10000 !important;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
        backdrop-filter: blur(2px) !important;
    `;

    modal.innerHTML = `
        <div style="
            background: var(--dark-bg);
            padding: 0 0 2rem 0;
            border-radius: 0;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            color: var(--text-light);
        " id="chatbot-modal-content">
            <button onclick="document.getElementById('chatbot-modal-overlay').remove()" style="
                position: absolute;
                top: 15px;
                right: 20px;
                background: none;
                border: none;
                font-size: 32px;
                cursor: pointer;
                color: var(--text-light);
                transition: all 0.3s ease;
                padding: 5px;
                border-radius: 0;
                z-index: 1001;
            " onmouseover="this.style.color='var(--bs-primary)'" onmouseout="this.style.color='var(--text-light)'">&times;</button>

            <div style="
                padding: 1.5rem 2rem;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.75rem;
            ">
                <i class="fas fa-robot" style="
                    font-size: 2rem;
                    color: white;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
                "></i>
            </div>

            <div style="padding: 2rem 2rem 0 2rem;" id="chatbot-modal-body">

            <div style="
                background: var(--dark-surface);
                border: 1px solid var(--dark-border);
                padding: 1rem;
                border-radius: 0;
                margin-bottom: 1rem;
            ">
                <p style="
                    margin: 0;
                    color: white;
                    font-size: 1rem;
                    line-height: 1.5;
                ">
                    <strong style="color: white;">Hi there! 👋</strong><br>
                    I'm William Bullard, your trusted North London locksmith. How can I help you today?
                </p>
            </div>

            <div style="margin-bottom: 1rem;">
                <p style="
                    margin-bottom: 0.5rem;
                    font-weight: 500;
                    color: white;
                    font-size: 1rem;
                ">What service do you need?</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    <button onclick="selectService('emergency')" style="
                        background: var(--bs-primary);
                        color: white;
                        border: none;
                        padding: 0.75rem 1rem;
                        border-radius: 0;
                        cursor: pointer;
                        font-size: 0.9rem;
                        font-weight: 500;
                        transition: all 0.3s ease;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                    " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.15)'">Emergency Locksmith</button>
                    <button onclick="selectService('car')" style="
                        background: var(--bs-primary);
                        color: white;
                        border: none;
                        padding: 0.75rem 1rem;
                        border-radius: 0;
                        cursor: pointer;
                        font-size: 0.9rem;
                        font-weight: 500;
                        transition: all 0.3s ease;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                    " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.15)'">Auto Locksmith</button>
                    <button onclick="selectService('safe')" style="
                        background: var(--bs-primary);
                        color: white;
                        border: none;
                        padding: 0.75rem 1rem;
                        border-radius: 0;
                        cursor: pointer;
                        font-size: 0.9rem;
                        font-weight: 500;
                        transition: all 0.3s ease;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                    " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.15)'">Safe Engineer</button>
                </div>
            </div>

            </div>

            <div style="
                margin-top: 1.5rem;
                padding-top: 1rem;
                text-align: center;
            ">
                <p style="
                    margin: 0;
                    font-size: 0.85rem;
                    color: #cccccc;
                    line-height: 1.4;
                ">
                    Response within 5 minutes • 24/7 Availablity • No call-out fee
                </p>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Add click outside to close
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });

    // Focus first button
    setTimeout(() => {
        const firstButton = modal.querySelector('button[onclick*="selectService"]');
        if (firstButton) firstButton.focus();
    }, 100);
}

/**
 * Handle service selection and show appropriate form
 */
function selectService(serviceType) {
    const modalBody = document.getElementById('chatbot-modal-body');
    const serviceForms = {
        'emergency': `
            <div style="
                background: var(--dark-surface);
                padding: 1rem;
                border-radius: 0;
                margin-bottom: 1rem;
            ">
                <p style="
                    margin: 0;
                    color: white;
                    font-size: 1rem;
                    line-height: 1.5;
                ">
                    <strong style="color: white;">Emergency Locksmith Service</strong><br>
                    I understand you're locked out. Let's get you back inside quickly!
                </p>
            </div>

            <form id="emergency-form" style="display: flex; flex-direction: column; gap: 1rem;">
                <div>
                    <label style="
                        display: block;
                        margin-bottom: 0.35rem;
                        font-weight: 500;
                        color: white;
                        font-size: 0.95rem;
                    ">Your Name:</label>
                    <input type="text" id="emergency-name" name="emergency-name" required style="
                        width: 100%;
                        padding: 0.75rem 1rem;
                        background-color: var(--dark-surface);
                        color: var(--text-light);
                        border: 1px solid var(--dark-border);
                        border-radius: 0;
                        font-size: 0.95rem;
                        transition: all 0.3s ease;
                        box-sizing: border-box;
                    " onfocus="this.style.borderColor='var(--bs-primary)'; this.style.boxShadow='0 0 0 0.2rem rgba(13, 110, 253, 0.12)'" onblur="this.style.borderColor='var(--dark-border)'; this.style.boxShadow='none'">
                </div>

                <div>
                    <label style="
                        display: block;
                        margin-bottom: 0.35rem;
                        font-weight: 500;
                        color: white;
                        font-size: 0.95rem;
                    ">Phone Number:</label>
                    <input type="tel" id="emergency-phone" name="emergency-phone" required style="
                        width: 100%;
                        padding: 0.75rem 1rem;
                        background-color: var(--dark-surface);
                        color: var(--text-light);
                        border: 1px solid var(--dark-border);
                        border-radius: 0;
                        font-size: 0.95rem;
                        transition: all 0.3s ease;
                        box-sizing: border-box;
                    " onfocus="this.style.borderColor='var(--bs-danger)'; this.style.boxShadow='0 0 0 0.2rem rgba(220, 53, 69, 0.12)'" onblur="this.style.borderColor='var(--dark-border)'; this.style.boxShadow='none'">
                </div>

                <div>
                    <label style="
                        display: block;
                        margin-bottom: 0.35rem;
                        font-weight: 500;
                        color: white;
                        font-size: 0.95rem;
                    ">Location:</label>
                    <input type="text" id="emergency-location" name="emergency-location" placeholder="e.g., Crouch End, Camden, Islington" required style="
                        width: 100%;
                        padding: 0.75rem 1rem;
                        background-color: var(--dark-surface);
                        color: var(--text-light);
                        border: 1px solid var(--dark-border);
                        border-radius: 0;
                        font-size: 0.95rem;
                        transition: all 0.3s ease;
                        box-sizing: border-box;
                    " onfocus="this.style.borderColor='var(--bs-danger)'; this.style.boxShadow='0 0 0 0.2rem rgba(220, 53, 69, 0.12)'" onblur="this.style.borderColor='var(--dark-border)'; this.style.boxShadow='none'">
                </div>

                <div>
                    <label style="
                        display: block;
                        margin-bottom: 0.35rem;
                        font-weight: 500;
                        color: white;
                        font-size: 0.95rem;
                    ">Type of Property:</label>
                    <select id="emergency-property-type" name="emergency-property-type" required style="
                        width: 100%;
                        padding: 0.75rem 1rem;
                        background-color: var(--dark-surface);
                        color: var(--text-light);
                        border: none;
                        border-radius: 0;
                        font-size: 0.95rem;
                        transition: all 0.3s ease;
                        box-sizing: border-box;
                    " onfocus="this.style.borderColor='var(--bs-danger)'; this.style.boxShadow='0 0 0 0.2rem rgba(220, 53, 69, 0.12)'" onblur="this.style.borderColor='var(--dark-border)'; this.style.boxShadow='none'">
                        <option value="">Select property type...</option>
                        <option value="home">Residential Home</option>
                        <option value="apartment">Apartment/Flat</option>
                        <option value="office">Office/Business</option>
                        <option value="commercial">Commercial Property</option>
                    </select>
                </div>

                <div>
                    <label style="
                        display: block;
                        margin-bottom: 0.35rem;
                        font-weight: 500;
                        color: var(--text-light);
                        font-size: 0.95rem;
                    ">Additional Details:</label>
                    <textarea id="emergency-details" name="emergency-details" rows="3" placeholder="Describe the situation (e.g., locked out of front door, garage, etc.)" style="
                        width: 100%;
                        padding: 0.75rem 1rem;
                        background-color: var(--dark-surface);
                        color: var(--text-light);
                        border: 1px solid var(--dark-border);
                        border-radius: 0;
                        font-size: 0.95rem;
                        resize: vertical;
                        transition: all 0.3s ease;
                        box-sizing: border-box;
                    " onfocus="this.style.borderColor='var(--bs-danger)'; this.style.boxShadow='0 0 0 0.2rem rgba(220, 53, 69, 0.12)'" onblur="this.style.borderColor='var(--dark-border)'; this.style.boxShadow='none'"></textarea>
                </div>


                <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
                    <button type="submit" style="
                        flex: 1;
                        background: #0d6efd;
                        color: white;
                        border: none;
                        padding: 1rem 2rem;
                        border-radius: 0;
                        cursor: pointer;
                        font-weight: 500;
                        font-size: 1rem;
                        transition: all 0.3s ease;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                        position: relative;
                        overflow: hidden;
                        width: 100%;
                    " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.15)'">
                        Request Emergency Locksmith
                    </button>
                </div>
            </form>
        `,
        'car': `
            <div style="
                background: var(--dark-surface);
                padding: 1rem;
                border-radius: 0;
                margin-bottom: 1rem;
            ">
                <p style="
                    margin: 0;
                    color: white;
                    font-size: 1rem;
                    line-height: 1.5;
                ">
                    <strong style="color: white;">Auto Locksmith Service</strong><br>
                    I can help with car keys, locks, and programming. Let's get you back on the road!
                </p>
            </div>

            <form id="car-form" style="display: flex; flex-direction: column; gap: 1rem;">
                <div>
                    <label style="
                        display: block;
                        margin-bottom: 0.35rem;
                        font-weight: 500;
                        color: white;
                        font-size: 0.95rem;
                    ">Your Name:</label>
                    <input type="text" id="car-name" name="car-name" required style="
                        width: 100%;
                        padding: 0.75rem 1rem;
                        background-color: var(--dark-surface);
                        color: var(--text-light);
                        border: 1px solid var(--dark-border);
                        border-radius: 0;
                        font-size: 0.95rem;
                        transition: all 0.3s ease;
                        box-sizing: border-box;
                    " onfocus="this.style.borderColor='var(--bs-primary)'; this.style.boxShadow='0 0 0 0.2rem rgba(13, 110, 253, 0.12)'" onblur="this.style.borderColor='var(--dark-border)'; this.style.boxShadow='none'">
                </div>

                <div>
                    <label style="
                        display: block;
                        margin-bottom: 0.35rem;
                        font-weight: 500;
                        color: white;
                        font-size: 0.95rem;
                    ">Phone Number:</label>
                    <input type="tel" id="car-phone" name="car-phone" required style="
                        width: 100%;
                        padding: 0.75rem 1rem;
                        background-color: var(--dark-surface);
                        color: var(--text-light);
                        border: 1px solid var(--dark-border);
                        border-radius: 0;
                        font-size: 0.95rem;
                        transition: all 0.3s ease;
                        box-sizing: border-box;
                    " onfocus="this.style.borderColor='var(--bs-success)'; this.style.boxShadow='0 0 0 0.2rem rgba(25, 135, 84, 0.12)'" onblur="this.style.borderColor='var(--dark-border)'; this.style.boxShadow='none'">
                </div>

                <div>
                    <label style="
                        display: block;
                        margin-bottom: 0.35rem;
                        font-weight: 500;
                        color: white;
                        font-size: 0.95rem;
                    ">Location:</label>
                    <input type="text" id="car-location" name="car-location" placeholder="Where is your vehicle located?" required style="
                        width: 100%;
                        padding: 0.75rem 1rem;
                        background-color: var(--dark-surface);
                        color: var(--text-light);
                        border: 1px solid var(--dark-border);
                        border-radius: 0;
                        font-size: 0.95rem;
                        transition: all 0.3s ease;
                        box-sizing: border-box;
                    " onfocus="this.style.borderColor='var(--bs-success)'; this.style.boxShadow='0 0 0 0.2rem rgba(25, 135, 84, 0.12)'" onblur="this.style.borderColor='var(--dark-border)'; this.style.boxShadow='none'">
                </div>

                <div>
                    <label style="
                        display: block;
                        margin-bottom: 0.35rem;
                        font-weight: 500;
                        color: white;
                        font-size: 0.95rem;
                    ">Vehicle Make & Model:</label>
                    <input type="text" id="car-make-model" name="car-make-model" placeholder="e.g., Ford Focus, BMW X3" required style="
                        width: 100%;
                        padding: 0.75rem 1rem;
                        background-color: var(--dark-surface);
                        color: var(--text-light);
                        border: 1px solid var(--dark-border);
                        border-radius: 0;
                        font-size: 0.95rem;
                        transition: all 0.3s ease;
                        box-sizing: border-box;
                    " onfocus="this.style.borderColor='var(--bs-success)'; this.style.boxShadow='0 0 0 0.2rem rgba(25, 135, 84, 0.12)'" onblur="this.style.borderColor='var(--dark-border)'; this.style.boxShadow='none'">
                </div>

                <div>
                    <label style="
                        display: block;
                        margin-bottom: 0.35rem;
                        font-weight: 500;
                        color: white;
                        font-size: 0.95rem;
                    ">Service Needed:</label>
                    <select id="car-service-type" name="car-service-type" required style="
                        width: 100%;
                        padding: 0.75rem 1rem;
                        background-color: var(--dark-surface);
                        color: var(--text-light);
                        border: none;
                        border-radius: 0;
                        font-size: 0.95rem;
                        transition: all 0.3s ease;
                        box-sizing: border-box;
                    " onfocus="this.style.borderColor='var(--bs-success)'; this.style.boxShadow='0 0 0 0.2rem rgba(25, 135, 84, 0.12)'" onblur="this.style.borderColor='var(--dark-border)'; this.style.boxShadow='none'">
                        <option value="">Select service...</option>
                        <option value="lockout">Locked out of vehicle</option>
                        <option value="key-replacement">Lost/broken key replacement</option>
                        <option value="key-programming">Key programming/transponder</option>
                        <option value="key-cutting">Additional key cutting</option>
                        <option value="ignition">Ignition repair/replacement</option>
                    </select>
                </div>

                <div>
                    <label style="
                        display: block;
                        margin-bottom: 0.35rem;
                        font-weight: 500;
                        color: white;
                        font-size: 0.95rem;
                    ">Additional Details:</label>
                    <textarea id="car-details" name="car-details" rows="3" placeholder="Any additional information about your vehicle or situation" style="
                        width: 100%;
                        padding: 0.75rem 1rem;
                        background-color: var(--dark-surface);
                        color: var(--text-light);
                        border: 1px solid var(--dark-border);
                        border-radius: 0;
                        font-size: 0.95rem;
                        resize: vertical;
                        transition: all 0.3s ease;
                        box-sizing: border-box;
                    " onfocus="this.style.borderColor='var(--bs-success)'; this.style.boxShadow='0 0 0 0.2rem rgba(25, 135, 84, 0.12)'" onblur="this.style.borderColor='var(--dark-border)'; this.style.boxShadow='none'"></textarea>
                </div>


                <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
                    <button type="submit" style="
                        flex: 1;
                        background: #0d6efd;
                        color: white;
                        border: none;
                        padding: 1rem 2rem;
                        border-radius: 0;
                        cursor: pointer;
                        font-weight: 500;
                        font-size: 1rem;
                        transition: all 0.3s ease;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                        position: relative;
                        overflow: hidden;
                        width: 100%;
                    " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.15)'">
                        Request Auto Locksmith
                    </button>
                </div>
            </form>
        `,
        'safe': `
            <div style="
                background: var(--dark-surface);
                padding: 1rem;
                border-radius: 0;
                margin-bottom: 1rem;
            ">
                <p style="
                    margin: 0;
                    color: white;
                    font-size: 1rem;
                    line-height: 1.5;
                ">
                    <strong style="color: white;">Safe Engineer Service</strong><br>
                    Professional safe opening, repair, and installation services available.
                </p>
            </div>

            <form id="safe-form" style="display: flex; flex-direction: column; gap: 1rem;">
                <div>
                    <label style="
                        display: block;
                        margin-bottom: 0.35rem;
                        font-weight: 500;
                        color: white;
                        font-size: 0.95rem;
                    ">Your Name:</label>
                    <input type="text" id="safe-name" name="safe-name" required style="
                        width: 100%;
                        padding: 0.75rem 1rem;
                        background-color: var(--dark-surface);
                        color: var(--text-light);
                        border: 1px solid var(--dark-border);
                        border-radius: 0;
                        font-size: 0.95rem;
                        transition: all 0.3s ease;
                        box-sizing: border-box;
                    " onfocus="this.style.borderColor='var(--bs-primary)'; this.style.boxShadow='0 0 0 0.2rem rgba(13, 110, 253, 0.12)'" onblur="this.style.borderColor='var(--dark-border)'; this.style.boxShadow='none'">
                </div>

                <div>
                    <label style="
                        display: block;
                        margin-bottom: 0.35rem;
                        font-weight: 500;
                        color: white;
                        font-size: 0.95rem;
                    ">Phone Number:</label>
                    <input type="tel" id="safe-phone" name="safe-phone" required style="
                        width: 100%;
                        padding: 0.75rem 1rem;
                        background-color: var(--dark-surface);
                        color: var(--text-light);
                        border: 1px solid var(--dark-border);
                        border-radius: 0;
                        font-size: 0.95rem;
                        transition: all 0.3s ease;
                        box-sizing: border-box;
                    " onfocus="this.style.borderColor='var(--bs-primary)'; this.style.boxShadow='0 0 0 0.2rem rgba(13, 110, 253, 0.12)'" onblur="this.style.borderColor='var(--dark-border)'; this.style.boxShadow='none'">
                </div>

                <div>
                    <label style="
                        display: block;
                        margin-bottom: 0.35rem;
                        font-weight: 500;
                        color: white;
                        font-size: 0.95rem;
                    ">Location:</label>
                    <input type="text" id="safe-location" name="safe-location" placeholder="Where is the safe located?" required style="
                        width: 100%;
                        padding: 0.75rem 1rem;
                        background-color: var(--dark-surface);
                        color: var(--text-light);
                        border: 1px solid var(--dark-border);
                        border-radius: 0;
                        font-size: 0.95rem;
                        transition: all 0.3s ease;
                        box-sizing: border-box;
                    " onfocus="this.style.borderColor='var(--bs-primary)'; this.style.boxShadow='0 0 0 0.2rem rgba(13, 110, 253, 0.12)'" onblur="this.style.borderColor='var(--dark-border)'; this.style.boxShadow='none'">
                </div>

                <div>
                    <label style="
                        display: block;
                        margin-bottom: 0.35rem;
                        font-weight: 500;
                        color: white;
                        font-size: 0.95rem;
                    ">Safe Type:</label>
                    <select id="safe-type" name="safe-type" required style="
                        width: 100%;
                        padding: 0.75rem 1rem;
                        background-color: var(--dark-surface);
                        color: var(--text-light);
                        border: none;
                        border-radius: 0;
                        font-size: 0.95rem;
                        transition: all 0.3s ease;
                        box-sizing: border-box;
                    " onfocus="this.style.borderColor='var(--bs-primary)'; this.style.boxShadow='0 0 0 0.2rem rgba(13, 110, 253, 0.12)'" onblur="this.style.borderColor='var(--dark-border)'; this.style.boxShadow='none'">
                        <option value="">Select safe type...</option>
                        <option value="wall-safe">Wall Safe</option>
                        <option value="floor-safe">Floor Safe</option>
                        <option value="gun-safe">Gun Safe</option>
                        <option value="deposit-safe">Deposit Safe</option>
                        <option value="commercial-safe">Commercial Safe</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div>
                    <label style="
                        display: block;
                        margin-bottom: 0.35rem;
                        font-weight: 500;
                        color: white;
                        font-size: 0.95rem;
                    ">Safe Brand/Model (if known):</label>
                    <input type="text" id="safe-brand" name="safe-brand" placeholder="e.g., Sentry, Honeywell, etc." style="
                        width: 100%;
                        padding: 0.75rem 1rem;
                        background-color: var(--dark-surface);
                        color: var(--text-light);
                        border: 1px solid var(--dark-border);
                        border-radius: 0;
                        font-size: 0.95rem;
                        transition: all 0.3s ease;
                        box-sizing: border-box;
                    " onfocus="this.style.borderColor='var(--bs-primary)'; this.style.boxShadow='0 0 0 0.2rem rgba(13, 110, 253, 0.12)'" onblur="this.style.borderColor='var(--dark-border)'; this.style.boxShadow='none'">
                </div>

                <div>
                    <label style="
                        display: block;
                        margin-bottom: 0.35rem;
                        font-weight: 500;
                        color: white;
                        font-size: 0.95rem;
                    ">Additional Details:</label>
                    <textarea id="safe-details" name="safe-details" rows="3" placeholder="Describe the safe situation, any codes you remember, etc." style="
                        width: 100%;
                        padding: 0.75rem 1rem;
                        background-color: var(--dark-surface);
                        color: var(--text-light);
                        border: 1px solid var(--dark-border);
                        border-radius: 0;
                        font-size: 0.95rem;
                        resize: vertical;
                        transition: all 0.3s ease;
                        box-sizing: border-box;
                    " onfocus="this.style.borderColor='var(--bs-primary)'; this.style.boxShadow='0 0 0 0.2rem rgba(13, 110, 253, 0.12)'" onblur="this.style.borderColor='var(--dark-border)'; this.style.boxShadow='none'"></textarea>
                </div>


                <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
                    <button type="submit" style="
                        flex: 1;
                        background: #0d6efd;
                        color: white;
                        border: none;
                        padding: 1rem 2rem;
                        border-radius: 0;
                        cursor: pointer;
                        font-weight: 500;
                        font-size: 1rem;
                        transition: all 0.3s ease;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                        position: relative;
                        overflow: hidden;
                        width: 100%;
                    " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.15)'">
                        Request Safe Engineer
                    </button>
                </div>
            </form>
        `
    };

    modalBody.innerHTML = serviceForms[serviceType];

    // Add form submission handlers
    const form = modalBody.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleServiceFormSubmission(serviceType, this);
        });
    }


    // Focus first input
    setTimeout(() => {
        const firstInput = modalBody.querySelector('input');
        if (firstInput) firstInput.focus();
    }, 200);
}

/**
 * Handle service form submission
 */
async function handleServiceFormSubmission(serviceType, form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;

    // Get reCAPTCHA V3 token
    let recaptchaToken;
    try {
        recaptchaToken = await getRecaptchaToken(serviceType + '_form');
    } catch (error) {
        console.error('reCAPTCHA error:', error);
        // Use fallback token to allow form submission
        recaptchaToken = 'recaptcha_error_fallback';
        console.log('Using fallback token due to reCAPTCHA error');
    }    // Prepare form data for PHP submission
    const phpFormData = new FormData();
    phpFormData.append('form_type', serviceType);
    phpFormData.append('name', data[`${serviceType}-name`] || '');
    phpFormData.append('phone', data[`${serviceType}-phone`] || '');
    phpFormData.append('location', data[`${serviceType}-location`] || '');
    phpFormData.append('g-recaptcha-response', recaptchaToken); // Add reCAPTCHA token

    // Add service-specific data
    if (serviceType === 'emergency') {
        phpFormData.append('property_type', data['emergency-property-type'] || '');
        phpFormData.append('details', data['emergency-details'] || '');
    } else if (serviceType === 'car') {
        phpFormData.append('vehicle_make_model', data['car-make-model'] || '');
        phpFormData.append('service_type', data['car-service-type'] || '');
        phpFormData.append('details', data['car-details'] || '');
    } else if (serviceType === 'safe') {
        phpFormData.append('safe_type', data['safe-type'] || '');
        phpFormData.append('safe_brand', data['safe-brand'] || '');
        phpFormData.append('details', data['safe-details'] || '');
    }

    // Submit to PHP script with connection test first
    console.log('Testing server connection...');
    
    // First, test if server is reachable with a simple test
    fetch('test.php', {
        method: 'GET',
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Server connection test failed - PHP may not be available');
        }
        return response.json();
    })
    .then(testData => {
        console.log('Server connection test passed:', testData);
        
        // Server is reachable, now submit the actual form
        console.log('Submitting form data to send_email.php...');
        console.log('Form data being sent:', Object.fromEntries(phpFormData.entries()));
        
        return fetch('send_email.php', {
            method: 'POST',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: phpFormData
        });
    })
    .catch(serverError => {
        console.warn('Server/PHP not available, using fallback method:', serverError);
        // Fallback: Create a mailto link with form data
        throw new Error('Server not available - using fallback contact method');
    })
    .then(response => {
        console.log('Form submission response:', response.status, response.statusText);
        
        // Check if response is actually HTML (error page) instead of JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            console.warn('Received non-JSON response, likely server error page');
            return response.text().then(text => {
                console.log('Response text:', text.substring(0, 500));
                throw new Error('Server returned HTML instead of JSON - likely PHP error');
            });
        }
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        if (data.success) {
            // Show confirmation message in modal instead of alert
            const modalBody = document.getElementById('chatbot-modal-body');
            modalBody.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <div style="font-size: 3rem; color: #28a745; margin-bottom: 1rem;">✓</div>
                    <h3 style="color: #28a745; margin-bottom: 1rem; font-size: 1.5rem;">Request Sent Successfully!</h3>
                    <p style="color: var(--text-light); margin-bottom: 2rem; line-height: 1.6;">
                        ${data.message}
                    </p>
                    <button onclick="document.getElementById('chatbot-modal-overlay').remove()"
                            style="background: #007bff; color: white; border: none; padding: 12px 24px;
                                   border-radius: 0; cursor: pointer; font-size: 1rem; font-weight: 500;">
                        Close
                    </button>
                </div>
            `;
        } else {
            // Show error message in modal
            const modalBody = document.getElementById('chatbot-modal-body');
            modalBody.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <div style="font-size: 3rem; color: #dc3545; margin-bottom: 1rem;">⚠</div>
                    <h3 style="color: #dc3545; margin-bottom: 1rem; font-size: 1.5rem;">Error Sending Request</h3>
                    <p style="color: var(--text-light); margin-bottom: 2rem; line-height: 1.6;">
                        ${data.message}
                    </p>
                    <div style="display: flex; gap: 10px; justify-content: center;">
                        <button onclick="document.getElementById('chatbot-modal-overlay').remove()"
                                style="background: #6c757d; color: white; border: none; padding: 12px 24px;
                                       border-radius: 0; cursor: pointer; font-size: 1rem;">
                            Close
                        </button>
                    </div>
                </div>
            `;
        }
    })
    .catch(error => {
        console.error('Form submission error details:', error);
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Prepare mailto fallback
        const customerName = data[`${serviceType}-name`] || 'Unknown';
        const customerPhone = data[`${serviceType}-phone`] || 'Not provided';
        const customerLocation = data[`${serviceType}-location`] || 'Not provided';
        
        let serviceDetails = '';
        if (serviceType === 'emergency') {
            serviceDetails = `Property Type: ${data['emergency-property-type'] || 'Not specified'}%0ADetails: ${data['emergency-details'] || 'Not provided'}`;
        } else if (serviceType === 'car') {
            serviceDetails = `Vehicle: ${data['car-make-model'] || 'Not specified'}%0AService: ${data['car-service-type'] || 'Not specified'}%0ADetails: ${data['car-details'] || 'Not provided'}`;
        } else if (serviceType === 'safe') {
            serviceDetails = `Safe Type: ${data['safe-type'] || 'Not specified'}%0ASafe Brand: ${data['safe-brand'] || 'Not specified'}%0ADetails: ${data['safe-details'] || 'Not provided'}`;
        }
        
        const mailtoSubject = encodeURIComponent(`${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)} Service Request - Bullard Locks`);
        const mailtoBody = encodeURIComponent(`Customer Details:%0AName: ${customerName}%0APhone: ${customerPhone}%0ALocation: ${customerLocation}%0A%0AService Details:%0A${serviceDetails}`);
        const mailtoLink = `mailto:william@bullardlocks.com?subject=${mailtoSubject}&body=${mailtoBody}`;

        // Show enhanced error message with multiple contact options
        const modalBody = document.getElementById('chatbot-modal-body');
        modalBody.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <div style="font-size: 3rem; color: #dc3545; margin-bottom: 1rem;">📞</div>
                <h3 style="color: #dc3545; margin-bottom: 1rem; font-size: 1.5rem;">Connection Error</h3>
                <p style="color: var(--text-light); margin-bottom: 1.5rem; line-height: 1.6;">
                    Sorry, there was an error sending your request. Please use one of these options:
                </p>
                <div style="background: var(--primary-color); color: white; padding: 1.5rem; margin: 1rem 0; border-radius: 8px;">
                    <div style="font-size: 1.5rem; font-weight: bold; margin-bottom: 0.5rem;">📱 07809 887 883</div>
                    <div style="font-size: 0.9rem; opacity: 0.9;">Call for immediate assistance</div>
                </div>
                <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 1.5rem;">
                    <a href="${mailtoLink}" 
                       style="background: #28a745; color: white; border: none; padding: 12px 24px;
                              border-radius: 4px; cursor: pointer; font-size: 1rem; text-decoration: none; display: inline-block;">
                        📧 Send Email
                    </a>
                    <button onclick="location.reload()" 
                            style="background: #007bff; color: white; border: none; padding: 12px 24px;
                                   border-radius: 4px; cursor: pointer; font-size: 1rem;">
                        🔄 Try Again
                    </button>
                    <button onclick="document.getElementById('chatbot-modal-overlay').remove()"
                            style="background: #6c757d; color: white; border: none; padding: 12px 24px;
                                   border-radius: 4px; cursor: pointer; font-size: 1rem;">
                        ✕ Close
                    </button>
                </div>
                <p style="color: var(--text-light); font-size: 0.8rem; margin-top: 1rem; opacity: 0.8;">
                    Error details logged for technical support
                </p>
            </div>
        `;
    });
}

// reCAPTCHA V3 is loaded automatically - no callback functions needed