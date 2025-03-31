/**
 * Client-side initialization for the influencer platform plugin
 */
const pluginConfig = require('./plugin.json');

/**
 * Initialize the client-side functionality
 */
function init() {
  ensureCssLoaded();
  setupEventHandlers();
  
  console.log('Influencer Platform client initialized');
}

/**
 * Helper function to ensure CSS is loaded on the client
 */
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
 * Set up client-side event handlers
 */
function setupEventHandlers() {
  if (typeof document === 'undefined') return;
  
  // Setup navbar burger menu toggle
  document.addEventListener('DOMContentLoaded', function() {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    
    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target?.classList.toggle('is-active');
      });
    });
  });
  
  // Setup tabs if they exist
  document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tabs li');
    const tabContentBoxes = document.querySelectorAll('.tab-content');
    
    if (tabs.length > 0) {
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          tabs.forEach(item => item.classList.remove('is-active'));
          tab.classList.add('is-active');
          
          const target = tab.dataset.target;
          
          tabContentBoxes.forEach(box => {
            if (box.getAttribute('id') === target) {
              box.classList.remove('is-hidden');
            } else {
              box.classList.add('is-hidden');
            }
          });
        });
      });
    }
  });
}

// Export the client-side functions
module.exports = {
  init
};

// Auto-initialize when loaded directly in the browser
if (typeof window !== 'undefined') {
  init();
}

// Client entry point for Vue hydration
import { createApp } from 'vue';
import App from './App.vue';

// Create and mount the app
function mountApp() {
  const app = createApp(App);
  app.mount('#app');
}

// Wait for DOM content to be loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
} 