<template>
  <n-layout-header class="header">
    <n-menu mode="horizontal" :options="menuOptions" />
  </n-layout-header>
</template>

<script>
import { defineComponent } from 'vue'
import naive from 'naive-ui'

export default defineComponent({
  components: {
    NLayoutHeader: naive.NLayoutHeader,
    NMenu: naive.NMenu
  },
  data() {
    return {
      menuOptions: [
        { label: 'Home', key: 'home' },
        { label: 'Categories', key: 'categories' },
        { label: 'Authors', key: 'authors' }
      ]
    }
  }
})
</script> 