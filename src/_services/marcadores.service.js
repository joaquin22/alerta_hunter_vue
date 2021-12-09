/* eslint-disable */
import {
    apiUrl
} from '../constants/config'

const requestOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
};

export const marcadoresService = {
    getMarcadores,
};

function getMarcadores() {
    return fetch(`${apiUrl}/marcadores/`, requestOptions)
        .then(handleResponse)
        .then(marcadores => {
            return marcadores;
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