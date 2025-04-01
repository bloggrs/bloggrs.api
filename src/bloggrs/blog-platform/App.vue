<template>
  <div class="blog-app">
    <!-- Navigation -->
    <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <strong>Blog Platform</strong>
          </a>
        </div>

        <div class="navbar-menu">
          <div class="navbar-start">
            <a v-for="item in navigation" 
               :key="item.path"
               :href="item.path"
               class="navbar-item">
              <span class="icon">
                <i :class="item.icon"></i>
              </span>
              <span>{{ item.label }}</span>
            </a>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="field has-addons">
                <div class="control">
                  <input v-model="searchQuery" 
                         class="input" 
                         type="text" 
                         placeholder="Search posts...">
                </div>
                <div class="control">
                  <button @click="handleSearch" class="button is-info">
                    <span class="icon">
                      <i class="fas fa-search"></i>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main>
      <router-view></router-view>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="columns">
          <div class="column is-4">
            <h3 class="title is-4">About</h3>
            <p>A full-featured blogging platform for creating and managing your content.</p>
          </div>
          <div class="column is-4">
            <h3 class="title is-4">Quick Links</h3>
            <ul>
              <li v-for="item in navigation" :key="item.path">
                <a :href="item.path">{{ item.label }}</a>
              </li>
            </ul>
          </div>
          <div class="column is-4">
            <h3 class="title is-4">Connect</h3>
            <div class="social-links">
              <a href="#" class="icon is-medium">
                <i class="fab fa-twitter fa-lg"></i>
              </a>
              <a href="#" class="icon is-medium">
                <i class="fab fa-facebook fa-lg"></i>
              </a>
              <a href="#" class="icon is-medium">
                <i class="fab fa-instagram fa-lg"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
module.exports = {
  name: 'BlogApp',
  data() {
    return {
      searchQuery: '',
      navigation: [
        { label: 'Home', path: '/', icon: 'fas fa-home' },
        { label: 'Posts', path: '/posts', icon: 'fas fa-file-alt' },
        { label: 'Categories', path: '/categories', icon: 'fas fa-folder' },
        { label: 'Authors', path: '/authors', icon: 'fas fa-users' }
      ]
    };
  },
  methods: {
    handleSearch() {
      if (this.searchQuery?.trim()) {
        const searchPath = `/posts?search=${encodeURIComponent(this.searchQuery.trim())}`;
        if (typeof window !== 'undefined') {
          window.location.href = searchPath;
        }
        return searchPath;
      }
      return null;
    }
  },
  // Add SSR-specific hooks
  serverPrefetch() {
    // This will be called during SSR
    return Promise.resolve();
  }
};
</script>

<style scoped>
.blog-app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}

.navbar-item .icon {
  margin-right: 0.5rem;
}

.footer {
  padding: 3rem 1.5rem;
  background-color: #f5f5f5;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-links a {
  color: #4a4a4a;
  transition: color 0.3s ease;
}

.social-links a:hover {
  color: #3273dc;
}
</style> 