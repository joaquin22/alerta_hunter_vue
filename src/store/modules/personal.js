import {
    personalService
} from '../../_services';

const state = {
    personal: [],
}

const getters = {

};

const actions = {
    getPersonal({
        commit
    }) {
        personalService.getPersonal().then(
            personal => {
                commit('setPersonal', personal);
            },
            error => {
                console.log(error);
            }
        )
    },
    addPersonal({
        commit
    }, datos) {
        personalService.addPersonal(datos).then(
            personal => {
                commit('addPersonal', personal);
            },
            error => {
                console.log(error);
            }
        )
    },
    updatePersonal({
        commit
    }, payload) {
        personalService.updatePersonal(payload).then(
            personal => {
                commit('updatePersonal', personal);
            },
            error => {
                console.log(error);
            }
        )
    },
    deletePersonal({
        commit
    }, id) {
        personalService.deletePersonal(id).then(
            () => {
                commit('deletePersonal', id);
            },
            error => {
                console.log(error);
            }
        )
    },

};

const mutations = {
    setPersonal(state, personal) {
        state.personal = personal;
    },
    addPersonal(state, personal) {
        state.personal.push(personal);
    },
    updatePersonal(state, personal) {
        const ItemIndex = state.personal.findIndex((p) => p.id == personal.id)
        Object.assign(state.personal[ItemIndex], personal)
    },
    deletePersonal(state, id) {
        const ItemIndex = state.personal.findIndex((p) => p.id == id)
        state.personal.splice(ItemIndex, 1)
    },
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};