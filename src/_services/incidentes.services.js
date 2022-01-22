// import config from 'config';

/* eslint-disable */
import {
    apiUrl
} from '../constants/config'

export const incidenteService = {
    getTipoIncidentes,
    addTipoIncidentes,
    deleteTipoIncidentes,
    updateTipoIncidentes,
    updateIncidentes,
    getIncidentes,
    addIncidente
};

function getTipoIncidentes() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    return fetch(`${apiUrl}/incidentes/tipos/`, requestOptions)
        .then(handleResponse)
        .then(tipos => {
            return tipos;
        })
}

function addTipoIncidentes(datos) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    };

    return fetch(`${apiUrl}/incidentes/tipos/`, requestOptions)
        .then(handleResponse)
        .then(tipos => {
            return tipos;
        })
}

function deleteTipoIncidentes(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    return fetch(`${apiUrl}/incidentes/tipos/${id}/`, requestOptions)
        .then(handleResponse)
        .then(tipos => {
            return tipos;
        })
}

function updateTipoIncidentes(payload) {
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload.datos)
    };

    return fetch(`${apiUrl}/incidentes/tipos/${payload.id}/`, requestOptions)
        .then(handleResponse)
        .then(tipos => {
            return tipos;
        })
}

function updateIncidentes(payload) {
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload.datos)
    };

    return fetch(`${apiUrl}/incidentes/${payload.id}/`, requestOptions)
        .then(handleResponse)
        .then(tipos => {
            return tipos;
        })
}

function getIncidentes(payload) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    return fetch(`${apiUrl}/incidentes/`, requestOptions)
        .then(handleResponse)
        .then(incidentes => {
            return incidentes;
        })
}

function addIncidente(datos) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    };

    return fetch(`${apiUrl}/incidentes/web/`, requestOptions)
        .then(handleResponse)
        .then(incidentes => {
            return incidentes;
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