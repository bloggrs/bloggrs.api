import { defineStore } from 'pinia'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const useMainStore = defineStore('main', {
  state: () => ({
    message: '',
    loading: false,
    error: null
  }),
  
  actions: {
    async loadMessage() {
      this.loading = true
      try {
        const store = await prisma.vueStores.findFirst({
          where: {
            name: 'main'
          }
        })
        this.message = store?.state?.message || 'Welcome to the Store!'
      } catch (err) {
        this.error = err.message
        console.error('Failed to load store message:', err)
      } finally {
        this.loading = false
      }
    }
  }
}) 