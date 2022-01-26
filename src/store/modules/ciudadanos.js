import {
    ciudadanosService
} from '../../_services';

const state = {
    ciudadanos: [],
}

const getters = {

};

const actions = {
    getCiudadanos({
        commit
    }, payload) {
        ciudadanosService.getCiudadanos(payload).then(
            ciudadanos => {
                commit('setCiudadanos', ciudadanos);
            },
            error => {
                console.log(error);
            }
        )
    },
    updateCiudadanos(_, payload) {
        return new Promise((resolve, reject) => {
            ciudadanosService.updateCiudadanos(payload).then(
                ciudadanos => {
                    resolve(ciudadanos);
                }, err => {
                    reject(err);
                }
            )
        })

    },

};

const mutations = {
    setCiudadanos(state, ciudadanos) {
        state.ciudadanos = ciudadanos;
    },
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};