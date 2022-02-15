import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import router from './router'
import Breadcrumbs from './components/bread_crumbs'
import VueSweetalert2 from 'vue-sweetalert2';
import SmartTable from 'vuejs-smart-table';
import {
  store
} from './store';
import VueFeather from 'vue-feather';
import Toasted from 'vue-toasted';

import PxCard from './components/Pxcard.vue'
import * as VueGoogleMaps from 'vue2-google-maps';
import VueExpandableImage from "vue-expandable-image";
Vue.component(PxCard.name, PxCard)

// Import Theme scss
import './assets/scss/app.scss'


Vue.use(VueFeather);
Vue.use(BootstrapVue)
Vue.use(SmartTable);
Vue.use(VueSweetalert2);
Vue.use(VueExpandableImage)
Vue.component('Breadcrumbs', Breadcrumbs)
Vue.use(Toasted, {
  iconPack: 'fontawesome'
});

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDp8zywv1pugxOnKim2pHGFRTfO_t0qo3Q',
    libraries: 'places',
  },
});

// firebase.initializeApp({
//   projectId: 'alerta-2056a'
// });

// export const db = firebase;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')