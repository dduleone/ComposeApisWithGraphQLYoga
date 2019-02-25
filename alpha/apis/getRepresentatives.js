const fetch = require('node-fetch');
module.exports = async (zipcode) => {
    const url = `https://whoismyrepresentative.com/getall_mems.php?zip=${zipcode}&output=json`;
    
    const params = {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
        },
        "method": "GET",
    };
    
    return await fetch(url, params)
        .then(response => response.json())
        .then(response => response.results);
};