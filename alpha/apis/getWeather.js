const fetch = require('node-fetch');
module.exports = async (zipcode) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=${zipcode},us&apikey=cdb2fb4e56b8b57bf6ed15af4cfa295f`;

    const params = {
        "headers": {"accept": "application/json, text/javascript, */*; q=0.01"},
        "method": "GET",
    };

    return await fetch(url, params)
        .then(response => response.json());
};