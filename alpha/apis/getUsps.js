const fetch = require('node-fetch');
module.exports = async (zipcode) => {
    const url = "https://tools.usps.com/tools/app/ziplookup/cityByZip";

    const params = {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        "body": `zip=${zipcode}`,
        "method": "POST",
    };

    return await fetch(url, params)
        .then(response => response.json());
};