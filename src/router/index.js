import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import RecommendDrug from '../views/RecommendDrug.vue'
import UploadFilePage from '../views/UploadFilePage.vue'
import FilesRetrainingPage from '../views/FilesRetrainingPage.vue'
import RetrainingLogPage from '../views/RetrainingLogPage.vue'
import ConfigurationPage from '../views/ConfigurationPage.vue'
import DashboardPage from '../views/DashboardPage.vue'


const host = 'http://localhost:8000';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/recommend-drug',
    name: 'Recommend Drug',
    component: RecommendDrug,
    props: {
      host: host
    }
  },
  {
    path: '/upload-file',
    name: 'Upload File',
    component: UploadFilePage,
    props: {
      host: host
    }
  },
  {
    path: '/files-retraining',
    name: 'File & Retraining',
    component: FilesRetrainingPage,
    props: {
      host: host
    }
  },
  {
    path: '/retraining-log',
    name: 'Retraining Log',
    component: RetrainingLogPage,
    props: {
      host: host
    }
  },
  {
    path: '/configuration',
    name: 'Configuration',
    component: ConfigurationPage,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
    props: {
      host: host
    }
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
