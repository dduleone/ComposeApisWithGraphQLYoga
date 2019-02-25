const { GraphQLServer } = require('graphql-yoga')
// const typeDefs = require('./types/TypeDefsFull.gql');
const typeDefs = require('./types/TypeDefsLazy.gql');
const resolvers = require('./resolvers');
 
const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))
