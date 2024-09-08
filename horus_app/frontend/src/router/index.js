import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView')
  },
  {
    path: '/robots',
    name: 'robots',
    component: () => import('../views/RobotsView')
  },
  {
    path: "/data",
    name: "data",
    component: () => import('../views/DataView')
  },
  {
    path: "/gallery",
    name: "gallery",
    component: () => import("../views/GalleryView")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
