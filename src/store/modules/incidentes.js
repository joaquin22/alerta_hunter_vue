import {
    incidenteService
} from '../../_services';

const state = {
    tipoIncidentes: [],
    incidentes: []
}

const getters = {

};

const actions = {
    getTipoIncidentes({
        commit
    }) {
        incidenteService.getTipoIncidentes().then(
            tipos => {
                commit('setTipoIncidentes', tipos);

            },
            error => {
                console.log(error);
            }
        )
    },
    addTipoIncidentes({
        commit
    }, datos) {
        incidenteService.addTipoIncidentes(datos).then(
            tipo => {
                commit('addTipoIncidente', tipo);
            },
            error => {
                console.log(error);
            }
        )
    },
    updateTipoIncidentes({
        commit
    }, payload) {
        incidenteService.updateTipoIncidentes(payload).then(
            tipo => {
                commit('updateTipoIncidentes', tipo);
            },
            error => {
                console.log(error);
            }
        )
    },
    deleteTipoIncidentes({
        commit
    }, id) {
        incidenteService.deleteTipoIncidentes(id).then(
            () => {
                commit('deleteTipoIncidente', id);
            },
            error => {
                console.log(error);
            }
        )
    },
    updateIncidentes(_, payload) {
        incidenteService.updateIncidentes(payload)
    },
    imagenIncidentes(_, payload) {
        incidenteService.imagenIncidentes(payload)
    },
    getIncidentes({
        commit
    }) {
        incidenteService.getIncidentes().then(
            incidentes => {
                commit('setIncidentes', incidentes);
            },
            error => {
                console.log(error);
            }
        )
    },
    addIncidente(_, datos) {
        incidenteService.addIncidente(datos)

    },
};

const mutations = {
    setTipoIncidentes(state, tipos) {
        state.tipoIncidentes = tipos;
    },
    addTipoIncidente(state, tipo) {
        state.tipoIncidentes.push(tipo);
    },
    updateTipoIncidentes(state, tipo) {
        const ItemIndex = state.tipoIncidentes.findIndex((p) => p.id == tipo.id)
        Object.assign(state.tipoIncidentes[ItemIndex], tipo)
    },
    deleteTipoIncidente(state, id) {
        const ItemIndex = state.tipoIncidentes.findIndex((p) => p.id == id)
        state.tipoIncidentes.splice(ItemIndex, 1)
    },
    setIncidentes(state, incidentes) {
        state.incidentes = incidentes
    }
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};