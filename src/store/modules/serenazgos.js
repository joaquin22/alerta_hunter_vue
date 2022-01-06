import {
    serenazgoService
} from '../../_services';

const state = {
    serenazgos: [],
    error: null,
    hasError: false
}

const getters = {
    getError: (state) => {
        return state.error
    }

};

const actions = {
    getSerenazgos({
        commit
    }) {
        serenazgoService.getSerenazgos().then(
            usuarios => {
                commit('setSerenazgos', usuarios);
            },
            error => {
                console.log(error);
            }
        )
    },
    addSerenazgo({
        commit
    }, datos) {
        serenazgoService.addSerenazgo(datos).then(
            usuario => {
                commit('addSerenazgo', usuario);
            }, error => {
                commit('setError', error)
            }
        )
    },
    deleteSerenazgo({
        commit
    }, id) {
        serenazgoService.deleteSerenazgo(id).then(
            () => {
                commit('deleteSerenazgo', id);
            }, error => {
                console.log(error)
            }
        )
    },
    updateSerenazgo({
        commit
    }, payload) {
        serenazgoService.updateSerenazgo(payload).then(
            serenazgo => {
                commit('updateSerenazgo', serenazgo);
            }, error => {
                commit('setError', error)
            }
        )
    },
};

const mutations = {
    setSerenazgos(state, serenazgos) {
        state.serenazgos = serenazgos;
    },
    addSerenazgo(state, serenazgo) {
        state.serenazgos.push(serenazgo);
        state.error = null;
        state.hasError = false;
    },
    deleteSerenazgo(state, id) {
        const ItemIndex = state.serenazgos.findIndex((p) => p.id == id)
        state.serenazgos.splice(ItemIndex, 1)
    },
    updateSerenazgo(state, serenazgo) {
        const ItemIndex = state.serenazgos.findIndex((p) => p.id == serenazgo.id)
        Object.assign(state.serenazgos[ItemIndex], serenazgo)
        state.error = null;
    },
    setError(state, error) {
        state.error = error;
        state.hasError = true;
    }
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};