const { GraphQLServer } = require('graphql-yoga')
const getUsps = require('./apis/getUsps');
const getWeather = require('./apis/getWeather');
const getRepresentatives = require('./apis/getRepresentatives');

const resolvers = {
    Query: {
        lookup: async (_, { zipcode }) => {
            return {
                usps: getUsps(zipcode), 
                weather: getWeather(zipcode), 
                reps: getRepresentatives(zipcode)
            };
        },
    },
};

const typeDefs = `
  scalar ZipCodeResult
  scalar WeatherResult
  scalar RepresentativesResult

  type ResultSet {
      usps: ZipCodeResult,
      weather: WeatherResult
      reps: [RepresentativesResult]
  }

  type Query {
      lookup(zipcode: String): ResultSet
  }
`;
 
const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'));