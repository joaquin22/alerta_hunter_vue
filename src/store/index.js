import Vue from "vue";
import Vuex from "vuex";
// import 'es6-promise/auto';
import layout from './modules/layout'
import menu from './modules/menu'
import {
  authentication
} from './modules/authentication';
import {
  alert
} from './modules/alert';
import usuarios from './modules/usuarios';
import incidentes from './modules/incidentes';
import marcadores from './modules/marcadores';
import serenazgos from './modules/serenazgos';
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    layout,
    menu,
    authentication,
    alert,
    usuarios,
    incidentes,
    marcadores,
    serenazgos
  }
});