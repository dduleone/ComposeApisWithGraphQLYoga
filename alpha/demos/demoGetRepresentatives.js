const getRepresentatives = require('../apis/getRepresentatives');
const {argv} = process;
const zipcode = argv[2] || '08901';
(async () => {
    console.log(await getRepresentatives(zipcode));
})();
