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
      console.error('[Vue Client] Vue is not defined! Loading from CDN...');
      
      // Create script element for Vue
      const vueScript = document.createElement('script');
      vueScript.src = 'https://unpkg.com/vue@3.2.47/dist/vue.global.js';
      
      // Add script to head
      document.head.appendChild(vueScript);
      
      // When Vue loads, initialize app
      vueScript.onload = function() {
        console.log('[Vue Client] Vue loaded from CDN');
        initVueApp();
      };
      
      // If Vue fails to load, show error
      vueScript.onerror = function() {
        console.error('[Vue Client] Failed to load Vue from CDN');
        showError('Failed to load Vue library');
      };
    } else {
      // Vue is already available, initialize app
      initVueApp();
    }
  };
  
  /**
   * Initialize the Vue application
   */
  function initVueApp() {
    try {
      console.log('[Vue Client] Starting Vue app initialization');
      
      // Check if app element exists
      const appContainer = document.getElementById('app');
      if (!appContainer) {
        console.error('[Vue Client] App container not found');
        return;
      }
      
      // Add the missing computed property for filteredInfluencers
      if (!window.COMPONENT_DATA.computed) {
        window.COMPONENT_DATA.computed = {};
      }
      
      // Define the filteredInfluencers computed property that was missing
      window.COMPONENT_DATA.computed.filteredInfluencers = function() {
        // Get influencers from the data
        const influencers = this.influencers || [];
        
        if (!this.searchQuery) {
          return influencers;
        }
        
        const query = this.searchQuery.toLowerCase();
        return influencers.filter(influencer => {
          return (
            (influencer.name && influencer.name.toLowerCase().includes(query)) ||
            (influencer.handle && influencer.handle.toLowerCase().includes(query)) ||
            (influencer.bio && influencer.bio.toLowerCase().includes(query)) ||
            (influencer.categories && influencer.categories.some(category => 
              category.name && category.name.toLowerCase().includes(query)
            ))
          );
        });
      };
      
      // Define methods if they are not already defined
      if (!window.COMPONENT_DATA.methods) {
        window.COMPONENT_DATA.methods = {};
      }
      
      // Add formatNumber method if it's not already defined
      if (!window.COMPONENT_DATA.methods.formatNumber) {
        window.COMPONENT_DATA.methods.formatNumber = function(num) {
          if (num === undefined || num === null) return '0';
          if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
          } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
          }
          return num.toString();
        };
      }
      
      console.log('[Vue Client] Creating Vue app with computed properties:', Object.keys(window.COMPONENT_DATA.computed));
      
      // Create Vue app
      const app = Vue.createApp({
        template: window.COMPONENT_DATA.template,
        
        data() {
          // Make sure we set the influencers array from INITIAL_DATA
          return {
            searchQuery: '',
            error: null,
            isLoading: false,
            influencers: window.INITIAL_DATA.influencers || [],
            ...window.INITIAL_DATA || {},
            ...window.ROUTE_PARAMS || {},
            isClient: true
          };
        },
        
        methods: window.COMPONENT_DATA.methods,
        
        computed: window.COMPONENT_DATA.computed,
        
        mounted() {
          console.log('[Vue Client] App mounted successfully');
          console.log('[Vue Client] Initial data keys:', Object.keys(window.INITIAL_DATA));
          console.log('[Vue Client] Influencers count:', this.influencers?.length || 0);
          window.vueAppMounted = true;
          
          // Mark app as loaded to hide loading indicator
          if (typeof window.markAppAsLoaded === 'function') {
            window.markAppAsLoaded();
          }
        }
      });
      
      // Mount the app
      app.mount('#app');
      
      console.log('[Vue Client] App mounting process started');
    } catch (error) {
      console.error('[Vue Client] Error initializing Vue app:', error);
      showError(`Error initializing Vue app: ${error.message}`);
    }
  }
  
  /**
   * Show error message
   * @param {string} message - Error message
   */
  function showError(message) {
    console.error('[Vue Client] Error:', message);
    
    const errorContainer = document.createElement('div');
    errorContainer.className = 'notification is-danger';
    errorContainer.style.margin = '20px';
    errorContainer.innerHTML = `
      <h3 class="title is-4">Vue Application Error</h3>
      <p>${message}</p>
      <button class="button is-primary mt-3" onclick="window.location.reload()">Reload Page</button>
    `;
    
    // Get app container, or create one if it doesn't exist
    let appContainer = document.getElementById('app');
    if (!appContainer) {
      appContainer = document.createElement('div');
      appContainer.id = 'app';
      document.body.appendChild(appContainer);
    }
    
    // Clear any existing content and show error
    appContainer.innerHTML = '';
    appContainer.appendChild(errorContainer);
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