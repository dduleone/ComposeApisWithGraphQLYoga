const getUsps = require('../apis/getUsps');
const {argv} = process;
const zipcode = argv[2] || '08901';
(async () => {
    console.log(await getUsps(zipcode));
})();
