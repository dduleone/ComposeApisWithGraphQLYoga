const getWeather = require('../apis/getWeather');
const {argv} = process;
const zipcode = argv[2] || '08901';
(async () => {
    console.log(await getWeather(zipcode));
})();
