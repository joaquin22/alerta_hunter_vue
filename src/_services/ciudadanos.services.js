// import config from 'config';

/* eslint-disable */
import {
    apiUrl
} from '../constants/config'

export const ciudadanosService = {
    getCiudadanos,

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

function getCiudadanos(payload) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    return fetch(`${apiUrl}/ciudadanos/?page=${payload.currentPage}&per_page=${payload.perPage}`, requestOptions)
        .then(handleResponse)
        .then(users => {
            // login successful if there's a jwt token in the response
            return users;
        })
}