<template>
  <div class="section">
    <div class="container">
      <div class="columns">
        <!-- Main Content -->
        <div class="column is-8">
          <h1 class="title is-2">Blog Posts</h1>

          <!-- Filters -->
          <div class="box mb-5">
            <div class="field is-grouped is-grouped-multiline">
              <div class="control">
                <div class="select">
                  <select v-model="selectedCategory">
                    <option value="">All Categories</option>
                    <option v-for="category in categories" 
                            :key="category.id" 
                            :value="category.slug">
                      {{ category.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="control">
                <button @click="applyFilters" class="button is-info">
                  Apply Filters
                </button>
              </div>
              <div class="control">
                <button @click="resetFilters" class="button is-light">
                  Reset
                </button>
              </div>
            </div>
          </div>

          <!-- Posts Grid -->
          <div class="posts-grid">
            <article v-for="post in posts" 
                     :key="post.id" 
                     class="box post-item">
              <div class="columns">
                <div class="column is-4" v-if="post.coverImage">
                  <figure class="image is-3by2">
                    <img :src="post.coverImage" :alt="post.title">
                  </figure>
                </div>
                <div :class="['column', post.coverImage ? 'is-8' : 'is-12']">
                  <h2 class="title is-4">
                    <a :href="`/posts/${post.slug}`">{{ post.title }}</a>
                  </h2>
                  <div class="post-meta mb-3">
                    <span class="icon-text">
                      <span class="icon">
                        <i class="fas fa-user"></i>
                      </span>
                      <span>{{ post.author.name }}</span>
                    </span>
                    <span class="icon-text ml-4">
                      <span class="icon">
                        <i class="fas fa-calendar"></i>
                      </span>
                      <span>{{ formatDate(post.createdAt) }}</span>
                    </span>
                  </div>
                  <p class="excerpt">{{ post.excerpt }}</p>
                  <div class="tags mt-3">
                    <span v-for="category in post.categories" 
                          :key="category.id"
                          class="tag is-info is-light">
                      {{ category.name }}
                    </span>
                  </div>
                  <a :href="`/posts/${post.slug}`" class="button is-primary is-small mt-3">
                    Read More
                  </a>
                </div>
              </div>
            </article>
          </div>

          <!-- Pagination -->
          <nav v-if="pagination.pages > 1" 
               class="pagination is-centered mt-6" 
               role="navigation" 
               aria-label="pagination">
            <a class="pagination-previous" 
               :disabled="currentPage === 1"
               @click="changePage(currentPage - 1)">
              Previous
            </a>
            <a class="pagination-next"
               :disabled="currentPage === pagination.pages"
               @click="changePage(currentPage + 1)">
              Next page
            </a>
            <ul class="pagination-list">
              <li v-for="page in paginationRange" :key="page">
                <a class="pagination-link"
                   :class="{ 'is-current': page === currentPage }"
                   @click="changePage(page)">
                  {{ page }}
                </a>
              </li>
            </ul>
          </nav>
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
            <h3 class="title is-4">Popular Tags</h3>
            <div class="tags">
              <span v-for="tag in popularTags" 
                    :key="tag.id"
                    class="tag is-primary is-light">
                {{ tag.name }}
              </span>
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
      posts: [],
      categories: [],
      popularTags: [],
      selectedCategory: '',
      currentPage: 1,
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        pages: 1
      }
    };
  },
  computed: {
    paginationRange() {
      const range = [];
      const rangeSize = 5;
      const halfRange = Math.floor(rangeSize / 2);
      
      let start = this.currentPage - halfRange;
      if (start < 1) start = 1;
      
      let end = start + rangeSize - 1;
      if (end > this.pagination.pages) {
        end = this.pagination.pages;
        start = Math.max(1, end - rangeSize + 1);
      }
      
      for (let i = start; i <= end; i++) {
        range.push(i);
      }
      
      return range;
    }
  },
  methods: {
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    async loadPosts() {
      try {
        const response = await fetch(
          `/api/plugins/blog-platform/posts?page=${this.currentPage}&category=${this.selectedCategory}`
        );
        const data = await response.json();
        
        this.posts = data.posts;
        this.pagination = data.pagination;
      } catch (error) {
        console.error('Error loading posts:', error);
      }
    },
    async loadCategories() {
      try {
        const response = await fetch('/api/plugins/blog-platform/categories');
        const data = await response.json();
        this.categories = data.categories;
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    },
    changePage(page) {
      this.currentPage = page;
      this.loadPosts();
      window.scrollTo(0, 0);
    },
    applyFilters() {
      this.currentPage = 1;
      this.loadPosts();
    },
    resetFilters() {
      this.selectedCategory = '';
      this.currentPage = 1;
      this.loadPosts();
    }
  },
  mounted() {
    this.loadPosts();
    this.loadCategories();
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

.post-meta {
  color: #666;
  font-size: 0.9rem;
}

.excerpt {
  color: #4a4a4a;
  margin-bottom: 1rem;
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
</style> 