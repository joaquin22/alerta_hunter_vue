import Vue from 'vue'
import Router from "vue-router";

import Userauth from '../auth/js/index';
import Body from '../components/body'
import Auth from '../auth/auth';

/* Auth */
import login from '../auth/login';

import Serenazgo from '../pages/Usuarios/Serenazgo'
import Comunal from '../pages/Usuarios/Comunal'
import Ciudadanos from '../pages/Usuarios/Ciudadanos'
import Personal from '../pages/Usuarios/Personal'
import Unidad from '../pages/Usuarios/Unidad'
import Noticias from '../pages/Noticias'
import Incidentes from '../pages/Incidentes'
import Marcadores from '../pages/Marcadores'
import TipoMarcadores from '../pages/Marcadores/tiposMarcador'
import Alertas from '../pages/Alertas'
import AlertasList from '../pages/Alertas/list'
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
          title: 'Hunter Seguro | Serenazgos',
        }
      },
      {
        path: 'comunal',
        name: 'comunal',
        component: Comunal,
        meta: {
          title: 'Hunter Seguro | Comunal',
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
          title: 'Hunter Seguro | Incidentes',
        }
      },
      {
        path: 'marcadores',
        component: Marcadores,
        name: 'marcadores',
        meta: {
          title: 'Hunter Seguro | Marcadores',
        }
      },
      {
        path: 'tipos-marcador',
        component: TipoMarcadores,
        name: 'tipos-marcador',
        meta: {
          title: 'Hunter Seguro | Tipo de Marcador',
        }
      },
      {
        path: 'alertas',
        component: Alertas,
        name: 'alertas',
        meta: {
          title: 'Hunter Seguro | Alertas',
        }
      },
      {
        path: 'alertas-list',
        component: AlertasList,
        name: 'incidencias',
        meta: {
          title: 'Hunter Seguro | Incidencias',
        }
      },
      {
        path: 'ciudadanos',
        component: Ciudadanos,
        name: 'ciudadanos',
        meta: {
          title: 'Hunter Seguro | Ciudadanos',
        }
      },
      {
        path: 'personal',
        component: Personal,
        name: 'personal',
        meta: {
          title: 'Hunter Seguro | Personal',
        }
      },
      {
        path: 'unidad',
        component: Unidad,
        name: 'unidad',
        meta: {
          title: 'Hunter Seguro | Unidad',
        }
      },
      {
        path: 'noticias',
        component: Noticias,
        name: 'noticias',
        meta: {
          title: 'Hunter Seguro | Noticias',
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
        title: 'Inicio de sesión',
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