# Bullard Locks - Professional Locksmith Website

A simple, responsive website for Bullard Locks, a professional locksmith service operated by William Bullard in Crouch End, North London.

## About

Bullard Locks is operated by William Bullard, a trusted locksmith with over 30 years of experience serving the Met Police, British Gas Emergency, and clients throughout North London N8.

## Features

- **Responsive Design**: Mobile-first approach using Bootstrap 5
- **SEO Optimized**: Comprehensive meta tags, schema markup, and semantic HTML
- **Form Validation**: JavaScript validation for contact and quote forms
- **Modular Structure**: Separate header and footer includes for easy maintenance
- **Professional Services**: Emergency locksmith, auto locksmith, and safe engineering services

## Project Structure

```
lockpros/
├── index.html              # Homepage
├── about.html              # About page with company information
├── contact.html            # Contact form page
├── services.html           # Services overview
├── locations.html          # Service locations
├── README.md               # This file
├── start-server.bat        # Easy server startup script
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   └── main.js            # JavaScript for functionality
├── images/                # Website images and logos
├── includes/
│   ├── header.html        # Shared navigation header
│   └── footer.html        # Shared footer
├── services/              # Individual service pages
│   ├── emergency-locksmith.html
│   ├── auto-locksmith.html
│   └── safe-engineer.html
└── locations/             # Location-specific pages
    ├── central-london-locksmith.html
    └── north-london-locksmith.html
```

## Technologies Used

- **HTML5**: Semantic markup with proper accessibility
- **CSS3**: Custom styles with Bootstrap 5 framework
- **JavaScript**: Vanilla JS for form validation and includes
- **Bootstrap 5**: Responsive grid system and components
- **Font Awesome**: Professional icons
- **Google Fonts**: Poppins font family

## Key Features

### Header & Footer Includes
The website uses JavaScript to load shared header and footer components:
- `includes/header.html` - Navigation and branding
- `includes/footer.html` - Contact information and links

### Form Validation
Built-in JavaScript validation for:
- Contact form (name, phone, message required)
- Quote request form (name, phone, service, postcode required)
- UK phone number format validation
- User-friendly error and success messages

### SEO & Schema Markup
- Comprehensive meta tags for social media sharing
- Structured data (Schema.org) for business information
- Proper heading hierarchy and semantic HTML
- Local business optimization for North London
## Getting Started

### Simple Setup (Recommended)
1. Clone or download this repository
2. Open `index.html` in any modern web browser
3. The website will work directly from the file system

### Local Development Server (Optional)
For testing features that require HTTP (like the includes), you can use any local server:

**Using the provided batch file (Windows):**
```bash
# Double-click start-server.bat or run in terminal
start-server.bat
```

**Using Python:**
```bash
# Python 3
python -m http.server 3000

# Python 2
python -m SimpleHTTPServer 3000
```

**Using Node.js:**
```bash
npx http-server -p 3000
```

**Using Live Server (VS Code):**
Install the Live Server extension and right-click on `index.html` → "Open with Live Server"

## Customization

### Contact Information
Update contact details in:
- All HTML files (phone numbers, email addresses)
- `includes/header.html` and `includes/footer.html`
- Schema markup in each page's `<head>` section

### Styling
- Main styles are in `css/style.css`
- Bootstrap 5 classes are used throughout for responsive design
- Color scheme can be modified via CSS custom properties

### Content
- Update service descriptions in respective HTML files
- Modify location information in `locations/` directory
- Add new services by creating files in `services/` directory

## Email Integration

To enable real email sending from contact forms:

1. Sign up for a service like [EmailJS](https://www.emailjs.com/)
2. Create email templates for contact and quote forms
3. Update the form handling code in `js/main.js`
4. Add the EmailJS script to your HTML pages

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Internet Explorer 11+ (with some feature degradation)

## Performance

- Optimized images (consider WebP format for better compression)
- Minified CSS and JavaScript for production
- CDN resources for Bootstrap and Font Awesome
- Semantic HTML for fast rendering

## Accessibility

- Proper heading hierarchy (H1 → H6)
- Alt text for all images
- ARIA labels where appropriate
- Keyboard navigation support
- Color contrast compliant

## License

This project is proprietary to Bullard Locks. All rights reserved.

## Contact

**Bullard Locks**  
William Bullard  
67 Weston Park, Crouch End, London N8 9TA  
Phone: [07809 887 883](tel:07809887883)  
WhatsApp: [Send a Photo](https://wa.me/447809887883)

---

*Professional locksmith services in North London since 1993*
- **Service Tracking:** Job progress tracking for customers

### Technical Improvements
- **Analytics Integration:** Google Analytics or similar
- **Search Functionality:** Site-wide search capability
- **Performance Monitoring:** Core Web Vitals tracking
- **A/B Testing:** Conversion optimisation testing
- **Progressive Web App:** PWA capabilities for mobile users

## Contact Information

**Website:** Lock Pros Professional Locksmith Services  
**Phone:** 0780 988 7883  
**WhatsApp:** Available for photos and quick quotes  
**Service Area:** London and surrounding areas  
**Emergency:** 24/7 availability  

---

**Built with professional standards for a professional locksmith service.**
