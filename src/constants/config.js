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
    url = "https://alertahunter.herokuapp.com/API"
} else {
    url = "http://localhost:8001/API"
}

export const apiUrl = url;