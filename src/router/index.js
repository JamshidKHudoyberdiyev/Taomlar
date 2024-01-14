import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/components/Index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/addproduct',
      name: 'AddProduct',
      component: () => import('@/components/AddProduct.vue')
    },
    {
      path: '/editProduct/:product_slug',
      name: 'EditProduct',
      component: () => import('@/components/EditProduct.vue')
    }
  ]
})

export default router
