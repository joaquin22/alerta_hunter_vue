import {
    marcadoresService
} from '../../_services';


const state = {
    marcadores: [],
}

const getters = {

};

const actions = {

    getMarcadores({
        commit
    }) {
        marcadoresService.getMarcadores().then(
            marcadores => {
                commit('setMarcadores', marcadores);
            },
            error => {
                console.log(error);
            }
        )
    },

};
const mutations = {
    setMarcadores(state, marcadores) {
        state.marcadores = marcadores;
    },
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};