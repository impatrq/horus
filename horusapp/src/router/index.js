import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/robots',
    name: 'robots',
    component: () => import('../views/RobotsView.vue')
  },
  {
    path: "/data",
    name: "data",
    component: () => import("../views/DataView.vue")
  },
  {
    path: "/gallery",
    name: "gallery",
    component: () => import("../views/GalleryView.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
