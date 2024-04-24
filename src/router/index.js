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
      component: List
    },
    {
      path: '/add',
      name: 'add',
      component: Add
    },
    {
      path: '/view/:id',
      name: 'view',
      component: View
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: Edit
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    },
    ,
  {
    name: 'SignUp',
    component: SignUp,
    path:'/sign-up'
  },
  {
    name: 'Login',
    component: Login,
    path:'/login'
  }
  ]
  
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
  })
  
  export default router