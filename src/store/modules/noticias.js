import {
    noticiasService
} from '../../_services';

const state = {
    noticias: [],
}

const getters = {

};

const actions = {
    getNoticias({
        commit
    }) {
        noticiasService.getNoticias().then(
            noticias => {
                commit('setNoticias', noticias);
            },
            error => {
                console.log(error);
            }
        )
    },
    addNoticia({
        commit
    }, datos) {
        noticiasService.addNoticia(datos).then(
            noticia => {
                commit('addNoticia', noticia);
            },
            error => {
                console.log(error);
            }
        )
    },
    updateNoticia({
        commit
    }, payload) {
        noticiasService.updateNoticia(payload).then(
            noticia => {
                commit('updateNoticia', noticia);
            },
            error => {
                console.log(error);
            }
        )
    },
    deleteNoticia({
        commit
    }, id) {
        noticiasService.deleteNoticia(id).then(
            () => {
                commit('deleteNoticia', id);
            },
            error => {
                console.log(error);
            }
        )
    },

};

const mutations = {
    setNoticias(state, noticias) {
        state.noticias = noticias;
    },
    addNoticia(state, noticia) {
        state.noticias.push(noticia);
    },
    updateNoticia(state, noticia) {
        const ItemIndex = state.noticias.findIndex((p) => p.id == noticia.id)
        Object.assign(state.noticias[ItemIndex], noticia)
    },
    deleteNoticia(state, id) {
        const ItemIndex = state.noticias.findIndex((p) => p.id == id)
        state.noticias.splice(ItemIndex, 1)
    },
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};