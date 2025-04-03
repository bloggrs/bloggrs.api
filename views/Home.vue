<template>
  <!-- ... existing template code ... -->
</template>

<script>
module.exports = {
  data() {
    // Initialize with data from plugin system
    return {
      featuredPosts: window.INITIAL_DATA?.featuredPosts || [],
      recentPosts: window.INITIAL_DATA?.recentPosts || [],
      categories: window.INITIAL_DATA?.categories || [],
      stats: window.INITIAL_DATA?.stats || {
        postCount: 0,
        authorCount: 0,
        categoryCount: 0
      }
    };
  },
  async created() {
    // Only fetch data client-side if we don't have initial data
    if (!window.INITIAL_DATA || Object.keys(window.INITIAL_DATA).length === 0) {
      try {
        await this.fetchData();
      } catch (error) {
        console.error('Error loading blog data:', error);
      }
    }
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch('/api/plugins/blog-platform/home');
        const data = await response.json();
        
        this.featuredPosts = data.featuredPosts || [];
        this.recentPosts = data.recentPosts || [];
        this.categories = data.categories || [];
        this.stats = data.stats || this.stats;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }
};
</script>

<style scoped>
// ... existing styles ...
</style> 