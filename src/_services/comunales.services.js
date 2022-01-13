// import config from 'config';

/* eslint-disable */
import {
    apiUrl
} from '../constants/config'

export const comunalService = {
    getComunales,
    addComunales,
    deleteComunal,
    updateComunal
};


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }
            const error = data || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

function getComunales() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    return fetch(`${apiUrl}/comunales/`, requestOptions)
        .then(handleResponse)
        .then(users => {
            // login successful if there's a jwt token in the response
            return users;
        })
}

function addComunales(datos) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    };

    return fetch(`${apiUrl}/comunales/`, requestOptions)
        .then(handleResponse)
        .then(users => {
            // login successful if there's a jwt token in the response
            return users;
        })
}


function deleteComunal(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    return fetch(`${apiUrl}/comunales/${id}/`, requestOptions)
        .then(handleResponse)
        .then(users => {
            // login successful if there's a jwt token in the response
            return users;
        })
}

function updateComunal(payload) {
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload.datos)
    };
    return fetch(`${apiUrl}/comunales/${payload.id}/`, requestOptions)
        .then(handleResponse)
        .then(users => {
            // login successful if there's a jwt token in the response
            return users;
        })
}