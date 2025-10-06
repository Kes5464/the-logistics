# LogiFlow - Responsive Logistics Website

A modern, responsive multi-page logistics website with package tracking functionality built with HTML, CSS, and JavaScript.

## Features

### 🏠 Homepage (index.html)
- Hero section with company overview
- Quick package tracking form
- Services overview cards
- Company statistics
- About section with key features
- Call-to-action section

### 📦 Services Page (services.html)
- Detailed service descriptions
- Express Shipping
- Warehousing Solutions
- Ground Transportation
- Air Freight Services
- Additional services grid
- Pricing information

### 📍 Package Tracking (tracking.html)
- Real-time package tracking simulation
- Sample tracking numbers for testing
- Detailed tracking timeline
- Package status and location
- Interactive tracking features
- Mobile-optimized interface

### 📞 Contact Page (contact.html)
- Contact form with validation
- Company information
- Interactive map section
- FAQ section
- Social media links
- Business hours

## Tracking System

### Sample Tracking Numbers
Test the tracking functionality with these sample numbers:

- **LF123456789** - Delivered package
- **LF987654321** - Package in transit
- **LF456789123** - Package being processed

### How to Track
1. Enter a tracking number in the quick track form on homepage
2. Or visit the tracking page directly
3. Use sample numbers or try invalid ones to see error handling

## Technical Features

### Responsive Design
- Mobile-first approach
- Breakpoints for tablets and desktops
- Flexible grid layouts
- Touch-friendly navigation

### Interactive Elements
- Animated navigation menu
- Form validation
- Smooth scrolling
- Loading states
- Success/error messages

### Performance
- Optimized CSS with CSS variables
- Efficient JavaScript with event delegation
- Lazy loading animations
- Debounced scroll events

## File Structure

```
logistcis new/
├── index.html          # Homepage
├── services.html       # Services page
├── tracking.html       # Package tracking
├── contact.html        # Contact page
├── css/
│   └── style.css       # Main stylesheet
├── js/
│   └── script.js       # JavaScript functionality
├── images/             # Image assets (currently empty)
└── README.md          # This file
```

## Getting Started

1. **Open the website**: Open `index.html` in your web browser
2. **Navigate**: Use the top navigation to explore different pages
3. **Test tracking**: Try the sample tracking numbers
4. **Submit forms**: Test the contact form functionality
5. **Resize window**: Check responsive behavior on different screen sizes

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Customization

### Colors
Edit CSS variables in `style.css`:
```css
:root {
    --primary-color: #1e40af;     /* Main brand color */
    --secondary-color: #f59e0b;   /* Accent color */
    --accent-color: #10b981;      /* Success/positive color */
}
```

### Content
- Update company information in HTML files
- Modify service descriptions
- Change contact details
- Add real tracking API integration

### Tracking Data
In `script.js`, modify the `trackingData` object to add more sample packages or integrate with a real API.

## Features in Detail

### Navigation
- Responsive hamburger menu on mobile
- Active page highlighting
- Smooth transitions
- Click-outside-to-close functionality

### Forms
- Client-side validation
- Real-time feedback
- Loading states
- Success confirmations
- Error handling

### Animations
- CSS transitions for smooth interactions
- JavaScript-powered fade-in effects
- Hover animations
- Loading spinners

### Tracking System
- Simulated real-time updates
- Detailed timeline view
- Status indicators
- Location tracking
- Error handling for invalid numbers

## Development Notes

### Adding Real API Integration
To connect to a real tracking API:

1. Replace the `trackingData` object in `script.js`
2. Modify `performTracking()` function to make HTTP requests
3. Handle API responses and errors
4. Add authentication if required

### Adding Images
Place images in the `images/` folder and update:
- Hero section background
- Service illustrations
- Company photos
- Team pictures

### SEO Optimization
- Add meta descriptions to each page
- Include structured data markup
- Optimize image alt attributes
- Add Open Graph tags

## Support

For questions or issues:
- Check the console for JavaScript errors
- Verify file paths are correct
- Ensure all files are in proper directories
- Test in different browsers

---

Built with ❤️ for modern logistics companies.