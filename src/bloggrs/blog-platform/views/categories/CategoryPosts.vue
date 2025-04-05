<template>
  <div class="section">
    <div class="container">
      <!-- Back Button and Category Title -->
      <div class="level mb-5">
        <div class="level-left">
          <div class="level-item">
            <a href="/">
              <button class="button" >
                <span class="icon">
                  <i class="fas fa-arrow-left"></i>
                </span>
                <span>Back</span>
              </button>
            </a>
          </div>
          <div class="level-item">
            <h1 class="title is-2" v-if="category">
              {{ category.name }}
              <span class="tag is-medium is-info ml-2">
                {{ (posts || []).length }} posts
              </span>
            </h1>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="has-text-centered">
        <button class="button is-large is-loading">Loading</button>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="notification is-danger">
        {{ error }}
      </div>

      <!-- Posts List -->
      <div v-else-if="posts && posts.length > 0" class="posts-grid">
        <article v-for="post in posts" 
                 :key="post.id" 
                 class="box post-item mb-5">
          <div class="columns">
            <!-- Post Image -->
            <div class="column is-3" v-if="post.coverImage">
              <figure class="image is-16by9">
                <img :src="post.coverImage" :alt="post.title">
              </figure>
            </div>

            <!-- Post Content -->
            <div :class="['column', post.coverImage ? 'is-9' : 'is-12']">
              <h2 class="title is-4">
                <a :href="`/post/${post.id}`" class="has-text-dark">{{ post.title }}</a>
              </h2>

              <!-- Post Meta -->
              <div class="level is-mobile mb-2">
                <div class="level-left">
                  <div class="level-item">
                    <div class="media">
                      <div class="media-left" v-if="post.author?.avatar">
                        <figure class="image is-32x32">
                          <img class="is-rounded" 
                               :src="post.author.avatar" 
                               :alt="post.author.name">
                        </figure>
                      </div>
                      <div class="media-content">
                        <p class="subtitle is-6">
                          By {{ post.author?.name || 'Unknown Author' }}
                        </p>
                        <p class="is-size-7 has-text-grey">
                          {{ new Date(post.createdAt).toLocaleDateString() }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Post Excerpt -->
              <p class="content">{{ post.excerpt || post.content.substring(0, 200) + '...' }}</p>

              <!-- Post Categories -->
              <div class="tags" v-if="post.categories && post.categories.length">
                <span v-for="cat in post.categories" 
                      :key="cat.id"
                      class="tag is-info is-light">
                  {{ cat.name }}
                </span>
              </div>

              <!-- Read More Button -->
              <a :href="`/post/${post.id}`" class="button is-primary is-small mt-3">
                Read More
              </a>
            </div>
          </div>
        </article>
      </div>

      <!-- No Posts State -->
      <div v-else-if="!loading && !error" class="notification is-warning">
        No posts found in this category.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryPosts',

  data() {
    return {
      loading: true,
      error: null,
      category: null,
      posts: [],
      lastUpdated: null
    };
  },

  created() {
    // Initialize with server-side data if available
    const ssrData = this.getInitialData();
    if (ssrData) {
      this.initializeFromData(ssrData);
    }
  },

  mounted() {
    if (!this.category || !this.posts) {
      this.fetchCategoryData();
    }
  },

  methods: {
    getInitialData() {
      return typeof window !== 'undefined' && window.INITIAL_DATA
        ? window.INITIAL_DATA
        : null;
    },

    initializeFromData(data) {
      if (data.error) {
        this.error = data.error;
      } else {
        this.category = data.category || null;
        this.posts = data.posts || [];
      }
      this.lastUpdated = data.lastUpdated;
      this.loading = false;
    },

    async fetchCategoryData() {
      try {
        const categoryId = this.$params.id;
        const response = await fetch(`/api/plugins/blog-platform/categories/${categoryId}/posts`);
        
        if (!response.ok) {
          throw new Error(`Failed to load category data: ${response.statusText}`);
        }

        const data = await response.json();
        this.initializeFromData(data);
      } catch (error) {
        console.error('Error fetching category data:', error);
        this.error = error.message;
        this.loading = false;
      }
    },

    formatDate(dateString) {
      if (!dateString) return '';
      try {
        return new Date(dateString).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      } catch (error) {
        console.error('Error formatting date:', error);
        return dateString;
      }
    }
  }
};
</script>

<style scoped>
.post-item {
  transition: transform 0.2s ease;
}

.post-item:hover {
  transform: translateY(-2px);
}

.image.is-16by9 {
  background-color: #f5f5f5;
}

.image.is-16by9 img {
  object-fit: cover;
}

.level-item .title {
  margin-bottom: 0;
}

.media-content p {
  margin-bottom: 0;
}

.content {
  color: #4a4a4a;
  margin-bottom: 1rem;
}

.tags {
  margin-bottom: 0.5rem;
}
</style> 