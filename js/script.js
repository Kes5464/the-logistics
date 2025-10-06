// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeTracking();
    initializeContactForm();
    initializeSmoothScrolling();
    initializeAnimations();
});

// Navigation functionality
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// API Configuration
const API_CONFIG = {
    USE_REAL_API: false, // Set to true when you have Shippo API key
    SHIPPO_API_KEY: 'YOUR_SHIPPO_API_KEY_HERE', // Replace with your actual API key
    SHIPPO_BASE_URL: 'https://api.goshippo.com'
};

// Tracking system functionality
function initializeTracking() {
    // Sample tracking data (for testing without API)
    const trackingData = {
        'LF123456789': {
            trackingNumber: 'LF123456789',
            status: 'Delivered',
            statusClass: 'delivered',
            estimatedDelivery: 'October 3, 2025',
            serviceType: 'Express Shipping',
            origin: 'New York, NY',
            destination: 'Los Angeles, CA',
            currentLocation: 'Los Angeles Distribution Center',
            timeline: [
                {
                    date: 'October 1, 2025 - 9:00 AM',
                    status: 'Package Picked Up',
                    location: 'New York, NY',
                    completed: true
                },
                {
                    date: 'October 1, 2025 - 2:30 PM',
                    status: 'Departed Origin Facility',
                    location: 'New York Distribution Center',
                    completed: true
                },
                {
                    date: 'October 2, 2025 - 8:15 AM',
                    status: 'In Transit',
                    location: 'Chicago Hub',
                    completed: true
                },
                {
                    date: 'October 2, 2025 - 6:45 PM',
                    status: 'Arrived at Destination Facility',
                    location: 'Los Angeles Distribution Center',
                    completed: true
                },
                {
                    date: 'October 3, 2025 - 10:30 AM',
                    status: 'Out for Delivery',
                    location: 'Los Angeles, CA',
                    completed: true
                },
                {
                    date: 'October 3, 2025 - 2:15 PM',
                    status: 'Delivered',
                    location: 'Los Angeles, CA',
                    completed: true
                }
            ]
        },
        'LF987654321': {
            trackingNumber: 'LF987654321',
            status: 'In Transit',
            statusClass: 'in-transit',
            estimatedDelivery: 'October 6, 2025',
            serviceType: 'Ground Transport',
            origin: 'Miami, FL',
            destination: 'Seattle, WA',
            currentLocation: 'Denver Hub',
            timeline: [
                {
                    date: 'October 3, 2025 - 10:00 AM',
                    status: 'Package Picked Up',
                    location: 'Miami, FL',
                    completed: true
                },
                {
                    date: 'October 3, 2025 - 4:15 PM',
                    status: 'Departed Origin Facility',
                    location: 'Miami Distribution Center',
                    completed: true
                },
                {
                    date: 'October 4, 2025 - 9:30 AM',
                    status: 'In Transit',
                    location: 'Atlanta Hub',
                    completed: true
                },
                {
                    date: 'October 5, 2025 - 11:20 AM',
                    status: 'In Transit',
                    location: 'Denver Hub',
                    completed: true
                },
                {
                    date: 'October 6, 2025 - 8:00 AM (Expected)',
                    status: 'Arriving at Destination Facility',
                    location: 'Seattle Distribution Center',
                    completed: false
                },
                {
                    date: 'October 6, 2025 - 2:00 PM (Expected)',
                    status: 'Out for Delivery',
                    location: 'Seattle, WA',
                    completed: false
                }
            ]
        },
        'LF456789123': {
            trackingNumber: 'LF456789123',
            status: 'Processing',
            statusClass: 'processing',
            estimatedDelivery: 'October 8, 2025',
            serviceType: 'Air Freight',
            origin: 'Boston, MA',
            destination: 'London, UK',
            currentLocation: 'Boston Processing Facility',
            timeline: [
                {
                    date: 'October 5, 2025 - 1:00 PM',
                    status: 'Order Received',
                    location: 'Boston, MA',
                    completed: true
                },
                {
                    date: 'October 5, 2025 - 3:30 PM',
                    status: 'Processing Package',
                    location: 'Boston Processing Facility',
                    completed: true
                },
                {
                    date: 'October 6, 2025 - 9:00 AM (Expected)',
                    status: 'Package Pickup Scheduled',
                    location: 'Boston, MA',
                    completed: false
                }
            ]
        }
    };

    // Quick track form (homepage)
    const quickTrackForm = document.getElementById('quickTrackForm');
    if (quickTrackForm) {
        quickTrackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const trackingNumber = document.getElementById('quickTrackInput').value.trim();
            if (trackingNumber) {
                // Redirect to tracking page with tracking number
                window.location.href = `tracking.html?track=${encodeURIComponent(trackingNumber)}`;
            }
        });
    }

    // Main tracking form
    const trackingForm = document.getElementById('trackingForm');
    if (trackingForm) {
        // Check for tracking number in URL
        const urlParams = new URLSearchParams(window.location.search);
        const trackParam = urlParams.get('track');
        if (trackParam) {
            document.getElementById('trackingNumber').value = trackParam;
            performTracking(trackParam, trackingData);
        }

        trackingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const trackingNumber = document.getElementById('trackingNumber').value.trim().toUpperCase();
            
            if (trackingNumber) {
                performTracking(trackingNumber, trackingData);
            }
        });
    }
}

// Perform tracking lookup
function performTracking(trackingNumber, trackingData) {
    if (API_CONFIG.USE_REAL_API && API_CONFIG.SHIPPO_API_KEY !== 'YOUR_SHIPPO_API_KEY_HERE') {
        // Use real Shippo API
        performShippoTracking(trackingNumber);
    } else {
        // Use sample data for testing
        performSampleTracking(trackingNumber, trackingData);
    }
}

// Real Shippo API tracking
async function performShippoTracking(trackingNumber) {
    const resultsContainer = document.getElementById('trackingResults');
    const errorContainer = document.getElementById('trackingError');
    
    // Show loading state
    const submitBtn = document.querySelector('#trackingForm button[type="submit"]');
    if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Tracking...';
        submitBtn.disabled = true;
    }

    try {
        // Auto-detect carrier
        const carrier = detectCarrier(trackingNumber);
        console.log(`Tracking ${trackingNumber} with carrier: ${carrier}`);
        
        // Make API call to Shippo
        const response = await fetch(`${API_CONFIG.SHIPPO_BASE_URL}/tracks/${carrier}/${trackingNumber}/`, {
            method: 'GET',
            headers: {
                'Authorization': `ShippoToken ${API_CONFIG.SHIPPO_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }

        const apiData = await response.json();
        console.log('Shippo API Response:', apiData);

        if (apiData && apiData.tracking_status) {
            const formattedData = formatShippoData(apiData);
            displayTrackingResults(formattedData);
            if (resultsContainer) resultsContainer.style.display = 'block';
            if (errorContainer) errorContainer.style.display = 'none';
        } else {
            showTrackingError('No tracking information found for this number.');
        }

    } catch (error) {
        console.error('Tracking API Error:', error);
        showTrackingError(`Unable to fetch tracking information: ${error.message}`);
    } finally {
        // Reset button
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-search"></i> Track Package';
            submitBtn.disabled = false;
        }

        // Scroll to results
        setTimeout(() => {
            const targetElement = resultsContainer?.style.display !== 'none' ? resultsContainer : errorContainer;
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    }
}

// Sample data tracking (fallback)
function performSampleTracking(trackingNumber, trackingData) {
    const resultsContainer = document.getElementById('trackingResults');
    const errorContainer = document.getElementById('trackingError');
    
    // Show loading state
    const submitBtn = document.querySelector('#trackingForm button[type="submit"]');
    if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Tracking...';
        submitBtn.disabled = true;
    }

    // Simulate API delay
    setTimeout(() => {
        if (trackingData[trackingNumber]) {
            displayTrackingResults(trackingData[trackingNumber]);
            if (resultsContainer) resultsContainer.style.display = 'block';
            if (errorContainer) errorContainer.style.display = 'none';
        } else {
            if (errorContainer) errorContainer.style.display = 'block';
            if (resultsContainer) resultsContainer.style.display = 'none';
        }

        // Reset button
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-search"></i> Track Package';
            submitBtn.disabled = false;
        }

        // Scroll to results
        if (resultsContainer || errorContainer) {
            const targetElement = resultsContainer?.style.display !== 'none' ? resultsContainer : errorContainer;
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, 1500);
}

// Display tracking results
function displayTrackingResults(data) {
    // Update package details
    document.getElementById('resultTrackingNumber').textContent = data.trackingNumber;
    
    const statusElement = document.getElementById('resultStatus');
    statusElement.textContent = data.status;
    statusElement.className = `status-badge ${data.statusClass}`;
    
    document.getElementById('resultDelivery').textContent = data.estimatedDelivery;
    document.getElementById('resultService').textContent = data.serviceType;
    document.getElementById('resultOrigin').textContent = data.origin;
    document.getElementById('resultDestination').textContent = data.destination;
    
    // Update current location
    document.getElementById('currentLocation').textContent = data.currentLocation;
    
    // Build timeline
    const timeline = document.getElementById('trackingTimeline');
    timeline.innerHTML = '';
    
    data.timeline.forEach(item => {
        const timelineItem = document.createElement('div');
        timelineItem.className = `timeline-item ${item.completed ? 'completed' : ''}`;
        
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <div class="timeline-date">${item.date}</div>
                <div class="timeline-status">${item.status}</div>
                <div class="timeline-location">${item.location}</div>
            </div>
        `;
        
        timeline.appendChild(timelineItem);
    });
}

// Reset tracking form
function resetTracking() {
    document.getElementById('trackingNumber').value = '';
    document.getElementById('trackingResults').style.display = 'none';
    document.getElementById('trackingError').style.display = 'none';
    document.getElementById('trackingNumber').focus();
}

// Fill tracking number from sample
function fillTrackingNumber(trackingNumber) {
    const input = document.getElementById('trackingNumber');
    if (input) {
        input.value = trackingNumber;
        input.focus();
        
        // Auto-submit after a short delay
        setTimeout(() => {
            const form = document.getElementById('trackingForm');
            if (form) {
                form.dispatchEvent(new Event('submit'));
            }
        }, 500);
    }
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            // Validate form
            if (validateContactForm(data)) {
                submitContactForm(data);
            }
        });
    }
}

// Validate contact form
function validateContactForm(data) {
    const required = ['firstName', 'lastName', 'email', 'message'];
    const errors = [];
    
    required.forEach(field => {
        if (!data[field] || data[field].trim() === '') {
            errors.push(`${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`);
        }
    });
    
    // Email validation
    if (data.email && !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (errors.length > 0) {
        alert('Please correct the following errors:\n' + errors.join('\n'));
        return false;
    }
    
    return true;
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Submit contact form
function submitContactForm(data) {
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    
    // Show loading state
    if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
    }
    
    // Simulate form submission
    setTimeout(() => {
        // Show success message
        showSuccessMessage();
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Reset button
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            submitBtn.disabled = false;
        }
        
        // Log form data (in real app, this would be sent to server)
        console.log('Contact form submitted:', data);
    }, 2000);
}

// Show success message
function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.style.display = 'flex';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            hideSuccessMessage();
        }, 5000);
    }
}

// Hide success message
function hideSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.style.display = 'none';
    }
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize animations
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.service-card, .feature-card, .additional-card, .faq-item').forEach(el => {
        observer.observe(el);
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Close mobile menu on resize
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu && window.innerWidth > 768) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
}, 250));

// Handle scroll events
let lastScrollTop = 0;
window.addEventListener('scroll', debounce(() => {
    const navbar = document.querySelector('.navbar');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow to navbar on scroll
    if (navbar) {
        if (scrollTop > 100) {
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.boxShadow = 'var(--shadow-sm)';
        }
    }
    
    lastScrollTop = scrollTop;
}, 100));

// Form input enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add focus effects to form inputs
    document.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            if (this.value.trim() !== '') {
                this.parentElement.classList.add('filled');
            } else {
                this.parentElement.classList.remove('filled');
            }
        });
        
        // Check initial state
        if (input.value.trim() !== '') {
            input.parentElement.classList.add('filled');
        }
    });
});

// Error handling
window.addEventListener('error', function(event) {
    console.error('JavaScript Error:', event.error);
    // In production, you might want to send this to an error tracking service
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Carrier detection based on tracking number format
function detectCarrier(trackingNumber) {
    // Remove spaces and convert to uppercase
    const cleanNumber = trackingNumber.replace(/\s/g, '').toUpperCase();
    
    // FedEx patterns
    if (/^\d{12}$/.test(cleanNumber) || /^\d{14}$/.test(cleanNumber) || /^\d{15}$/.test(cleanNumber)) {
        return 'fedex';
    }
    
    // UPS patterns
    if (/^1Z[0-9A-Z]{16}$/.test(cleanNumber)) {
        return 'ups';
    }
    
    // USPS patterns
    if (/^\d{20}$/.test(cleanNumber) || /^\d{26}$/.test(cleanNumber) || /^[A-Z]{2}\d{9}US$/.test(cleanNumber)) {
        return 'usps';
    }
    
    // DHL patterns
    if (/^\d{10}$/.test(cleanNumber) || /^\d{11}$/.test(cleanNumber)) {
        return 'dhl_express';
    }
    
    // Amazon patterns
    if (/^TBA\d{12}$/.test(cleanNumber)) {
        return 'amazon';
    }
    
    // Default to FedEx for unknown patterns
    console.log(`Unknown tracking number format: ${cleanNumber}, defaulting to FedEx`);
    return 'fedex';
}

// Format Shippo API data to match our display structure
function formatShippoData(apiData) {
    return {
        trackingNumber: apiData.tracking_number,
        status: formatTrackingStatus(apiData.tracking_status.status),
        statusClass: getStatusClass(apiData.tracking_status.status),
        estimatedDelivery: apiData.eta ? new Date(apiData.eta).toLocaleDateString() : 'Not available',
        serviceType: apiData.servicelevel?.name || 'Standard Service',
        origin: formatAddress(apiData.address_from),
        destination: formatAddress(apiData.address_to),
        currentLocation: getCurrentLocation(apiData.tracking_history),
        timeline: formatTrackingHistory(apiData.tracking_history || [])
    };
}

// Format tracking status from Shippo
function formatTrackingStatus(status) {
    const statusMap = {
        'UNKNOWN': 'Processing',
        'PRE_TRANSIT': 'Label Created',
        'TRANSIT': 'In Transit',
        'DELIVERED': 'Delivered',
        'RETURNED': 'Returned',
        'FAILURE': 'Delivery Failed',
        'CANCELLED': 'Cancelled'
    };
    
    return statusMap[status] || status.replace('_', ' ');
}

// Get CSS class for status
function getStatusClass(status) {
    const classMap = {
        'DELIVERED': 'delivered',
        'TRANSIT': 'in-transit',
        'PRE_TRANSIT': 'processing',
        'UNKNOWN': 'processing',
        'FAILURE': 'error',
        'CANCELLED': 'error'
    };
    
    return classMap[status] || 'processing';
}

// Format address from Shippo data
function formatAddress(address) {
    if (!address) return 'Unknown';
    
    const parts = [];
    if (address.city) parts.push(address.city);
    if (address.state) parts.push(address.state);
    if (address.zip) parts.push(address.zip);
    
    return parts.join(', ') || 'Unknown Location';
}

// Get current location from tracking history
function getCurrentLocation(history) {
    if (!history || history.length === 0) return 'Location not available';
    
    // Find the most recent event with location
    for (let i = history.length - 1; i >= 0; i--) {
        if (history[i].location) {
            return history[i].location;
        }
    }
    
    return 'In transit';
}

// Format tracking history for timeline display
function formatTrackingHistory(history) {
    if (!history || history.length === 0) {
        return [{
            date: new Date().toLocaleDateString(),
            status: 'Tracking information not yet available',
            location: 'Unknown',
            completed: false
        }];
    }
    
    return history.map(event => ({
        date: event.status_date ? new Date(event.status_date).toLocaleString() : 'Unknown date',
        status: event.status_details || event.status || 'Status update',
        location: event.location || 'Unknown location',
        completed: true
    })).reverse(); // Show most recent first
}

// Show tracking error with custom message
function showTrackingError(message) {
    const errorContainer = document.getElementById('trackingError');
    const resultsContainer = document.getElementById('trackingResults');
    
    if (errorContainer) {
        const errorText = errorContainer.querySelector('p');
        if (errorText) {
            errorText.textContent = message;
        }
        errorContainer.style.display = 'block';
    }
    
    if (resultsContainer) {
        resultsContainer.style.display = 'none';
    }
}

// Toggle API mode
function toggleApiMode() {
    API_CONFIG.USE_REAL_API = !API_CONFIG.USE_REAL_API;
    updateApiStatus();
    
    // Clear any existing results
    const resultsContainer = document.getElementById('trackingResults');
    const errorContainer = document.getElementById('trackingError');
    if (resultsContainer) resultsContainer.style.display = 'none';
    if (errorContainer) errorContainer.style.display = 'none';
    
    // Clear the tracking input
    const trackingInput = document.getElementById('trackingNumber');
    if (trackingInput) trackingInput.value = '';
}

// Update API status display
function updateApiStatus() {
    const statusText = document.getElementById('apiStatusText');
    const statusIndicator = document.querySelector('.status-indicator');
    const toggleButton = document.getElementById('toggleApiMode');
    
    if (API_CONFIG.USE_REAL_API && API_CONFIG.SHIPPO_API_KEY !== 'YOUR_SHIPPO_API_KEY_HERE') {
        if (statusText) statusText.textContent = 'Using live Shippo API';
        if (statusIndicator) {
            statusIndicator.className = 'status-indicator live';
            statusIndicator.querySelector('i').className = 'fas fa-check-circle';
        }
        if (toggleButton) toggleButton.textContent = 'Switch to Demo Mode';
    } else {
        if (statusText) {
            statusText.textContent = API_CONFIG.SHIPPO_API_KEY === 'YOUR_SHIPPO_API_KEY_HERE' 
                ? 'Using sample data (API key needed for live tracking)'
                : 'Using sample data for demonstration';
        }
        if (statusIndicator) {
            statusIndicator.className = 'status-indicator demo';
            statusIndicator.querySelector('i').className = 'fas fa-info-circle';
        }
        if (toggleButton) toggleButton.textContent = 'Switch to Live API';
    }
}

// Initialize API status on page load
document.addEventListener('DOMContentLoaded', function() {
    updateApiStatus();
});

// Export functions for global access
window.resetTracking = resetTracking;
window.fillTrackingNumber = fillTrackingNumber;
window.hideSuccessMessage = hideSuccessMessage;
window.toggleApiMode = toggleApiMode;