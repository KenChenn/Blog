import { createRouter, createWebHistory } from 'vue-router'
import LinkStart from '../views/LinkStart.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LinkStart',
      component: LinkStart
    },
    {
      path: '/SwordArtOnline',
      name: 'SwordArtOnline',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SwordArtOnline.vue')
    }
  ]
})

export default router
