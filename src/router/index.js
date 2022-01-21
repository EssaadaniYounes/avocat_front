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
    path: '/folders',
    name: 'Folders',
    component: Views.Folders
  },
  {
    path: '/add-folder/:id?',
    name: 'AddFolder',
    component: Views.AddFolder,
    props: true
  },
  {
    path: '/clients',
    name: 'Clients',
    component: Views.Clients
  },
  {
    path: '/courts',
    name: 'Courts',
    component: Views.Courts
  },
  {
    path: '/file/fee/:id?',
    name: 'Fee',
    component: Views.Fee,
    props: true
  },
  {
    path: '/users',
    name: 'Users',
    component: Views.Users
  }
  ,
  {
    path: '/issues',
    name: 'Issues',
    component: Views.Issues
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
