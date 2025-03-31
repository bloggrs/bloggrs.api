<template>
  <div>
    <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <strong>Influencer Platform</strong>
        </a>
        
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="mainNavbar">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      
      <div id="mainNavbar" class="navbar-menu">
        <div class="navbar-start">
          <a href="/influencers" class="navbar-item">
            <span class="icon"><i class="fas fa-users"></i></span>
            <span>Influencers</span>
          </a>
          
          <a href="/brands" class="navbar-item">
            <span class="icon"><i class="fas fa-building"></i></span>
            <span>Brands</span>
          </a>
          
          <a href="/campaigns" class="navbar-item">
            <span class="icon"><i class="fas fa-bullhorn"></i></span>
            <span>Campaigns</span>
          </a>
        </div>
        
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a href="/settings" class="button is-light">
                <span class="icon"><i class="fas fa-cog"></i></span>
                <span>Settings</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    
    <section class="section">
      <div class="container">
        <h1 class="title">Influencer Marketing Platform</h1>
        <h2 class="subtitle">Manage your influencer marketing campaigns</h2>
        
        <div class="notification is-info is-light mb-5">
          <p><strong>New System Architecture:</strong> This application now uses server-side rendering with pre-fetched data. Vue components receive data directly from the server without making API calls.</p>
        </div>
        
        <div class="columns is-multiline mt-5">
          <div class="column is-4">
            <div class="card">
              <div class="card-content">
                <p class="title is-4">
                  <span class="icon has-text-info"><i class="fas fa-users"></i></span>
                  Influencers
                </p>
                <p>Discover and manage influencers for your campaigns.</p>
              </div>
              <footer class="card-footer">
                <a href="/influencers" class="card-footer-item">Browse Influencers</a>
              </footer>
            </div>
          </div>
          
          <div class="column is-4">
            <div class="card">
              <div class="card-content">
                <p class="title is-4">
                  <span class="icon has-text-success"><i class="fas fa-building"></i></span>
                  Brands
                </p>
                <p>Manage brand profiles and partnerships.</p>
              </div>
              <footer class="card-footer">
                <a href="/brands" class="card-footer-item">View Brands</a>
              </footer>
            </div>
          </div>
          
          <div class="column is-4">
            <div class="card">
              <div class="card-content">
                <p class="title is-4">
                  <span class="icon has-text-danger"><i class="fas fa-bullhorn"></i></span>
                  Campaigns
                </p>
                <p>Create and monitor marketing campaigns.</p>
              </div>
              <footer class="card-footer">
                <a href="/campaigns" class="card-footer-item">Manage Campaigns</a>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isClient: false
    };
  },
  
  mounted() {
    console.log('App component mounted on client');
    this.isClient = true;
    
    // Handle navbar toggle on mobile
    document.addEventListener('DOMContentLoaded', () => {
      const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
      
      if ($navbarBurgers.length > 0) {
        $navbarBurgers.forEach(el => {
          el.addEventListener('click', () => {
            const target = el.dataset.target;
            const $target = document.getElementById(target);
            
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');
          });
        });
      }
    });
  }
};
</script>