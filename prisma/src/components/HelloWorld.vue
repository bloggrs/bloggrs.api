<template>
  <div class="hello">
    <h1>{{ componentMessage }}</h1>
    <p>{{ storeMessage }}</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useMainStore } from '../stores/main'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default {
  name: 'HelloWorld',
  setup() {
    const componentMessage = ref('')
    const store = useMainStore()

    onMounted(async () => {
      try {
        // Load component data
        const component = await prisma.vueComponents.findFirst({
          where: {
            name: 'HelloWorld'
          }
        })
        componentMessage.value = component?.script?.message || 'Hello Vue!'
        
        // Load store data
        await store.loadMessage()
      } catch (err) {
        console.error('Failed to load component:', err)
      }
    })

    return {
      componentMessage,
      storeMessage: store.message
    }
  }
}
</script>

<style scoped>
.hello {
  text-align: center;
  margin-top: 60px;
}

h1 {
  color: #42b983;
}
</style> 