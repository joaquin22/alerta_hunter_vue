import {
    marcadoresService
} from '../../_services';


const state = {
    marcadores: [],
    tipos: []
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
    addMarcador({
        commit
    }, datos) {
        marcadoresService.addMarcador(datos).then(
            marcador => {
                commit('addMarcador', marcador);
            }
        )
    },
    updateMarcador({
        commit
    }, id, datos) {
        marcadoresService.updateMarcador(id, datos).then(
            marcador => {
                commit('updateMarcador', marcador);
            }
        )
    },

    deleteMarcador({
        commit
    }, id) {
        marcadoresService.deleteMarcador(id).then(
            () => {
                commit('deleteMarcador', id);
            }
        )
    },
    // TIPOS DE MARCADORES
    getTipoMarcadores({
        commit
    }) {
        marcadoresService.getTipoMarcador().then(
            tipos => {
                commit('setTipoMarcadores', tipos);
            },
            error => {
                console.log(error);
            }
        )
    },
    addTipoMarcadores({
        commit
    }, datos) {
        marcadoresService.addTipoMarcador(datos).then(
            tipo => {
                commit('addTipoMarcador', tipo);
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
    addMarcador(state, marcador) {
        state.marcadores.push(marcador);
    },
    deleteMarcador(state, id) {
        const ItemIndex = state.marcadores.findIndex((p) => p.id == id)
        state.marcadores.splice(ItemIndex, 1)
    },
    updateMarcador(state, marcador) {
        const ItemIndex = state.marcadores.findIndex((p) => p.id == marcador.id)
        Object.assign(state.marcadores[ItemIndex], marcador)
    },
    setTipoMarcadores(state, tipos) {
        state.tipos = tipos;
    },
    addTipoMarcador(state, tipo) {
        state.tipos.push(tipo);
    },
};



export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};