import {
    unidadService
} from '../../_services';

const state = {
    unidad: [],
}

const getters = {
    getUnidad: state => (Id) => state.unidad.find((event) => event.id == Id),
};

const actions = {
    getUnidad({
        commit
    }) {
        unidadService.getUnidad().then(
            Unidad => {
                commit('setUnidad', Unidad);
            },
            error => {
                console.log(error);
            }
        )
    },
    addUnidad({
        commit
    }, datos) {
        unidadService.addUnidad(datos).then(
            Unidad => {
                commit('addUnidad', Unidad);
            },
            error => {
                console.log(error);
            }
        )
    },
    updateUnidad({
        commit
    }, payload) {
        unidadService.updateUnidad(payload).then(
            Unidad => {
                commit('updateUnidad', Unidad);
            },
            error => {
                console.log(error);
            }
        )
    },
    deleteUnidad({
        commit
    }, id) {
        unidadService.deleteUnidad(id).then(
            () => {
                commit('deleteUnidad', id);
            },
            error => {
                console.log(error);
            }
        )
    },

};

const mutations = {
    setUnidad(state, unidad) {
        state.unidad = unidad;
    },
    addUnidad(state, unidad) {
        state.unidad.push(unidad);
    },
    updateUnidad(state, unidad) {
        const ItemIndex = state.unidad.findIndex((p) => p.id == unidad.id)
        Object.assign(state.unidad[ItemIndex], unidad)
    },
    deleteUnidad(state, id) {
        const ItemIndex = state.unidad.findIndex((p) => p.id == id)
        state.unidad.splice(ItemIndex, 1)
    },
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};