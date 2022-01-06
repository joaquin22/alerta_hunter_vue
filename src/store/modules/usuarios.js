import {
    userService
} from '../../_services';

const state = {
    comunales: []
}

const getters = {

};

const actions = {
    getComunales({
        commit
    }) {
        userService.getComunales().then(
            usuarios => {
                commit('setComunales', usuarios);
            },
            error => {
                console.log(error);
            }
        )
    },
    addComunal({
        commit
    }, datos) {
        userService.addComunal(datos).then(
            usuario => {
                commit('addComunal', usuario);
            }, error => {
                console.log(error)
            }
        )
    }
};

const mutations = {
    setComunales(state, comunales) {
        state.comunales = comunales;
    },
    addComunal(state, comunal) {
        state.comunales.push(comunal);
    }
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};