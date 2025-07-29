/**
 * Bullard Locks Website - JavaScript
 * Handles header/footer inclusion and basic form validation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Add preload class to prevent initial layout shifts
    document.body.classList.add('preload');
    
    // Load header and footer
    loadIncludes();
    
    // Initialize form validation
    initializeFormValidation();
    
    // Remove preload class after everything is loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            document.body.classList.remove('preload');
        }, 100);
    });
});

/**
 * Load header and footer includes
 */
function loadIncludes() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');
    
    // Determine the correct path based on current location
    const path = getBasePath();
    
    // Add loading classes to prevent layout shifts
    if (headerPlaceholder) {
        headerPlaceholder.classList.add('loading');
    }
    if (footerPlaceholder) {
        footerPlaceholder.classList.add('loading');
    }
    
    // Load header
    if (headerPlaceholder) {
        fetch(path + 'includes/header.html')
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                headerPlaceholder.classList.remove('loading');
                // Update image paths in the loaded header
                updateImagePaths(headerPlaceholder, path);
                // Update navigation links
                updateNavigationLinks(headerPlaceholder, path);
                highlightCurrentPage();
                // Initialize mobile menu after header is loaded
                initializeMobileMenu();
            })
            .catch(error => {
                console.error('Error loading header:', error);
                headerPlaceholder.classList.remove('loading');
            });
    }
    
    // Load footer
    if (footerPlaceholder) {
        fetch(path + 'includes/footer.html')
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
                footerPlaceholder.classList.remove('loading');
                // Update image paths in the loaded footer
                updateImagePaths(footerPlaceholder, path);
                // Initialize chatbot after footer is loaded
                initializeChatbot();
            })
            .catch(error => {
                console.error('Error loading footer:', error);
                footerPlaceholder.classList.remove('loading');
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
    console.log('Initializing mobile menu...');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        console.log('Found navbar elements');
        
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
        
        // Close mobile menu when clicking on regular nav links (not dropdown toggles)
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle)');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbarCollapse.classList.remove('show');
            });
        });
        
        // Handle mobile dropdown toggles with both click and touch events
        const dropdownToggles = document.querySelectorAll('.navbar-nav .dropdown-toggle');
        console.log('Found dropdown toggles:', dropdownToggles.length);
        
        dropdownToggles.forEach((toggle, index) => {
            console.log(`Setting up dropdown toggle ${index}:`, toggle.textContent);
            
            // Handle both click and touchstart events
            ['click', 'touchstart'].forEach(eventType => {
                toggle.addEventListener(eventType, function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    console.log(`${eventType} event on dropdown toggle:`, this.textContent);
                    
                    // Close other dropdowns
                    const allDropdowns = document.querySelectorAll('.navbar-nav .dropdown-menu');
                    allDropdowns.forEach(dropdown => {
                        if (dropdown !== this.nextElementSibling) {
                            dropdown.classList.remove('show');
                        }
                    });
                    
                    // Toggle current dropdown
                    const dropdown = this.nextElementSibling;
                    if (dropdown) {
                        const isShowing = dropdown.classList.contains('show');
                        dropdown.classList.toggle('show');
                        console.log(`Dropdown ${isShowing ? 'closed' : 'opened'}`);
                    }
                });
            });
        });
        
        // Close dropdowns when clicking dropdown items
        const dropdownItems = document.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', () => {
                // Close the dropdown
                const dropdown = item.closest('.dropdown-menu');
                if (dropdown) {
                    dropdown.classList.remove('show');
                }
                // Close the mobile menu
                navbarCollapse.classList.remove('show');
            });
        });
        
        // Add mobile-specific CSS class detection
        const isMobile = window.innerWidth <= 1199;
        if (isMobile) {
            document.body.classList.add('mobile-view');
            console.log('Mobile view detected');
        }
        
    } else {
        console.log('Navbar elements not found');
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

/* ======================
   CHATBOT FUNCTIONALITY
   ====================== */

// Initialize chatbot
function initializeChatbot() {
    // Add accessibility attributes
    const chatButton = document.querySelector('.chat-float-button');
    if (chatButton) {
        chatButton.setAttribute('role', 'button');
        chatButton.setAttribute('tabindex', '0');
        
        // Add keyboard support
        chatButton.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openChatbot();
            }
        });
    }
    
    // Add resize handler for mobile optimization
    window.addEventListener('resize', handleChatbotResize);
}

// Handle chatbot resize for different screen sizes
function handleChatbotResize() {
    const overlay = document.getElementById('chatbotOverlay');
    if (overlay && overlay.classList.contains('show')) {
        // Ensure chatbot is properly positioned on resize
        const container = overlay.querySelector('.chatbot-container');
        if (container && window.innerWidth <= 480) {
            container.style.height = '100vh';
        } else {
            container.style.height = '';
        }
    }
}

// Chatbot state management
let chatbotState = {
    step: 'initial',
    serviceType: null,
    emergencyType: null,
    responses: []
};

// Open chatbot
function openChatbot() {
    const overlay = document.getElementById('chatbotOverlay');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Initialize chat if empty
    const chatLog = document.getElementById('chatLog');
    if (chatLog.children.length === 0) {
        showInitialQuestion();
    }
}

// Close chatbot
function closeChatbot() {
    const overlay = document.getElementById('chatbotOverlay');
    overlay.classList.remove('show');
    document.body.style.overflow = ''; // Restore scrolling
}

// Close chatbot when clicking overlay
function closeChatbotOnOverlay(event) {
    if (event.target === event.currentTarget) {
        closeChatbot();
    }
}

// Add message to chat log
function addChatMessage(message, isUser = false) {
    const chatLog = document.getElementById('chatLog');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message';
    messageDiv.innerHTML = `<div class="${isUser ? 'user-message' : 'bot-message'}">${message}</div>`;
    chatLog.appendChild(messageDiv);
    chatLog.scrollTop = chatLog.scrollHeight;
}

// Clear current interaction
function clearChatInteraction() {
    document.getElementById('currentInteraction').innerHTML = '';
}

// Initial question
function showInitialQuestion() {
    addChatMessage('Hello! How can I help you today?');
    
    const optionsHtml = `
        <div class="chat-options">
            <button class="chat-option-button" onclick="selectInitialService('auto')">
                <i class="fas fa-car me-2"></i>Auto Locksmith
            </button>
            <button class="chat-option-button" onclick="selectInitialService('emergency')">
                <i class="fas fa-exclamation-triangle me-2"></i>Emergency Locksmith
            </button>
            <button class="chat-option-button" onclick="selectInitialService('quotation')">
                <i class="fas fa-calculator me-2"></i>Get a Quote
            </button>
        </div>
    `;
    
    document.getElementById('currentInteraction').innerHTML = optionsHtml;
}

// Handle initial service selection
function selectInitialService(service) {
    chatbotState.serviceType = service;
    
    const serviceText = {
        'auto': 'Auto Locksmith',
        'emergency': 'Emergency Locksmith',
        'quotation': 'Get a Quote'
    };
    addChatMessage(serviceText[service], true);
    
    clearChatInteraction();
    
    switch(service) {
        case 'auto':
            showAutoLocksmithForm();
            break;
        case 'emergency':
            showEmergencyTypeSelection();
            break;
        case 'quotation':
            showQuotationForm();
            break;
    }
}

// Emergency type selection
function showEmergencyTypeSelection() {
    addChatMessage('What type of emergency locksmith service do you need?');
    
    const optionsHtml = `
        <div class="chat-radio-group">
            <label class="chat-radio-option">
                <input type="radio" name="emergencyType" value="auto">
                <i class="fas fa-car me-2"></i>Auto Locksmith Emergency
            </label>
            <label class="chat-radio-option">
                <input type="radio" name="emergencyType" value="residential">
                <i class="fas fa-home me-2"></i>Residential Emergency
            </label>
            <label class="chat-radio-option">
                <input type="radio" name="emergencyType" value="commercial">
                <i class="fas fa-building me-2"></i>Commercial Emergency
            </label>
        </div>
        <button class="chat-submit-button" onclick="submitEmergencyType()">Submit</button>
    `;
    
    document.getElementById('currentInteraction').innerHTML = optionsHtml;
}

// Submit emergency type
function submitEmergencyType() {
    const selectedType = document.querySelector('input[name="emergencyType"]:checked');
    
    if (!selectedType) {
        alert('Please select an emergency type');
        return;
    }
    
    chatbotState.emergencyType = selectedType.value;
    
    const typeText = {
        'auto': 'Auto Locksmith Emergency',
        'residential': 'Residential Emergency',
        'commercial': 'Commercial Emergency'
    };
    addChatMessage(typeText[selectedType.value], true);
    
    clearChatInteraction();
    showEmergencyForm(selectedType.value);
}

// Show emergency form based on type
function showEmergencyForm(type) {
    addChatMessage('I need some quick details to dispatch a locksmith immediately.');
    
    let formHtml = `
        <div class="emergency-form">
            <input type="tel" class="chat-form-input" placeholder="Your phone number *" id="phone" required>
            <input type="text" class="chat-form-input" placeholder="Your location/postcode *" id="location" required>
    `;
    
    if (type === 'auto') {
        formHtml += `
            <input type="text" class="chat-form-input" placeholder="Car make and model" id="carInfo">
            <input type="text" class="chat-form-input" placeholder="Registration number (optional)" id="registration">
        `;
    } else if (type === 'residential') {
        formHtml += `
            <select class="chat-form-input" id="propertyType">
                <option value="">Property type</option>
                <option value="house">House</option>
                <option value="flat">Flat</option>
                <option value="other">Other</option>
            </select>
        `;
    } else if (type === 'commercial') {
        formHtml += `
            <input type="text" class="chat-form-input" placeholder="Business name" id="businessName">
            <select class="chat-form-input" id="urgency">
                <option value="">Urgency level</option>
                <option value="immediate">Immediate (blocking business)</option>
                <option value="today">Today</option>
                <option value="scheduled">Can be scheduled</option>
            </select>
        `;
    }
    
    formHtml += `
            <button class="chat-submit-button" onclick="submitEmergencyRequest()">Submit</button>
        </div>
    `;
    
    document.getElementById('currentInteraction').innerHTML = formHtml;
}

// Submit emergency request
function submitEmergencyRequest() {
    const phone = document.getElementById('phone').value;
    const location = document.getElementById('location').value;
    
    if (!phone || !location) {
        alert('Please provide your phone number and location');
        return;
    }
    
    const formData = {
        phone: phone,
        location: location,
        type: chatbotState.emergencyType
    };
    
    if (chatbotState.emergencyType === 'auto') {
        formData.carInfo = document.getElementById('carInfo').value;
        formData.registration = document.getElementById('registration').value;
    } else if (chatbotState.emergencyType === 'residential') {
        formData.propertyType = document.getElementById('propertyType').value;
    } else if (chatbotState.emergencyType === 'commercial') {
        formData.businessName = document.getElementById('businessName').value;
        formData.urgency = document.getElementById('urgency').value;
    }
    
    clearChatInteraction();
    
    addChatMessage('Emergency request submitted!', true);
    addChatMessage(`Thank you! A locksmith will call ${phone} within 5 minutes. They are being notified right now.`);
    addChatMessage('Reference number: #EMG-' + Date.now().toString().slice(-6));
    
    console.log('Emergency Request:', formData);
    
    setTimeout(() => {
        document.getElementById('currentInteraction').innerHTML = `
            <button class="chat-submit-button" onclick="restartChat()">
                <i class="fas fa-redo me-2"></i>Start New Request
            </button>
        `;
    }, 2000);
}

// Show auto locksmith form
function showAutoLocksmithForm() {
    addChatMessage('I\'ll help you with auto locksmith services. What service do you need?');

    const formHtml = `
        <div class="auto-form">
            <div class="mb-3">
                <label class="form-label">What service do you need?</label>
                <div class="chat-options">
                    <button class="chat-option-button" onclick="selectAutoService('Locked out of car')">
                        <i class="fas fa-car me-2"></i>Locked out of car
                    </button>
                    <button class="chat-option-button" onclick="selectAutoService('Lost car keys')">
                        <i class="fas fa-key me-2"></i>Lost car keys
                    </button>
                    <button class="chat-option-button" onclick="selectAutoService('Broken key')">
                        <i class="fas fa-unlock-alt me-2"></i>Broken key
                    </button>
                    <button class="chat-option-button" onclick="selectAutoService('Ignition problems')">
                        <i class="fas fa-bolt me-2"></i>Ignition problems
                    </button>
                    <button class="chat-option-button" onclick="selectAutoService('Spare key needed')">
                        <i class="fas fa-plus me-2"></i>Spare key needed
                    </button>
                </div>
            </div>
        </div>
    `;
    document.getElementById('currentInteraction').innerHTML = formHtml;
}

// Called when a service button is clicked in auto locksmith popup
function selectAutoService(service) {
    // Save selected service for later use
    window.selectedAutoService = service;
    showAutoLocksmithDetailsForm(service);
}

// Show the details form after service selection
function showAutoLocksmithDetailsForm(service) {
    addChatMessage('Please provide your vehicle and contact details:');
    const formHtml = `
        <div class="auto-form">
            <div class="mb-2"><strong>Service:</strong> ${service}</div>
            <input type="text" class="chat-form-input" placeholder="Car make and model *" id="carMake" required>
            <input type="text" class="chat-form-input" placeholder="Registration No." id="carRegNo">
            <input type="text" class="chat-form-input" placeholder="Year" id="carYear">
            <input type="tel" class="chat-form-input" placeholder="Your phone number *" id="autoPhone" required>
            <input type="text" class="chat-form-input" placeholder="Your location/postcode *" id="autoLocation" required>
            <button class="chat-submit-button" onclick="submitAutoRequest()">Submit</button>
        </div>
    `;
    document.getElementById('currentInteraction').innerHTML = formHtml;
    // Set the selected service in a hidden field if needed
    setTimeout(() => {
        if (document.getElementById('serviceNeeded')) {
            document.getElementById('serviceNeeded').value = service;
        }
    }, 100);
}

// Submit auto request
function submitAutoRequest() {
    const carMake = document.getElementById('carMake').value;
    const carRegNo = document.getElementById('carRegNo') ? document.getElementById('carRegNo').value : '';
    const carYear = document.getElementById('carYear') ? document.getElementById('carYear').value : '';
    const phone = document.getElementById('autoPhone').value;
    const location = document.getElementById('autoLocation').value;
    const service = document.getElementById('serviceNeeded') ? document.getElementById('serviceNeeded').value : '';

    if (!carMake || !phone || !location) {
        alert('Please fill in all required fields');
        return;
    }

    // Send SMS via backend
    fetch('http://localhost:3001/api/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: '',
            phone: phone,
            carMake: carMake,
            carModel: carRegNo,
            carYear: carYear,
            reg: carRegNo,
            service: service,
            location: location
        })
    }).catch(() => {/* ignore errors for UI */}).finally(() => {
        clearChatInteraction();
        // Show thank you screen with call-to-action
        document.getElementById('currentInteraction').innerHTML = `
            <div class="thankyou-message text-center p-4">
                <h5 class="mb-3">Thank you for your enquiry</h5>
                <p>A locksmith will call you shortly.<br>Alternatively, please call <a href="tel:07809887883" class="chatbot-thankyou-link">078 0988 7883</a>.</p>
                <button class="chat-submit-button mt-3" onclick="restartChat()">Submit another request</button>
            </div>
        `;
        console.log('Auto Request:', {
            carMake: carMake,
            carYear: carYear,
            service: service,
            phone: phone,
            location: location
        });
    });
}

// Show quotation form
function showQuotationForm() {
    addChatMessage('I\'ll help you get a quote. What type of service do you need a quote for?');
    
    const formHtml = `
        <div class="quote-form">
            <select class="chat-form-input" id="quoteType" onchange="updateQuoteForm()">
                <option value="">Select service type</option>
                <option value="lockChange">Lock change/upgrade</option>
                <option value="lockRepair">Lock repair</option>
                <option value="newInstall">New lock installation</option>
                <option value="security">Security assessment</option>
                <option value="auto">Auto locksmith services</option>
            </select>
            <div id="additionalQuoteFields"></div>
        </div>
    `;
    
    document.getElementById('currentInteraction').innerHTML = formHtml;
}

// Update quote form based on selection
function updateQuoteForm() {
    const quoteType = document.getElementById('quoteType').value;
    const additionalFields = document.getElementById('additionalQuoteFields');
    
    if (!quoteType) {
        additionalFields.innerHTML = '';
        return;
    }
    
    let fieldsHtml = `
        <input type="text" class="chat-form-input" placeholder="Number of locks" id="numLocks">
        <select class="chat-form-input" id="propertyType">
            <option value="">Property type</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
        </select>
        <input type="email" class="chat-form-input" placeholder="Your email *" id="quoteEmail" required>
        <input type="tel" class="chat-form-input" placeholder="Your phone (optional)" id="quotePhone">
        <textarea class="chat-form-input" placeholder="Additional details" id="quoteDetails" rows="3"></textarea>
        <button class="chat-submit-button" onclick="submitQuoteRequest()">
            <i class="fas fa-calculator me-2"></i>Get Quote
        </button>
    `;
    
    additionalFields.innerHTML = fieldsHtml;
}

// Submit quote request
function submitQuoteRequest() {
    const email = document.getElementById('quoteEmail').value;
    
    if (!email) {
        alert('Please provide your email address');
        return;
    }
    
    clearChatInteraction();
    
    addChatMessage('Quote request submitted!', true);
    addChatMessage('Thank you! We\'ll send a detailed quote to your email within 2 hours.');
    
    console.log('Quote Request:', {
        type: document.getElementById('quoteType').value,
        numLocks: document.getElementById('numLocks').value,
        propertyType: document.getElementById('propertyType').value,
        email: email,
        phone: document.getElementById('quotePhone').value,
        details: document.getElementById('quoteDetails').value
    });
    
    setTimeout(() => {
        document.getElementById('currentInteraction').innerHTML = `
            <button class="chat-submit-button" onclick="restartChat()">
                <i class="fas fa-redo me-2"></i>Start New Request
            </button>
        `;
    }, 2000);
}

// Restart conversation
function restartChat() {
    chatbotState = {
        step: 'initial',
        serviceType: null,
        emergencyType: null,
        responses: []
    };
    document.getElementById('chatLog').innerHTML = '';
    clearChatInteraction();
    showInitialQuestion();
}

// Close chatbot with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeChatbot();
    }
});

// Make functions globally available
window.openChatbot = openChatbot;
window.closeChatbot = closeChatbot;
window.closeChatbotOnOverlay = closeChatbotOnOverlay;
window.selectInitialService = selectInitialService;
window.submitEmergencyType = submitEmergencyType;
window.submitEmergencyRequest = submitEmergencyRequest;
window.submitAutoRequest = submitAutoRequest;
window.updateQuoteForm = updateQuoteForm;
window.submitQuoteRequest = submitQuoteRequest;
window.restartChat = restartChat;
