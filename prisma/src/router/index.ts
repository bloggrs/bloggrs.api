import { createRouter, createWebHistory } from 'vue-router'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getRoutes() {
  const routes = await prisma.vueRoutes.findMany({
    where: {
      instanceId: process.env.VUE_APP_INSTANCE_ID
    }
  })

  return routes.map(route => ({
    path: route.path,
    name: route.name,
    component: () => import(`../components/${route.component}.vue`),
    meta: route.meta
  }))
}

const router = createRouter({
  history: createWebHistory(),
  routes: await getRoutes()
})

export default router 