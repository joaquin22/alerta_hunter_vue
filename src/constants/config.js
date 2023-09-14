export const defaultLocale = "en";
export const localeOptions = [{
    id: 'en',
    name: 'English'
},
{
    id: 'es',
    name: 'Español'
},
];

let url = ""
if (process.env.NODE_ENV == "production") {
    url = "https://www.hunterseguro.com/API"
} else {
    url = "http://localhost:8000/API"
}

export const apiUrl = url;

export const usuario = localStorage.getItem("user") != null ?
    JSON.parse(localStorage.getItem("user")) :
    null;

export const token = JSON.parse(localStorage.getItem("token"));