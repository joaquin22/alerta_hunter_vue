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
import ciudadanos from './modules/ciudadanos';
import comunales from './modules/comunales';
import personal from './modules/personal';
import unidad from './modules/unidad';
import noticias from './modules/noticias';

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
    serenazgos,
    ciudadanos,
    comunales,
    personal,
    unidad,
    noticias,
  }
});