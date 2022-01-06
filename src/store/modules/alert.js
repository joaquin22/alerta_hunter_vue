export const alert = {
    namespaced: true,
    state: {
        type: null,
        message: null,
        hasError: false
    },
    getters: {

    },
    actions: {
        success({
            commit
        }, message) {
            commit('success', message);
        },
        error({
            commit
        }, message) {
            commit('error', message);
        },
        clear({
            commit
        }) {
            commit('clear');
        }
    },
    mutations: {
        success(state, message) {
            state.type = 'alert-success';
            state.message = message;
            state.hasError = false;
        },
        error(state, message) {
            state.type = 'alert-danger';
            state.message = message;
            state.hasError = true;
        },
        clear(state) {
            state.type = null;
            state.message = null;
            state.hasError = false;
        }
    }
};