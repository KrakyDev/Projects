# Sapori Restaurant Website

A modern, responsive restaurant website built with pure HTML, CSS, and JavaScript.

## Project Structure

```
sapori-website/
├── index.html        ← Home page (hero, featured dishes, about strip)
├── menu.html         ← Full menu with tabbed categories + Add to Cart
├── about.html        ← Story, Mission & Vision, photo gallery
├── contact.html      ← Address, phone, map, contact form
├── order.html        ← Shopping cart + delivery checkout form
│
├── css/
│   └── style.css     ← All styles (variables, components, pages, responsive)
│
├── js/
│   └── script.js     ← Cart logic, menu data, navbar, animations, forms
│
└── images/           ← Place local images here (currently using Unsplash URLs)
```

## Features

- ✅ 5 separate HTML pages with real browser navigation
- ✅ Cart persists across pages via sessionStorage
- ✅ Slide-in cart drawer on every page
- ✅ Scroll-reveal animations
- ✅ Sticky navbar with scroll effect
- ✅ Mobile responsive + hamburger menu
- ✅ Menu tabs (Mains, Starters, Drinks, Desserts)
- ✅ Add to Cart with toast notifications
- ✅ Checkout form with order confirmation
- ✅ Contact form with success state
- ✅ Active nav link highlighting

## How to Run

Simply open `index.html` in any modern browser.
For best results, serve via a local server:

```bash
# Python
python -m http.server 8000

# Node (npx)
npx serve .
```

Then visit: http://localhost:8000
