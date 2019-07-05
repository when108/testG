const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('../prisma/generated/prisma-client')
const { Query } = require('./resolvers/Query')
const { Mutation } = require('./resolvers/Mutation')

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers: {Mutation, Query},
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
})

server.start(() => console.log('Server is running on https://localhost:4000')) 
