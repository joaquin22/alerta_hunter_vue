// import config from 'config';

/* eslint-disable */
import {
    authHeader
} from '../_helpers';
import {
    apiUrl
} from '../constants/config'

export const userService = {
    login,
    logout,
    getAll,
    getSerenazgo,
    addSerenazgo,
    deleteSerenazgo,
    getComunales,
    addComunal
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    };

    return fetch(`${apiUrl}/login/`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.access) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                const token = {
                    'acces_token': user.access,
                    'refresh_token': user.refresh
                }
                localStorage.setItem('token', JSON.stringify(token));
                localStorage.setItem('user', JSON.stringify(user.user));
            }

            return user;
        })
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('token');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`http://localhost:8080/users`, requestOptions).then(handleResponse);
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

function getSerenazgo() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    return fetch(`${apiUrl}/usuarios/serenazgo/`, requestOptions)
        .then(handleResponse)
        .then(users => {
            // login successful if there's a jwt token in the response
            return users;
        })
}

function addSerenazgo(datos) {
    console.log(datos)
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    };
    return fetch(`${apiUrl}/usuarios/serenazgo/`, requestOptions)
        .then(handleResponse)
        .then(users => {
            // login successful if there's a jwt token in the response
            return users;
        })
}

function deleteSerenazgo(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    return fetch(`${apiUrl}/usuarios/serenazgo/${id}`, requestOptions)
        .then(handleResponse)
        .then(users => {
            // login successful if there's a jwt token in the response
            return users;
        })
}

function getComunales() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    return fetch(`${apiUrl}/usuarios/comunal/`, requestOptions)
        .then(handleResponse)
        .then(users => {
            // login successful if there's a jwt token in the response
            return users;
        })
}

function addComunal(datos) {
    console.log(datos)
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    };
    return fetch(`${apiUrl}/usuarios/comunal/`, requestOptions)
        .then(handleResponse)
        .then(users => {
            // login successful if there's a jwt token in the response
            return users;
        })
}