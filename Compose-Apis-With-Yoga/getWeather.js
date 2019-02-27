const fetch = require('node-fetch');
const {getWeatherRequest} = require('./common-headers');

module.exports = async (zipcode) => {
    const api = `http://api.openweathermap.org`;
    const apikey = `cdb2fb4e56b8b57bf6ed15af4cfa295f`;
    const options = `units=imperial&zip=${zipcode},us`;
    const url = `${api}/data/2.5/weather?apikey=${apikey}&${options}`;

    const params = getWeatherRequest();

    return await fetch(url, params)
        .then(response => response.json());
};