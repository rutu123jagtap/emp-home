import { createRouter, createWebHistory } from "vue-router";
import List from '../components/employee/List.vue';
import Add from '../components/employee/Add.vue';
import View from '../components/employee/View.vue';
import Edit from '../components/employee/Edit.vue';
import NotFound from '../views/NotFound.vue';
import SignUp from '../components/employee/SignUp.vue';
import Login from '../components/employee/Login.vue';


const routes = [
    {
      path: '/',
      name: 'list',
      component: List,
      meta: { showNavbar: true }
    },
    {
      path: '/add',
      name: 'add',
      component: Add,
      meta: { showNavbar: true }
    },
    {
      path: '/view/:id',
      name: 'view',
      component: View,
      meta: { showNavbar: true }
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: Edit,
      meta: { showNavbar: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
    ,
  {
    name: 'SignUp',
    component: SignUp,
    path:'/sign-up',
    meta: { showNavbar: false }
  },
  {
    name: 'Login',
    component: Login,
    path:'/login',
    meta: { showNavbar: false }
  }
  ]
  
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
  })

//   router.beforeEach((to, from, next) => {
//     const isAuthenticated = !!localStorage.getItem('userData')
//     if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
//         next('/login')
//     } else {
//         next()
//     }
// })
  
  export default router