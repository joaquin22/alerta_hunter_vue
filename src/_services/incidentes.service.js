// import config from 'config';

/* eslint-disable */
import {
    apiUrl
} from '../constants/config'

export const incidenteService = {
    getIncidentes,
    addIncidente,
};


function getIncidentes() {
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
    return fetch(`${apiUrl}/incidentes/`, requestOptions)
        .then(handleResponse)
        .then(incidente => {
            return incidente;
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