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

    return fetch(`${apiUrl}/login/web/`, requestOptions)
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

            return user.user;
        })
}


function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('token');
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            // if (response.status === 401) {
            //     // auto logout if 401 response returned from api
            //     logout();
            //     location.reload(true);
            // }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}