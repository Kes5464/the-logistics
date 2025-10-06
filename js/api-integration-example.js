// API Integration Example for LogiFlow Website
// Replace the sample tracking data with real API calls

// Configuration
const API_CONFIG = {
    // Shippo API (Recommended)
    shippo: {
        baseUrl: 'https://api.goshippo.com',
        token: 'YOUR_SHIPPO_API_KEY' // Get from https://goshippo.com/
    },
    
    // FedEx API (Alternative)
    fedex: {
        baseUrl: 'https://apis.fedex.com',
        clientId: 'YOUR_FEDEX_CLIENT_ID',
        clientSecret: 'YOUR_FEDEX_CLIENT_SECRET'
    }
};

// Updated tracking function using Shippo API
async function performTrackingWithAPI(trackingNumber) {
    const resultsContainer = document.getElementById('trackingResults');
    const errorContainer = document.getElementById('trackingError');
    
    // Show loading state
    const submitBtn = document.querySelector('#trackingForm button[type="submit"]');
    if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Tracking...';
        submitBtn.disabled = true;
    }

    try {
        // Auto-detect carrier or let user select
        const carrier = detectCarrier(trackingNumber);
        const trackingData = await fetchTrackingData(carrier, trackingNumber);
        
        if (trackingData && trackingData.tracking_status) {
            displayAPITrackingResults(trackingData);
            if (resultsContainer) resultsContainer.style.display = 'block';
            if (errorContainer) errorContainer.style.display = 'none';
        } else {
            showTrackingError('No tracking information found');
        }
        
    } catch (error) {
        console.error('Tracking error:', error);
        showTrackingError('Unable to fetch tracking information. Please try again.');
    } finally {
        // Reset button
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-search"></i> Track Package';
            submitBtn.disabled = false;
        }
    }
}

// Fetch tracking data from Shippo API
async function fetchTrackingData(carrier, trackingNumber) {
    const url = `${API_CONFIG.shippo.baseUrl}/tracks/${carrier}/${trackingNumber}/`;
    
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `ShippoToken ${API_CONFIG.shippo.token}`,
            'Content-Type': 'application/json'
        }
    });
    
    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }
    
    return response.json();
}

// Auto-detect carrier from tracking number format
function detectCarrier(trackingNumber) {
    // FedEx patterns
    if (/^\d{12}$/.test(trackingNumber) || /^\d{14}$/.test(trackingNumber)) {
        return 'fedex';
    }
    
    // UPS patterns
    if (/^1Z[0-9A-Z]{16}$/.test(trackingNumber)) {
        return 'ups';
    }
    
    // USPS patterns
    if (/^\d{20}$/.test(trackingNumber) || /^\d{26}$/.test(trackingNumber)) {
        return 'usps';
    }
    
    // DHL patterns
    if (/^\d{10}$/.test(trackingNumber) || /^\d{11}$/.test(trackingNumber)) {
        return 'dhl_express';
    }
    
    // Default to FedEx or ask user to select
    return 'fedex';
}

// Display real API tracking results
function displayAPITrackingResults(apiData) {
    // Map API response to your display format
    const data = {
        trackingNumber: apiData.tracking_number,
        status: formatTrackingStatus(apiData.tracking_status.status),
        statusClass: getStatusClass(apiData.tracking_status.status),
        estimatedDelivery: apiData.eta || 'Not available',
        serviceType: apiData.servicelevel?.name || 'Standard',
        origin: formatAddress(apiData.address_from),
        destination: formatAddress(apiData.address_to),
        currentLocation: getCurrentLocation(apiData.tracking_history),
        timeline: formatTrackingHistory(apiData.tracking_history)
    };
    
    // Use your existing display function
    displayTrackingResults(data);
}

// Helper functions for API data formatting
function formatTrackingStatus(status) {
    const statusMap = {
        'UNKNOWN': 'Processing',
        'PRE_TRANSIT': 'Label Created',
        'TRANSIT': 'In Transit',
        'DELIVERED': 'Delivered',
        'RETURNED': 'Returned',
        'FAILURE': 'Failed'
    };
    
    return statusMap[status] || status;
}

function getStatusClass(status) {
    const classMap = {
        'DELIVERED': 'delivered',
        'TRANSIT': 'in-transit',
        'PRE_TRANSIT': 'processing',
        'UNKNOWN': 'processing'
    };
    
    return classMap[status] || 'processing';
}

function formatAddress(address) {
    if (!address) return 'Unknown';
    return `${address.city}, ${address.state} ${address.zip}`;
}

function getCurrentLocation(history) {
    if (!history || history.length === 0) return 'Unknown';
    const latest = history[history.length - 1];
    return latest.location || 'In transit';
}

function formatTrackingHistory(history) {
    if (!history) return [];
    
    return history.map(event => ({
        date: new Date(event.status_date).toLocaleString(),
        status: event.status_details || event.status,
        location: event.location || 'Unknown',
        completed: true
    })).reverse(); // Show most recent first
}

// Error handling
function showTrackingError(message) {
    const errorContainer = document.getElementById('trackingError');
    const resultsContainer = document.getElementById('trackingResults');
    
    if (errorContainer) {
        errorContainer.querySelector('p').textContent = message;
        errorContainer.style.display = 'block';
    }
    if (resultsContainer) {
        resultsContainer.style.display = 'none';
    }
}

// Alternative: FedEx API implementation
async function fetchFedExTracking(trackingNumber) {
    // First, get access token
    const tokenResponse = await fetch('https://apis.fedex.com/oauth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: API_CONFIG.fedex.clientId,
            client_secret: API_CONFIG.fedex.clientSecret
        })
    });
    
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;
    
    // Then track the package
    const trackResponse = await fetch('https://apis.fedex.com/track/v1/trackingnumbers', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            trackingInfo: [{
                trackingNumberInfo: {
                    trackingNumber: trackingNumber
                }
            }]
        })
    });
    
    return trackResponse.json();
}

// Update your existing tracking form handler
document.getElementById('trackingForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const trackingNumber = document.getElementById('trackingNumber').value.trim().toUpperCase();
    
    if (trackingNumber) {
        // Use real API instead of sample data
        performTrackingWithAPI(trackingNumber);
    }
});

// For development/testing, you can still use sample data
const USE_SAMPLE_DATA = true; // Set to false when using real API

if (USE_SAMPLE_DATA) {
    // Keep your existing sample data for testing
    console.log('Using sample tracking data for development');
} else {
    console.log('Using real API for tracking');
}