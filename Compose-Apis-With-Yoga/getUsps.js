const fetch = require('node-fetch');
const {getUspsRequest} = require('./common-headers');

module.exports = async (zipcode) => {
    const api = `https://tools.usps.com`;
    const url = `${api}/tools/app/ziplookup/cityByZip`;
    const payload = {"body": `zip=${zipcode}`};

    const params = getUspsRequest(payload);

    return await fetch(url, params)
        .then(response => response.json());
};