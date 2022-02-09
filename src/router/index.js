import Vue from 'vue'
import VueRouter from 'vue-router'
import Views from '../views'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Views.Login
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Views.Categories
  },
  {
    path: '/products',
    name: 'Products',
    component: Views.Products
  },
  {
    path: '/products/add-product',
    name: 'AddProduct',
    component: Views.AddProduct
  },
  {
    path: '/branches',
    name: 'Branches',
    component: Views.Branches
  },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
