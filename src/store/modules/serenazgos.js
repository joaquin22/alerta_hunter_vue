import {
    serenazgoService
} from '../../_services';

const state = {
    serenazgos: [],
}

const getters = {};

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
        return new Promise((resolve, reject) => {
            serenazgoService.addSerenazgo(datos).then(
                usuario => {
                    commit('addSerenazgo', usuario);
                    resolve(usuario);
                }, err => {
                    reject(err)
                }
            )
        })
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
        return new Promise((resolve, reject) => {
            serenazgoService.updateSerenazgo(payload).then(
                serenazgo => {
                    commit('updateSerenazgo', serenazgo);
                    resolve(serenazgo);
                }, err => {
                    reject(err)
                }
            )
        })
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