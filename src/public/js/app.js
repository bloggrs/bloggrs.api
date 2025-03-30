// Main app.js for client-side functionality
(function() {
  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    console.log('Influencer Platform app initialized');
    
    // Initialize navbar burger menu for mobile
    initNavbar();
    
    // Handle client-side navigation
    setupNavigation();
    
    // Setup Vue components if Vue is loaded
    if (window.Vue) {
      initVueComponents();
    }
  });
  
  // Initialize responsive navbar
  function initNavbar() {
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll('.navbar-burger'), 
      0
    );
    
    if ($navbarBurgers.length > 0) {
      $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {
          const target = el.dataset.target;
          const $target = document.getElementById(target);
          el.classList.toggle('is-active');
          $target?.classList.toggle('is-active');
        });
      });
    }
  }
  
  // Setup client-side navigation
  function setupNavigation() {
    // Get all internal links
    const internalLinks = document.querySelectorAll('a[href^="/"]');
    
    internalLinks.forEach(link => {
      // Skip links with special attributes
      if (link.hasAttribute('target') || 
          link.hasAttribute('download') || 
          link.getAttribute('rel') === 'external') {
        return;
      }
      
      // Handle click events
      link.addEventListener('click', function(event) {
        const href = this.getAttribute('href');
        
        // Skip API links
        if (href.startsWith('/api/')) {
          return;
        }
        
        // Update URL and history
        window.history.pushState({}, '', href);
        
        // TODO: If you implement client-side routing, handle route change here
        // For now, just reload the page
        window.location.reload();
        
        event.preventDefault();
      });
    });
    
    // Handle back/forward browser navigation
    window.addEventListener('popstate', function() {
      window.location.reload();
    });
  }
  
  // Initialize Vue components if Vue is loaded
  function initVueComponents() {
    // This function would initialize Vue components
    // For now, it's a placeholder
  }
})(); 