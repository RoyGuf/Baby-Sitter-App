import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import Home from '../views/Home.vue'
import BabySitterByAge from '../views/BabySitterByAge.vue'
import DefaultLayout from '../components/DefaultLayout.vue'
import BabySitterList from '../views/BabySitterList.vue'
import BabysitterDetails from '../views/BabysitterDetails.vue'
import CustomerDetails from '../views/CustomerDetails.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Ages from '../views/AgesGroups.vue'
import NotFoundPage from '../views/NotFoundPage.vue'
import About from '../views/About.vue'
import Dashboard from '../views/Dashboard.vue'
import store from '../store';
import { computed } from '@vue/reactivity'


// meta:{authRequired: false}

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/login',
        name: 'login',
        component: Login
      },
      {
        path: '/register',
        name: 'register',
        component: Register,
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta:{requiresAuth: true}
      },
      {
        path: '/ages',
        name: 'ages',
        component: Ages
      },
      {
        path: '/about',
        name: 'about',
        component: About
      },
      {
        path: '/by-age/:age',
        name: 'byAge',
        component: BabySitterByAge
      },
      {
        path: '/search/:name',
        name: 'byName',
        component: BabySitterList
      },
      {
        path: '/babysitter/:id',
        name: 'babysitterDetails',
        component: BabysitterDetails
      },
      {
        path: '/customer/:id',
        name: 'customerDetails',
        component: CustomerDetails
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'notFoundPage',
        component: NotFoundPage
      },
    ]
  },
  
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return {
        savedPosition,
        behavior: 'smooth',
      }
    } else {
      return { 
        top: 0,
        behavior: 'smooth',
       }
    }
  },
})

router.beforeResolve(async (to, from) => {
  const auth         = localStorage.getItem("isAuthenticated")
  const routesToHome = to.name === 'login' || to.name === 'register'
  if(routesToHome && auth && new Date() < JSON.parse(auth).expDate){
    return { name: 'home' }
  }
  if(to.meta.requiresAuth === true && !auth){
    return { name: 'login' }
  }
})

export default router;