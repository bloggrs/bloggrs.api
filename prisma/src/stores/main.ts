import { defineStore } from 'pinia'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const useMainStore = defineStore('main', {
  state: () => ({
    message: ''
  }),
  actions: {
    async loadStore() {
      const store = await prisma.vueStores.findFirst({
        where: {
          name: 'main',
          instanceId: process.env.VUE_APP_INSTANCE_ID
        }
      })

      if (store) {
        this.message = store.state.message
      }
    }
  }
}) 