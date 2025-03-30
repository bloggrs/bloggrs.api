/**
 * Vue Client Bootstrap Script
 * 
 * This script initializes the Vue application on the client side
 * using the data provided by the server.
 */
(function() {
  console.log('[Vue Client] Initializing Vue client...');
  
  // Set an initialization flag to prevent double initialization
  window.vueClientInitialized = false;
  
  // Define the main initialization function
  window.initVueApp = function() {
    // Prevent double initialization
    if (window.vueClientInitialized) {
      console.log('[Vue Client] Already initialized');
      return;
    }
    
    window.vueClientInitialized = true;
    
    console.log('[Vue Client] Starting Vue app initialization');
    
    // Check if Vue is available
    if (typeof Vue === 'undefined') {
      console.error('[Vue Client] Vue is not defined! Attempting to load from CDN...');
      loadVueFromCDN();
      return;
    }
    
    // Validate component data
    if (!validateComponentData()) {
      console.error('[Vue Client] Component data validation failed');
      showError('Component data validation failed');
      return;
    }
    
    try {
      // Check if app element exists
      const appContainer = document.getElementById('app');
      if (!appContainer) {
        console.error('[Vue Client] App container not found');
        showError('App container not found');
        return;
      }
      
      console.log('[Vue Client] Creating Vue app');
      
      // Create Vue app
      const app = Vue.createApp({
        template: window.COMPONENT_DATA.template,
        
        data() {
          return {
            ...window.INITIAL_DATA || {},
            ...window.ROUTE_PARAMS || {},
            isClient: true,
            isLoading: false
          };
        },
        
        methods: {
          ...window.COMPONENT_DATA.methods,
          
          // Utility method for formatting numbers
          formatNumber(num) {
            if (num === undefined || num === null) return '0';
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          },
          
          // Safe navigation for nested objects
          safeGet(obj, path, defaultValue = '') {
            return path.split('.').reduce((prev, curr) => {
              return prev && prev[curr] !== undefined ? prev[curr] : defaultValue;
            }, obj);
          }
        },
        
        computed: {
          ...window.COMPONENT_DATA.computed
        },
        
        mounted() {
          console.log('[Vue Client] App mounted successfully');
          window.vueAppMounted = true;
          
          // Mark app as loaded to hide loading indicator
          if (typeof window.markAppAsLoaded === 'function') {
            window.markAppAsLoaded();
          }
          
          // Log initial data for debugging
          console.log('[Vue Client] Initial data keys:', Object.keys(window.INITIAL_DATA || {}));
          console.log('[Vue Client] Route params:', window.ROUTE_PARAMS || {});
        }
      });
      
      // Mount the app
      console.log('[Vue Client] Mounting Vue app to #app element');
      app.mount('#app');
      
      console.log('[Vue Client] App mounting process completed');
    } catch (error) {
      console.error('[Vue Client] Error initializing Vue app:', error);
      showError(`Error initializing Vue app: ${error.message}`);
    }
  };
  
  /**
   * Load Vue from CDN
   */
  function loadVueFromCDN() {
    console.log('[Vue Client] Loading Vue from CDN');
    
    // Create script element
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/vue@3.2.47/dist/vue.global.js';
    
    // When Vue loads, initialize app
    script.onload = function() {
      console.log('[Vue Client] Vue loaded from CDN');
      window.initVueApp();
    };
    
    // If Vue fails to load, show error
    script.onerror = function() {
      console.error('[Vue Client] Failed to load Vue from CDN');
      
      // Try alternative CDN
      const altScript = document.createElement('script');
      altScript.src = 'https://cdn.jsdelivr.net/npm/vue@3.2.47/dist/vue.global.min.js';
      
      altScript.onload = function() {
        console.log('[Vue Client] Vue loaded from alternative CDN');
        window.initVueApp();
      };
      
      altScript.onerror = function() {
        console.error('[Vue Client] Failed to load Vue from alternative CDN');
        showError('Failed to load Vue library');
      };
      
      document.head.appendChild(altScript);
    };
    
    // Add script to head
    document.head.appendChild(script);
  }
  
  /**
   * Validate component data
   * @returns {boolean} True if valid, false otherwise
   */
  function validateComponentData() {
    console.log('[Vue Client] Validating component data');
    
    // Check if COMPONENT_DATA exists
    if (!window.COMPONENT_DATA) {
      console.error('[Vue Client] COMPONENT_DATA is missing');
      
      // Provide emergency component data
      window.COMPONENT_DATA = {
        template: `
          <div class="section">
            <div class="container">
              <div class="notification is-danger">
                <h3 class="title is-4">Component Data Missing</h3>
                <p>The server did not provide component data. This usually indicates a server-side rendering issue.</p>
                <p>Route: ${window.location.pathname}</p>
                <button class="button is-primary mt-3" @click="reloadPage">Reload Page</button>
              </div>
            </div>
          </div>
        `,
        methods: {
          reloadPage() {
            window.location.reload();
          }
        },
        computed: {}
      };
      
      console.log('[Vue Client] Created emergency component data');
    }
    
    // Check if template exists
    if (!window.COMPONENT_DATA.template) {
      console.error('[Vue Client] Component template is missing');
      
      window.COMPONENT_DATA.template = `
        <div class="section">
          <div class="container">
            <div class="notification is-danger">
              <h3 class="title is-4">Component Template Missing</h3>
              <p>The component data was found, but it contains no template.</p>
              <p>Route: ${window.location.pathname}</p>
              <button class="button is-primary mt-3" @click="reloadPage">Reload Page</button>
            </div>
          </div>
        </div>
      `;
      
      // Ensure methods exists
      if (!window.COMPONENT_DATA.methods) {
        window.COMPONENT_DATA.methods = {
          reloadPage() {
            window.location.reload();
          }
        };
      } else {
        window.COMPONENT_DATA.methods.reloadPage = function() {
          window.location.reload();
        };
      }
    }
    
    // Ensure methods and computed exist
    if (!window.COMPONENT_DATA.methods) {
      console.log('[Vue Client] Component methods is missing, creating empty object');
      window.COMPONENT_DATA.methods = {};
    }
    
    if (!window.COMPONENT_DATA.computed) {
      console.log('[Vue Client] Component computed is missing, creating empty object');
      window.COMPONENT_DATA.computed = {};
    }
    
    // Ensure INITIAL_DATA exists
    if (!window.INITIAL_DATA) {
      console.log('[Vue Client] INITIAL_DATA is missing, creating empty object');
      window.INITIAL_DATA = {};
    }
    
    // Ensure ROUTE_PARAMS exists
    if (!window.ROUTE_PARAMS) {
      console.log('[Vue Client] ROUTE_PARAMS is missing, creating empty object');
      window.ROUTE_PARAMS = {};
    }
    
    console.log('[Vue Client] Component data validation complete');
    return true;
  }
  
  /**
   * Show error message
   * @param {string} message - Error message
   */
  function showError(message) {
    console.error('[Vue Client] Error:', message);
    
    // Try to use the error container
    const errorContainer = document.getElementById('error-container');
    const errorMessage = document.getElementById('error-message');
    const loadingElement = document.getElementById('loading');
    
    if (errorContainer && errorMessage) {
      if (loadingElement) {
        loadingElement.style.display = 'none';
      }
      
      errorContainer.style.display = 'block';
      errorMessage.innerText = message;
      return;
    }
    
    // If error container doesn't exist, create one
    const container = document.createElement('div');
    container.className = 'error-message';
    container.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #f14668;
      color: white;
      padding: 1rem;
      border-radius: 4px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      z-index: 9999;
      max-width: 90%;
      text-align: center;
    `;
    
    container.innerHTML = `
      <div>${message}</div>
      <button onclick="window.location.reload()" style="margin-top: 10px; background-color: white; color: #f14668; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Reload Page</button>
    `;
    
    document.body.appendChild(container);
    
    // Hide loading indicator
    if (loadingElement) {
      loadingElement.style.display = 'none';
    }
  }
  
  // Start the initialization
  document.addEventListener('DOMContentLoaded', function() {
    console.log('[Vue Client] DOM content loaded, initializing Vue app');
    window.initVueApp();
  });
  
  // Fallback: If DOMContentLoaded doesn't fire, try initializing after a delay
  setTimeout(function() {
    if (!window.vueClientInitialized) {
      console.log('[Vue Client] DOMContentLoaded didn\'t fire, initializing Vue app after timeout');
      window.initVueApp();
    }
  }, 2000);
})(); 