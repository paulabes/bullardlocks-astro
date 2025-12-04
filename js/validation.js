/**
 * Unified Form Validation System
 * Clean, minimal validation with visual feedback only (red borders)
 */

// Validation regex patterns
const PATTERNS = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    ukPhone: /^(\+44|0)[1-9]\d{8,9}$/
};

/**
 * Validate a single field based on type and requirements
 */
function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name || field.id;
    const isRequired = field.hasAttribute('required') || field.classList.contains('validate-required');

    // Remove existing validation class
    field.classList.remove('field-invalid');

    // Check if field is required and empty
    if (isRequired && !value) {
        field.classList.add('field-invalid');
        return false;
    }

    // For optional fields that are empty, they're valid
    if (!value) {
        return true;
    }

    // Validate email format (if field has email type or name contains 'email')
    if (fieldType === 'email' || fieldName.toLowerCase().includes('email')) {
        const cleanEmail = value.replace(/\s+/g, '');
        if (!PATTERNS.email.test(cleanEmail)) {
            field.classList.add('field-invalid');
            return false;
        }
    }

    // Validate UK phone number (if field name contains 'phone' or 'tel')
    if (fieldType === 'tel' || fieldName.toLowerCase().includes('phone') || fieldName.toLowerCase().includes('tel')) {
        if (isRequired) {
            const cleanPhone = value.replace(/\s+/g, '');
            if (!PATTERNS.ukPhone.test(cleanPhone)) {
                field.classList.add('field-invalid');
                return false;
            }
        }
    }

    // Validate select/dropdown (must have a value selected)
    if (field.tagName === 'SELECT' && isRequired) {
        if (!value || value === '') {
            field.classList.add('field-invalid');
            return false;
        }
    }

    return true;
}

/**
 * Validate all fields in a form
 */
function validateForm(form) {
    let isValid = true;

    // Get all input, select, and textarea fields
    const fields = form.querySelectorAll('input, select, textarea');

    fields.forEach(field => {
        // Skip hidden fields and buttons
        if (field.type === 'hidden' || field.type === 'submit' || field.type === 'button') {
            return;
        }

        if (!validateField(field)) {
            isValid = false;
        }
    });

    return isValid;
}

/**
 * Initialize validation for a form
 */
function initializeFormValidation(form) {
    if (!form) return;

    // Get all input, select, and textarea fields
    const fields = form.querySelectorAll('input, select, textarea');

    // Add blur validation to each field
    fields.forEach(field => {
        // Skip hidden fields and buttons
        if (field.type === 'hidden' || field.type === 'submit' || field.type === 'button') {
            return;
        }

        field.addEventListener('blur', () => {
            validateField(field);
        });

        // Also validate on change for select elements
        if (field.tagName === 'SELECT') {
            field.addEventListener('change', () => {
                validateField(field);
            });
        }
    });

    // Add submit validation
    form.addEventListener('submit', (e) => {
        if (!validateForm(form)) {
            e.preventDefault();
            e.stopPropagation();
            // Focus first invalid field
            const firstInvalid = form.querySelector('.field-invalid');
            if (firstInvalid) {
                firstInvalid.focus();
            }
        }
    });
}

/**
 * Show success message using simple alert
 */
function showSuccessMessage(message = 'Email sent successfully') {
    alert(message);
}

/**
 * Initialize validation for dynamically created forms
 */
function initializeDynamicFormValidation(formElement) {
    initializeFormValidation(formElement);
}

// Export functions for use in other scripts
window.FormValidation = {
    initialize: initializeFormValidation,
    initializeDynamic: initializeDynamicFormValidation,
    validate: validateForm,
    validateField: validateField,
    showSuccess: showSuccessMessage
};
