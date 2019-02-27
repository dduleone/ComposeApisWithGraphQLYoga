const getUsps = require('../apis/getUsps');
const getWeather = require('../apis/getWeather');
const getRepresentatives = require('../apis/getRepresentatives');

module.exports = {
    Query: {
        lookup: async (_, { zipcode }) => {
            const usps = getUsps(zipcode);
            const weather = getWeather(zipcode);
            const reps = getRepresentatives(zipcode);
            return {usps, weather, reps};
        },
    },
}