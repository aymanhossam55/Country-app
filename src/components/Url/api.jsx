const API_BASE_URL = "https://api.restcountries.com/countries/v5";

const API_KEY = import.meta.env.VITE_REST_COUNTRIES_API_KEY;

export const apiURL = API_BASE_URL;

export const apiHeaders = API_KEY
    ? {
        Authorization: `Bearer ${API_KEY}`,
    }
    : {};