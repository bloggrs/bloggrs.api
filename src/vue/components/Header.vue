<template>
  <header class="site-header">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: String,
    description: String
  }
}
</script>

<style scoped>
.site-header {
  padding: 2rem;
  background: #f5f5f5;
  text-align: center;
}
</style> 