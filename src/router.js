import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  base: '/',

  /** Application routes */
  routes: [
    {
      path: '/',
      component: () => import('./views/home.vue'),
      name: 'home'
    }
  ]
})

export default router;