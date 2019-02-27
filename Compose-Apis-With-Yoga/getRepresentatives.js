const fetch = require('node-fetch');
const {getRepresentativesRequest} = require('./common-headers');

module.exports = async (zipcode) => {
    const api = `https://whoismyrepresentative.com`;
    const url = `${api}/getall_mems.php?zip=${zipcode}&output=json`;
    
    const params = getRepresentativesRequest();
    
    return await fetch(url, params)
        .then(response => response.json())
        .then(response => response.results);
};