<template>
  <div class="app">
    <Header 
      :title="title"
      :description="description"
    />
    <Navigation />
    <main>
      <p>Start creating your blog todayasasdadssasdadsasad231312!</p>
    </main>
  </div>
</template>

<script>
import Header from './Header.vue'
import Navigation from './Navigation.vue'

export default {
  name: 'App',
  components: {
    Header,
    Navigation
  },
  data() {
    return {
      title: 'Welcome to Bloggrs',
      description: 'Modern Blogging Platform'
    }
  }
}
</script>

<style>
.app {
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

main {
  padding: 2rem;
  text-align: center;
}
</style> 