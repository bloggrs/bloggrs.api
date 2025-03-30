<template>
  <nav class="site-nav">
    <a href="/blogs">Blogs</a>
    <a href="/about">About</a>
    <a href="/login">Login</a>
  </nav>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>

<style scoped>
.site-nav {
  padding: 1rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

a {
  color: #2c3e50;
  text-decoration: none;
}

a:hover {
  color: #42b983;
}
</style> 