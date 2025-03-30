<template>
  <div class="blog-post">
    <div class="post-date">{{ post.date }}</div>
    <h2 class="post-title">{{ post.title }}</h2>
    <p class="post-excerpt">{{ post.excerpt }}</p>
    <n-button text class="read-more-link" @click="$emit('read-more', post.id)">
      Read More
    </n-button>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  emits: ['read-more']
}
</script>

<style scoped>
.blog-post {
  margin-bottom: 40px;
  padding-bottom: 30px;
  border-bottom: 1px solid #eee;
}

.post-date {
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 10px;
}

.post-title {
  font-size: 1.6rem;
  font-weight: 600;
  margin: 0 0 15px 0;
  line-height: 1.3;
}

.post-excerpt {
  font-size: 1rem;
  line-height: 1.6;
  margin: 0 0 15px 0;
  color: #333;
}

.read-more-link {
  font-size: 0.9rem;
  color: #2080f0;
  padding: 0;
}
</style> 