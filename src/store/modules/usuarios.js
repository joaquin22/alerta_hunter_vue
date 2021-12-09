import {
    userService
} from '../../_services';

const state = {
    serenazgos: [],
    comunales: []
}

const getters = {

};

const actions = {
    getSerenazgo({
        commit
    }) {
        userService.getSerenazgo().then(
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
        userService.addSerenazgo(datos).then(
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
        userService.deleteSerenazgo(id).then(
            () => {
                commit('deleteSerenazgo', id);
            }, error => {
                console.log(error)
            }
        )
    },
    getComunales({
        commit
    }) {
        userService.getComunales().then(
            usuarios => {
                commit('setComunales', usuarios);
            },
            error => {
                console.log(error);
            }
        )
    },
    addComunal({
        commit
    }, datos) {
        userService.addComunal(datos).then(
            usuario => {
                commit('addComunal', usuario);
            }, error => {
                console.log(error)
            }
        )
    }
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
    setComunales(state, comunales) {
        state.comunales = comunales;
    },
    addComunal(state, comunal) {
        state.comunales.push(comunal);
    }
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};