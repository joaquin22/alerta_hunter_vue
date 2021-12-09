import {
    incidenteService
} from '../../_services';

const state = {
    incidentes: [],
}

const getters = {

};

const actions = {
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
    addIncidente({
        commit
    }, datos) {
        incidenteService.addIncidente(datos).then(
            incidente => {
                commit('addIncidente', incidente);
            }, error => {
                console.log(error)
            }
        )
    },
};

const mutations = {
    setIncidentes(state, incidentes) {
        state.incidentes = incidentes;
    },
    addIncidente(state, incidente) {
        state.incidentes.push(incidente);
    },
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};