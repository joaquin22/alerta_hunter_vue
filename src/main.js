import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import router from './router'
import Breadcrumbs from './components/bread_crumbs'
import VueSweetalert2 from 'vue-sweetalert2';
import {
  store
} from './store';
import VueFeather from 'vue-feather';
import Toasted from 'vue-toasted';

import PxCard from './components/Pxcard.vue'
import * as VueGoogleMaps from 'vue2-google-maps';
Vue.component(PxCard.name, PxCard)

// Import Theme scss
import './assets/scss/app.scss'


Vue.use(VueFeather);
Vue.use(BootstrapVue)
Vue.use(VueSweetalert2);
Vue.component('Breadcrumbs', Breadcrumbs)
Vue.use(Toasted, {
  iconPack: 'fontawesome'
});

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCdXpLSJ3Ibdu-Phs9QOvpqb9d1DtPf7wQ',
    libraries: 'places',
  },
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')