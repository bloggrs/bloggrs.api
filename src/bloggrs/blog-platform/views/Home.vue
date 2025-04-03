<template>
  <div class="home">
    <!-- Hero Section with Stats -->
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Welcome to Our Blog</h1>
          <div class="stats-container">
            <div class="stat-item">
              <span class="stat-number">{{ stats.postCount }}</span>
              <span class="stat-label">Posts</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ stats.authorCount }}</span>
              <span class="stat-label">Authors</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ stats.categoryCount }}</span>
              <span class="stat-label">Categories</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Posts Section -->
    <section class="section">
      <div class="container">
        <h2 class="title is-3">Featured Posts</h2>
        <div class="columns is-multiline">
          <div v-for="post in featuredPosts" :key="post.id" class="column is-4">
            <div class="card">
              <div class="card-image" v-if="post.coverImage">
                <figure class="image is-4by3">
                  <img :src="post.coverImage" :alt="post.title">
                </figure>
              </div>
              <div class="card-content">
                <p class="title is-4">{{ post.title }}</p>
                <p class="subtitle is-6">
                  By {{ post.author.name }} | 
                  {{ new Date(post.createdAt).toLocaleDateString() }}
                </p>
                <div class="content">
                  {{ post.excerpt || post.content.substring(0, 150) + '...' }}
                </div>
                <div class="tags">
                  <span v-for="category in post.categories" 
                        :key="category.id" 
                        class="tag is-primary">
                    {{ category.name }}
                  </span>
                  <span v-if="post.tag" class="tag is-info">
                    {{ post.tag.name }}
                  </span>
                </div>
              </div>
              <footer class="card-footer">
                <a :href="'/post/' + post.id" class="card-footer-item">
                  Read More
                </a>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="section has-background-light">
      <div class="container">
        <h2 class="title is-3">Categories</h2>
        <div class="columns is-multiline">
          <div v-for="category in categories" 
               :key="category.id" 
               class="column is-3">
            <div class="box">
              <h3 class="title is-5">{{ category.name }}</h3>
              <p class="subtitle is-6">
                {{ category._count.posts }} posts
              </p>
              <a :href="'/category/' + category.id" class="button is-small is-primary">
                View Posts
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Last Updated -->
    <footer class="footer">
      <div class="content has-text-centered">
        <p>Last updated: {{ new Date(lastUpdated).toLocaleString() }}</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Home',
  
  data() {
    return {
      featuredPosts: [],
      categories: [],
      stats: {
        postCount: 0,
        authorCount: 0,
        categoryCount: 0
      },
      lastUpdated: null
    };
  },

  mounted() {
    // Data is automatically provided by the plugin system
    // through the dataProvider specified in plugin.json
    if (window.INITIAL_DATA) {
      const { featuredPosts, categories, stats, lastUpdated } = window.INITIAL_DATA;
      this.featuredPosts = featuredPosts;
      this.categories = categories;
      this.stats = stats;
      this.lastUpdated = lastUpdated;
    }
  }
};
</script>

<style scoped>
.stats-container {
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  display: block;
}

.stat-label {
  text-transform: uppercase;
  font-size: 0.9rem;
}

.card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-footer {
  margin-top: auto;
}
</style> 