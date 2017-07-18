import {makeExecutableSchema, addMockFunctionsToSchema} from 'graphql-tools';
import {GraphQLEmail, GraphQLDateTime} from 'graphql-custom-types';
import {mocks} from './mocks';
import {typeDefs} from './typedefs';

const resolvers = {
  Email: GraphQLEmail,
  Date: GraphQLDateTime
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

addMockFunctionsToSchema({
  schema,
  mocks
});

module.exports = schema;
