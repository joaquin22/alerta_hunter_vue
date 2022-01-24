// import config from 'config';

/* eslint-disable */
import {
    apiUrl
} from '../constants/config'

export const noticiasService = {
    getNoticias,
    addNoticia,
    deleteNoticia,
    updateNoticia
};

function getNoticias() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    return fetch(`${apiUrl}/noticias/`, requestOptions)
        .then(handleResponse)
        .then(noticias => {
            return noticias;
        })
}

function addNoticia(datos) {
    const requestOptions = {
        method: 'POST',
        body: datos
    };

    return fetch(`${apiUrl}/noticias/`, requestOptions)
        .then(handleResponse)
        .then(noticia => {
            return noticia;
        })
}

function deleteNoticia(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    return fetch(`${apiUrl}/noticias/${id}/`, requestOptions)
        .then(handleResponse)
        .then(noticia => {
            return noticia;
        })
}

function updateNoticia(payload) {
    const requestOptions = {
        method: 'PATCH',
        body: payload.datos
    };

    return fetch(`${apiUrl}/noticias/${payload.id}/`, requestOptions)
        .then(handleResponse)
        .then(noticia => {
            return noticia;
        })
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}