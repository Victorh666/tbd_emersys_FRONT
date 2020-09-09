import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/Users.vue')
  },
  {
    path: '/emergencies',
    name: 'Emergencies',
    component: () => import('../views/Emergencies.vue')
  },
  {
    path: '/emergencies/create',
    name: 'CreateEmergency',
    component: () => import('../views/CreateEmergency.vue')
  },
  {
    path: '/work',
    name: 'Work',
    component: () => import('../views/Work.vue')
  },
  {
    path: '/emergencies/Task/:id',
    name: 'Tasks',
    component: () => import('../views/Tasks.vue')
  },
  {
    path: '/emergencies/abilities/:id/:instId',
    name: 'Abilities',
    component: () => import('../views/Abilities.vue')
  },
  {
    path: '/emergencies/Task/create/:id',
    name: 'CreateTasks',
    component: () => import('../views/CreateTask.vue')
  },
  {
    path: '/emergencies/task/abilities/:id',
    name: 'TaskAbility',
    component: () => import('../views/taskAbilities.vue')
  },
  {
    path: '/userspick/:id',
    name: 'UsersPcik',
    component: () => import('../views/UsersPick.vue')
  },
  {
    path: '/FindVoluntarie',
    name: 'FindVoluntarie',
    component: () => import('../views/FindVoluntarie.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
