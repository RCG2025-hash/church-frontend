import axios from "axios";

const API = axios.create({

    baseURL: import.meta.env.VITE_API_URL,

    headers: {

        "Content-Type": "application/json",

    },

});

/*
=========================================
Attach JWT automatically
=========================================
*/

API.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem("token");

        if (token) {

            config.headers.Authorization = `Bearer ${token}`;

        }

        return config;

    },

    (error) => Promise.reject(error)

);

/*
=========================================
Handle expired token
=========================================
*/

API.interceptors.response.use(

    (response) => response,

    (error) => {

        if (error.response?.status === 401 ||
            error.response?.status === 403) {

            localStorage.removeItem("token");

            window.location.href = "/adminlogin";

        }

        return Promise.reject(error);

    }

);

export default API;