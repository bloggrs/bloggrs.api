<template>
  <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">
    <n-layout class="layout">
      <!-- Compact Header -->
      <n-layout-header bordered class="header">
        <div class="header-content">
          <div class="header-left">
            <n-button quaternary tag="a" href="/" class="nav-item">Home</n-button>
            <n-button quaternary tag="a" href="/about" class="nav-item">About</n-button>
          </div>
          <div class="header-right">
            <n-text class="site-title">Tech Blog</n-text>
          </div>
        </div>
      </n-layout-header>

      <n-layout-content class="main-content">
        <div class="container">
          <!-- Main Content Grid -->
          <div class="content-grid">
            <!-- Main Column -->
            <div class="main-column">
              <!-- Blog Posts Grid -->
              <div class="blog-grid">
                <n-card v-for="post in posts" :key="post.id" class="blog-card">
                  <div class="date-meta">{{ post.date }}</div>
                  <n-h3 class="post-title">{{ post.title }}</n-h3>
                  <p class="post-excerpt">{{ post.excerpt }}</p>
                </n-card>
              </div>
            </div>
            
            <!-- Sidebar -->
            <div class="sidebar">
              <div class="categories-section">
                <div v-for="category in categories" :key="category.id" class="category-item">
                  {{ category.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </n-layout-content>
    </n-layout>
  </n-config-provider>
</template>

<script>
// Importing Naive UI components properly for SSR
const naive = require('naive-ui');

module.exports = {
  name: 'NativeApp',
  components: {
    NConfigProvider: naive.NConfigProvider,
    NLayout: naive.NLayout,
    NLayoutHeader: naive.NLayoutHeader,
    NLayoutContent: naive.NLayoutContent,
    NButton: naive.NButton,
    NText: naive.NText,
    NCard: naive.NCard,
    NH3: naive.NH3
  },
  
  data() {
    return {
      darkTheme: naive.darkTheme,
      themeOverrides: {
        common: {
          bodyColor: '#121212',
          cardColor: '#1e1e1e',
          primaryColor: '#0088cc'
        }
      },
      posts: [
        {
          id: 1,
          title: 'Getting Started with Naive UI and Vue 3',
          date: 'January 21, 2023',
          excerpt: "Learn how to integrate Naive UI with Vue 3 and set up a modern application with dark theme support."
        },
        {
          id: 2,
          title: 'Building Components with Naive UI',
          date: 'January 28, 2023',
          excerpt: "Discover the power of Naive UI component system and how to customize them for your needs."
        },
        {
          id: 3,
          title: 'Server-Side Rendering with Vue and Express',
          date: 'February 5, 2023',
          excerpt: "A complete guide to setting up SSR with Vue and Express for better performance and SEO."
        }
      ],
      categories: [
        { id: 'all', name: 'All Stories', count: 30 },
        { id: 'vue', name: 'Vue', count: 12 },
        { id: 'naive-ui', name: 'Naive UI', count: 8 },
        { id: 'ssr', name: 'SSR', count: 5 }
      ]
    };
  }
};
</script>

<style>
/* Base styles */
.layout {
  background-color: #121212;
  min-height: 100vh;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header */
.header {
  background: #121212;
  border-color: #2c2c2c !important;
  height: 56px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-left, .header-right {
  display: flex;
  align-items: center;
}

.nav-item {
  color: rgba(255, 255, 255, 0.9) !important;
  font-size: 14px !important;
}

.site-title {
  font-size: 18px !important;
  font-weight: 600 !important;
  color: rgba(255, 255, 255, 0.9) !important;
}

/* Main Content */
.main-content {
  padding: 24px 0;
}

/* Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 250px;
  gap: 30px;
}

/* Main Column */
.main-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Blog Grid */
.blog-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.blog-card {
  background-color: #1e1e1e !important;
  border: 1px solid #2c2c2c !important;
  padding: 16px !important;
}

.date-meta {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.52);
  margin-bottom: 5px;
}

.post-title {
  font-size: 16px !important;
  line-height: 1.3 !important;
  margin: 5px 0 10px !important;
  color: rgba(255, 255, 255, 0.9) !important;
}

.post-excerpt {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.82);
  margin: 10px 0;
  line-height: 1.4;
}

/* Sidebar */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.categories-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.category-item {
  padding: 8px 0;
  color: rgba(255, 255, 255, 0.82);
  font-size: 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.09);
}

/* Responsive styles */
@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
  .blog-grid {
    grid-template-columns: 1fr;
  }
}
</style> 