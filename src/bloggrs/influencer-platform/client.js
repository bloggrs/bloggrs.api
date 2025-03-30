/**
 * Client-side initialization for the influencer platform plugin
 */
const pluginConfig = require('./plugin.json');

// Helper function to ensure CSS is loaded on the client
function ensureCssLoaded() {
  if (typeof document === 'undefined') return;
  
  // Check if the CSS is already loaded
  const isBulmaLoaded = Array.from(document.styleSheets).some(sheet => 
    sheet.href && sheet.href.includes('bulma')
  );
  
  const isFontAwesomeLoaded = Array.from(document.styleSheets).some(sheet => 
    sheet.href && sheet.href.includes('font-awesome')
  );
  
  // Load Bulma if not already loaded
  if (!isBulmaLoaded) {
    const bulmaLink = document.createElement('link');
    bulmaLink.rel = 'stylesheet';
    bulmaLink.href = 'https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css';
    document.head.appendChild(bulmaLink);
  }
  
  // Load Font Awesome if not already loaded
  if (!isFontAwesomeLoaded) {
    const fontAwesomeLink = document.createElement('link');
    fontAwesomeLink.rel = 'stylesheet';
    fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
    document.head.appendChild(fontAwesomeLink);
  }
}

/**
 * Initialize the client-side portion of the influencer platform
 * @param {Object} options - Client initialization options
 * @param {Element} options.el - DOM element to mount the app
 * @param {Object} options.app - Vue app instance
 */
function init(options = {}) {
  const { el, app } = options;
  
  if (!el || !app) {
    console.error('Missing required parameters for influencer platform client init');
    return;
  }
  
  // Ensure CSS frameworks are loaded
  ensureCssLoaded();
  
  // Initialize any client-side specific functionality
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize Bulma's hamburger menu
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll('.navbar-burger'), 
      0
    );
    
    if ($navbarBurgers.length > 0) {
      $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
          
          // Toggle the "is-active" class on both the burger and menu
          el.classList.toggle('is-active');
          $target?.classList.toggle('is-active');
        });
      });
    }
    
    console.log('Influencer platform client-side initialization complete');
  });
  
  return {
    app
  };
}

// For CommonJS environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { init };
} 