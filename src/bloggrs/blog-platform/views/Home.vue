<template>
  <div class="blog-home">
    <!-- Hero Section -->
    <section class="hero is-medium is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-1">
            Welcome to Our Blog
          </h1>
          <h2 class="subtitle">
            Discover stories, insights, and knowledge
          </h2>
        </div>
      </div>
    </section>

    <div class="section">
      <div class="container">
        <!-- Featured Posts -->
        <div v-if="featuredPosts.length > 0" class="mb-6">
          <h2 class="title is-2">Featured Posts</h2>
          <div class="columns is-multiline">
            <div v-for="post in featuredPosts" 
                 :key="post.id" 
                 class="column is-4">
              <div class="card">
                <div class="card-image" v-if="post.coverImage">
                  <figure class="image is-4by3">
                    <img :src="post.coverImage" :alt="post.title">
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-left" v-if="post.author.avatar">
                      <figure class="image is-48x48">
                        <img :src="post.author.avatar" :alt="post.author.name">
                      </figure>
                    </div>
                    <div class="media-content">
                      <p class="title is-4">{{ post.title }}</p>
                      <p class="subtitle is-6">By {{ post.author.name }}</p>
                    </div>
                  </div>
                  <div class="content">
                    {{ post.excerpt }}
                    <br>
                    <div class="tags mt-2">
                      <span v-for="category in post.categories" 
                            :key="category.id"
                            class="tag is-primary is-light">
                        {{ category.name }}
                      </span>
                    </div>
                    <time :datetime="post.createdAt">
                      {{ post.createdAt }}
                    </time>
                  </div>
                </div>
                <footer class="card-footer">
                  <a :href="`/posts/${post.slug}`" class="card-footer-item">
                    Read More
                  </a>
                </footer>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Posts -->
        <div class="columns">
          <div class="column is-8">
            <h2 class="title is-2">Recent Posts</h2>
            <div class="posts-list">
              <article v-for="post in recentPosts" 
                      :key="post.id"
                      class="post-item box">
                <h3 class="title is-4">
                  <a :href="`/posts/${post.slug}`">{{ post.title }}</a>
                </h3>
                <p class="subtitle is-6">
                  By {{ post.author.name }} · {{ post.createdAt }}
                </p>
                <p>{{ post.excerpt }}</p>
                <div class="tags mt-2">
                  <span v-for="category in post.categories" 
                        :key="category.id"
                        class="tag is-info is-light">
                    {{ category.name }}
                  </span>
                </div>
              </article>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="column is-4">
            <div class="box">
              <h3 class="title is-4">Categories</h3>
              <div class="categories-list">
                <a v-for="category in categories" 
                   :key="category.id"
                   :href="`/categories/${category.slug}`"
                   class="category-item">
                  {{ category.name }}
                  <span class="tag is-light">{{ category._count.posts }}</span>
                </a>
              </div>
            </div>

            <div class="box">
              <h3 class="title is-4">Blog Stats</h3>
              <div class="stats-list">
                <div class="stat-item">
                  <span class="icon"><i class="fas fa-file-alt"></i></span>
                  <span>{{ stats.postCount }} Posts</span>
                </div>
                <div class="stat-item">
                  <span class="icon"><i class="fas fa-users"></i></span>
                  <span>{{ stats.authorCount }} Authors</span>
                </div>
                <div class="stat-item">
                  <span class="icon"><i class="fas fa-folder"></i></span>
                  <span>{{ stats.categoryCount }} Categories</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  data() {
    return {
      featuredPosts: [],
      recentPosts: [],
      categories: [],
      stats: {
        postCount: 0,
        authorCount: 0,
        categoryCount: 0
      }
    };
  },
  async created() {
    try {
      await this.fetchData();
    } catch (error) {
      console.error('Error loading blog data:', error);
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
.post-item {
  margin-bottom: 1.5rem;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.category-item:last-child {
  border-bottom: none;
}

.stats-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stat-item .icon {
  color: #4a4a4a;
}
</style> 