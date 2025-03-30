/**
 * Emergency Navigation Component
 * 
 * This script provides basic navigation functionality when the application
 * is in emergency mode (i.e., when Vue has failed to initialize properly)
 */
(function() {
  // Check if we're in emergency mode
  if (!window.EMERGENCY_MODE) {
    return;
  }
  
  console.log('[Emergency Nav] Initializing emergency navigation');
  
  // Create the navigation element
  const nav = document.createElement('nav');
  nav.className = 'navbar is-primary';
  nav.setAttribute('role', 'navigation');
  nav.setAttribute('aria-label', 'main navigation');
  
  // Set the HTML content
  nav.innerHTML = `
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <strong>Influencer Platform</strong>
      </a>
    </div>
    
    <div class="navbar-menu is-active">
      <div class="navbar-start">
        <a href="/" class="navbar-item">
          <span class="icon-text">
            <span class="icon">
              <i class="fas fa-home"></i>
            </span>
            <span>Home</span>
          </span>
        </a>
        
        <a href="/influencers" class="navbar-item">
          <span class="icon-text">
            <span class="icon">
              <i class="fas fa-users"></i>
            </span>
            <span>Influencers</span>
          </span>
        </a>
        
        <a href="/brands" class="navbar-item">
          <span class="icon-text">
            <span class="icon">
              <i class="fas fa-building"></i>
            </span>
            <span>Brands</span>
          </span>
        </a>
        
        <a href="/campaigns" class="navbar-item">
          <span class="icon-text">
            <span class="icon">
              <i class="fas fa-bullhorn"></i>
            </span>
            <span>Campaigns</span>
          </span>
        </a>
      </div>
      
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-danger is-light">
              <strong>Emergency Mode</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Get the app element
  const app = document.getElementById('app');
  
  // If app element exists, prepend the navigation
  if (app) {
    app.prepend(nav);
    console.log('[Emergency Nav] Navigation added to the page');
  } else {
    console.error('[Emergency Nav] Could not find app element');
    
    // Try to add to body instead
    document.body.prepend(nav);
  }
  
  // Add some basic styles for the navigation
  const style = document.createElement('style');
  style.textContent = `
    .navbar {
      margin-bottom: 20px;
    }
    
    /* Mark the current page in the navigation */
    .navbar-item[href="${window.location.pathname}"] {
      background-color: rgba(255, 255, 255, 0.2);
      font-weight: bold;
    }
  `;
  
  document.head.appendChild(style);
})(); 