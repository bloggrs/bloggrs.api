<template>
  <div class="post-detail">
    <!-- Loading State -->
    <section class="section" v-if="loading">
      <div class="container has-text-centered">
        <button class="button is-large is-loading">Loading</button>
      </div>
    </section>

    <!-- Error State -->
    <section class="section" v-else-if="error">
      <div class="container">
        <div class="notification is-danger">
          {{ error }}
        </div>
      </div>
    </section>

    <!-- Content State -->
    <template v-else>
      <!-- Post Content -->
      <section class="hero is-medium is-primary" v-if="post">
        <div class="hero-body">
          <div class="container">
            <p class="subtitle is-6 has-text-white-bis">
              {{ new Date(post.createdAt).toLocaleDateString() }}
            </p>
            <h1 class="title is-1 has-text-white">{{ post.title }}</h1>
            <div class="author-info has-text-white-bis">
              <span class="icon-text">
                <span class="icon">
                  <i class="fas fa-user"></i>
                </span>
                <span>{{ post.author?.name }}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section class="section" v-if="post">
        <div class="container">
          <div class="columns">
            <div class="column is-8 is-offset-2">
              <!-- Cover Image -->
              <figure class="image mb-6" v-if="post.coverImage">
                <img :src="post.coverImage" :alt="post.title">
              </figure>

              <!-- Post Content -->
              <div class="content is-medium">
                <div v-html="post.content"></div>
              </div>

              <!-- Categories -->
              <div class="tags mt-6">
                <span class="tag is-medium is-info is-light" 
                      v-for="category in post.categories" 
                      :key="category.id">
                  {{ category.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Posts -->
      <section class="section">
        <div class="container">
          <h2 class="title is-3">Featured Posts</h2>
          <div class="columns is-multiline">
            <div class="column is-4" 
                 v-for="featuredPost in featuredPosts" 
                 :key="featuredPost.id" 
                 >
              <div class="card">
                <div class="card-image" v-if="featuredPost.coverImage">
                  <figure class="image is-16by9">
                    <img :src="featuredPost.coverImage" :alt="featuredPost.title">
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-left" v-if="featuredPost.author?.avatar">
                      <figure class="image is-48x48">
                        <img class="is-rounded" :src="featuredPost.author.avatar" :alt="featuredPost.author.name">
                      </figure>
                    </div>
                    <div class="media-content">
                      <p class="title is-4">{{ featuredPost.title }}</p>
                      <p class="subtitle is-6" v-if="featuredPost.author">By {{ featuredPost.author.name }}</p>
                    </div>
                  </div>

                  <div class="content">
                    <p>{{ featuredPost.excerpt }}</p>
                    <div class="tags">
                      <span class="tag is-light" v-for="category in featuredPost.categories" :key="category.id">
                        {{ category.name }}
                      </span>
                    </div>
                    <br>
                    <time :datetime="featuredPost.createdAt">{{ new Date(featuredPost.createdAt).toLocaleDateString() }}</time>
                  </div>
                </div>
                <footer class="card-footer">
                  <a :href="'/post/' + featuredPost.id" class="card-footer-item">
                    Read More
                  </a>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>
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
      }
      this.post = data.post;
      this.featuredPosts = data.featuredPosts;
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

.content.is-medium {
  font-size: 1.1rem;
  line-height: 1.8;
}

.author-info {
  margin-top: 1rem;
}
</style>