import Vue from 'vue'
import Router from "vue-router";

import Userauth from '../auth/js/index';
import Body from '../components/body'
import Auth from '../auth/auth';

/* Auth */
import login from '../auth/login';

import Serenazgo from '../pages/Usuarios/Serenazgo'
import Comunal from '../pages/Usuarios/Comunal'
import Incidentes from '../pages/Incidentes'
import Marcadores from '../pages/Marcadores'
// component

Vue.use(Router)

const routes = [{
    path: '',
    redirect: {
      name: 'serenazgo'
    }
  },
  {
    path: '/usuarios',
    component: Body,
    children: [{
        path: 'serenazgo',
        name: 'serenazgo',
        component: Serenazgo,
        meta: {
          title: 'Serenazgos',
        }
      },
      {
        path: 'comunal',
        name: 'comunal',
        component: Comunal,
        meta: {
          title: 'Comunal',
        }
      }
    ]
  },
  {
    path: '/app',
    component: Body,
    children: [{
        path: 'incidentes',
        component: Incidentes,
        name: 'incidentes',
        meta: {
          title: 'Incidentes',
        }
      },
      {
        path: 'marcadores',
        component: Marcadores,
        name: 'marcadores',
        meta: {
          title: 'Marcadores',
        }
      }
    ]
  },
  {
    path: '/auth',
    component: Auth,
    children: [{
      path: 'login',
      name: 'Login 1',
      component: login,
      meta: {
        title: ' login | Cuba - Premium Admin Template',
      }
    }, ]
  },
];

const router = new Router({
  routes,
  base: '/',
  mode: 'history',
  linkActiveClass: "active",
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  }
});

router.beforeEach((to, from, next) => {
  if (to.meta.title)
    document.title = to.meta.title;
  // const CurrentUser = firebase.auth().currentUser;    
  const path = ['/auth/login', '/auth/register'];
  if (path.includes(to.path) || Userauth.isAuthenticatedUser()) {
    return next();
  }
  next('/auth/login');
});

export default router