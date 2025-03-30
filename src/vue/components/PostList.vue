<template>
  <div class="post-list">
    <n-card v-for="post in posts" :key="post.id" class="post-card">
      <template #header>
        <h2>{{ post.title }}</h2>
      </template>
      <p>{{ post.excerpt }}</p>
      <template #footer>
        <div class="post-meta">
          <span>By {{ getAuthor(post.authorId).name }}</span>
          <span>in {{ getCategory(post.categoryId).name }}</span>
          <span>{{ post.createdAt }}</span>
        </div>
      </template>
    </n-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import naive from 'naive-ui'
import { posts, authors, categories } from '../data/mock'

export default defineComponent({
  components: {
    NCard: naive.NCard
  },
  data() {
    return {
      posts,
      authors,
      categories
    }
  },
  methods: {
    getAuthor(id) {
      return this.authors.find(author => author.id === id)
    },
    getCategory(id) {
      return this.categories.find(category => category.id === id)
    }
  }
})
</script>

<style>
.post-list {
  max-width: 800px;
  margin: 0 auto;
}

.post-card {
  margin-bottom: 20px;
}

.post-meta {
  display: flex;
  gap: 20px;
  color: #666;
}
</style> 