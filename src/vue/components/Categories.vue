<template>
  <div class="categories-container">
    <div class="search-box">
      <n-input-group>
        <n-input placeholder="Search" />
        <n-button>Search</n-button>
      </n-input-group>
    </div>
    
    <div class="categories-section">
      <h4 class="category-heading">All Stories <span class="count">{{ totalPosts }}</span></h4>
      <div class="category-list">
        <n-button 
          v-for="category in categories" 
          :key="category.id"
          quaternary 
          class="category-button"
          @click="$emit('select-category', category.id)"
        >
          {{ category.name }} <span v-if="category.count" class="count">{{ category.count }}</span>
        </n-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      default: () => []
    },
    totalPosts: {
      type: Number,
      default: 0
    }
  },
  emits: ['select-category']
}
</script>

<style scoped>
.categories-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.search-box {
  margin-bottom: 10px;
}

.categories-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.category-heading {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 10px 0;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.category-button {
  justify-content: flex-start;
  padding: 4px 0;
  font-size: 0.9rem;
}

.count {
  font-size: 0.8rem;
  color: #666;
  margin-left: 5px;
}
</style> 