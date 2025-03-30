<template>
  <div class="site-header">
    <div class="header-left">
      <n-button quaternary class="nav-item" @click="$emit('navigate', 'home')">Home</n-button>
      <n-button quaternary class="nav-item" @click="$emit('navigate', 'about')">About me</n-button>
    </div>
    <div class="header-right">
      <h1 class="site-title">{{ siteName }}</h1>
      <p class="site-tagline">Master one tool at a time...</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    siteName: {
      type: String,
      default: 'Your Name'
    }
  },
  emits: ['navigate']
}
</script>

<style scoped>
.site-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 40px;
}

.header-left {
  display: flex;
  gap: 10px;
}

.header-right {
  text-align: right;
}

.site-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
}

.site-tagline {
  font-size: 0.9rem;
  margin: 0;
  color: #666;
}

.nav-item {
  padding: 0 5px;
  font-size: 0.9rem;
}
</style> 