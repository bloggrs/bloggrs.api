<template>
  <div class="post-detail">
    <!-- Existing post content template -->
    
    <!-- Add Featured Posts section after the main content -->
    <section class="section" v-if="featuredPosts && featuredPosts.length">
      <div class="container">
        <h2 class="title is-3">Featured Posts</h2>
        <div class="columns is-multiline">
          <div class="column is-4" v-for="post in featuredPosts" :key="post.id" v-if="post.id !== $params.id">
            <div class="card">
              <div class="card-image" v-if="post.coverImage">
                <figure class="image is-16by9">
                  <img :src="post.coverImage" :alt="post.title">
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-left" v-if="post.author?.avatar">
                    <figure class="image is-48x48">
                      <img class="is-rounded" :src="post.author.avatar" :alt="post.author.name">
                    </figure>
                  </div>
                  <div class="media-content">
                    <p class="title is-4">{{ post.title }}</p>
                    <p class="subtitle is-6" v-if="post.author">By {{ post.author.name }}</p>
                  </div>
                </div>

                <div class="content">
                  <p>{{ post.excerpt }}</p>
                  <div class="tags">
                    <span class="tag is-light" v-for="category in post.categories" :key="category.id">
                      {{ category.name }}
                    </span>
                  </div>
                  <br>
                  <time :datetime="post.createdAt">{{ formatDate(post.createdAt) }}</time>
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
  </div>
</template>

<script>
export default {
  name: 'PostDetail',
  
  data() {
    return {
      loading: true,
      post: null,
      error: null,
      lastUpdated: null,
      featuredPosts: [],
      isSubmitting: false,
      newComment: {
        author: '',
        email: '',
        content: ''
      }
    };
  },

  created() {
    // Initialize with server-side data if available
    const ssrData = this.getInitialData();
    if (ssrData) {
      this.initializeFromData(ssrData);
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
        this.post = data.post;
        this.featuredPosts = data.featuredPosts || [];
      }
      this.lastUpdated = data.lastUpdated;
      this.loading = false;
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
.card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-footer {
  margin-top: auto;
}

.card-content {
  flex-grow: 1;
}

.tags {
  margin-top: 1rem;
}

.image.is-16by9 {
  background-color: #f5f5f5;
}

.image.is-16by9 img {
  object-fit: cover;
}

.card-footer-item {
  color: #485fc7;
  font-weight: 500;
}

.card-footer-item:hover {
  background-color: #f8f9fa;
}
</style>