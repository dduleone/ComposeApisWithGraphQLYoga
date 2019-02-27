const { GraphQLServer } = require('graphql-yoga')

/* Resolver Definitions */
const resolvers = {/* ... */}; 

/* Type Definitions */
const typeDefs = `
    /* ... */
`;

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))