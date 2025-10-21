// Form Validation for Contact Page
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    // Only run if we're on the contact page
    if (!contactForm) return;

    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const successMessage = document.getElementById('successMessage');

    // Error message elements
    const fullNameError = document.getElementById('fullNameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');

    // Validation functions
    const validateFullName = () => {
        const value = fullNameInput.value.trim();
        if (value === '') {
            showError(fullNameInput, fullNameError, 'Full name is required');
            return false;
        }
        clearError(fullNameInput, fullNameError);
        return true;
    };

    const validateEmail = () => {
        const value = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (value === '') {
            showError(emailInput, emailError, 'Email is required');
            return false;
        }
        
        if (!emailRegex.test(value)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
            return false;
        }
        
        clearError(emailInput, emailError);
        return true;
    };

    const validateSubject = () => {
        const value = subjectInput.value.trim();
        if (value === '') {
            showError(subjectInput, subjectError, 'Subject is required');
            return false;
        }
        clearError(subjectInput, subjectError);
        return true;
    };

    const validateMessage = () => {
        const value = messageInput.value.trim();
        
        if (value === '') {
            showError(messageInput, messageError, 'Message is required');
            return false;
        }
        
        if (value.length < 10) {
            showError(messageInput, messageError, 'Message must be at least 10 characters');
            return false;
        }
        
        clearError(messageInput, messageError);
        return true;
    };

    // Helper functions
    const showError = (input, errorElement, message) => {
        input.classList.add('error');
        input.setAttribute('aria-invalid', 'true');
        errorElement.textContent = message;
    };

    const clearError = (input, errorElement) => {
        input.classList.remove('error');
        input.setAttribute('aria-invalid', 'false');
        errorElement.textContent = '';
    };

    // Real-time validation (on blur)
    fullNameInput.addEventListener('blur', validateFullName);
    emailInput.addEventListener('blur', validateEmail);
    subjectInput.addEventListener('blur', validateSubject);
    messageInput.addEventListener('blur', validateMessage);

    // Clear error on input
    fullNameInput.addEventListener('input', () => {
        if (fullNameError.textContent !== '') {
            validateFullName();
        }
    });

    emailInput.addEventListener('input', () => {
        if (emailError.textContent !== '') {
            validateEmail();
        }
    });

    subjectInput.addEventListener('input', () => {
        if (subjectError.textContent !== '') {
            validateSubject();
        }
    });

    messageInput.addEventListener('input', () => {
        if (messageError.textContent !== '') {
            validateMessage();
        }
    });

    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Hide success message if visible
        successMessage.style.display = 'none';

        // Validate all fields
        const isFullNameValid = validateFullName();
        const isEmailValid = validateEmail();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();

        // If all fields are valid
        if (isFullNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            // Show success message
            successMessage.style.display = 'block';
            successMessage.focus();

            // Clear form
            contactForm.reset();

            // Clear any remaining error states
            clearError(fullNameInput, fullNameError);
            clearError(emailInput, emailError);
            clearError(subjectInput, subjectError);
            clearError(messageInput, messageError);

            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            // Optional: Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        } else {
            // Focus on first error field
            if (!isFullNameValid) {
                fullNameInput.focus();
            } else if (!isEmailValid) {
                emailInput.focus();
            } else if (!isSubjectValid) {
                subjectInput.focus();
            } else if (!isMessageValid) {
                messageInput.focus();
            }
        }
    });

    // Keyboard accessibility for form
    const formInputs = [fullNameInput, emailInput, subjectInput, messageInput];
    
    formInputs.forEach((input, index) => {
        input.addEventListener('keydown', (e) => {
            // Allow navigation with Enter key (except for textarea)
            if (e.key === 'Enter' && input.tagName !== 'TEXTAREA') {
                e.preventDefault();
                if (index < formInputs.length - 1) {
                    formInputs[index + 1].focus();
                } else {
                    contactForm.querySelector('button[type="submit"]').focus();
                }
            }
        });
    });
});