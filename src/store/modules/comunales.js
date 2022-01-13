import {
    comunalService
} from '../../_services';

const state = {
    comunales: [],
}

const getters = {

};

const actions = {
    getComunales({
        commit
    }) {
        comunalService.getComunales().then(
            usuarios => {
                commit('setComunales', usuarios);
            },
            error => {
                console.log(error);
            }
        )
    },
    addComunales({
        commit
    }, datos) {
        return new Promise((resolve, reject) => {
            comunalService.addComunales(datos).then(
                usuario => {
                    commit('addComunales', usuario);
                    resolve(usuario);
                }, err => {
                    reject(err)
                }
            )
        })
    },
    deleteComunal({
        commit
    }, id) {
        comunalService.deleteComunal(id).then(
            () => {
                commit('deleteComunales', id);
            }, error => {
                console.log(error)
            }
        )
    },
    updateComunal({
        commit
    }, payload) {
        return new Promise((resolve, reject) => {
            comunalService.updateComunal(payload).then(
                serenazgo => {
                    commit('updateComunales', serenazgo);
                    resolve(serenazgo);
                }, err => {
                    reject(err)
                }
            )
        })
    },
};

const mutations = {
    setComunales(state, comunales) {
        state.comunales = comunales;
    },
    addComunales(state, comunal) {
        state.comunales.push(comunal);
    },
    deleteComunales(state, id) {
        const ItemIndex = state.comunales.findIndex((p) => p.id == id)
        state.comunales.splice(ItemIndex, 1)
    },
    updateComunales(state, comunal) {
        const ItemIndex = state.comunales.findIndex((p) => p.id == comunal.id)
        Object.assign(state.comunales[ItemIndex], comunal)
    },
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};