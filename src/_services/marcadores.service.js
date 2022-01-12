/* eslint-disable */
import {
    apiUrl,
} from '../constants/config'


const requestOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
};

export const marcadoresService = {
    getMarcadores,
    addMarcador,
    updateMarcador,
    deleteMarcador,
    getTipoMarcador,
    addTipoMarcador
};

function getMarcadores() {
    return fetch(`${apiUrl}/marcadores/`, requestOptions)
        .then(handleResponse)
        .then(marcadores => {
            return marcadores;
        })
}

function addMarcador(datos) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    };

    return fetch(`${apiUrl}/marcadores/`, requestOptions)
        .then(handleResponse)
        .then(marcador => {
            return marcador;
        })
}

function deleteMarcador(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    return fetch(`${apiUrl}/marcadores/${id}/`, requestOptions)
        .then(handleResponse)
        .then(marcador => {
            return marcador;
        })
}


function updateMarcador(payload) {
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload.datos)
    };


    return fetch(`${apiUrl}/marcadores/${payload.id}/`, requestOptions)
        .then(handleResponse)
        .then(marcador => {
            return marcador;
        })
}

function getTipoMarcador() {
    return fetch(`${apiUrl}/marcadores/tipos/`, requestOptions)
        .then(handleResponse)
        .then(tipos => {
            return tipos;
        })
}

function addTipoMarcador(payload) {
    const requestOptionsFormData = {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data;boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL'
        },
        body: payload
    };

    return fetch(`${apiUrl}/marcadores/tipos/crear/`, requestOptionsFormData)
        .then(handleResponse)
        .then(tipos => {
            return tipos;
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