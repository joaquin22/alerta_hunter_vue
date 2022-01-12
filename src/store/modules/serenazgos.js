import {
    serenazgoService
} from '../../_services';

const state = {
    serenazgos: [],
}

const getters = {
    serenazgoDuplicado: (state) => (obj) => {

        const user = state.serenazgos.find((v) => v.username == obj.username && v.id != obj.id)
        if (user) return true;
        else return false
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
                console.log(error)
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
                console.log(error)
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
    },
    deleteSerenazgo(state, id) {
        const ItemIndex = state.serenazgos.findIndex((p) => p.id == id)
        state.serenazgos.splice(ItemIndex, 1)
    },
    updateSerenazgo(state, serenazgo) {
        const ItemIndex = state.serenazgos.findIndex((p) => p.id == serenazgo.id)
        Object.assign(state.serenazgos[ItemIndex], serenazgo)
    },
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};