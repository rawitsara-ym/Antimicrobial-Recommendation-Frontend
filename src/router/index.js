import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import RecommendDrug from '../views/RecommendDrug.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/recommend-drug',
    name: 'Recommend Drug',
    component: RecommendDrug
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
