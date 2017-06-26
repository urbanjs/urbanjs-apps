'use strict';

const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');

const typeDefs = `
type Todo {
  id: ID!
  description: String
}

type Query {
  todos: [Todo]
}
`;

const mocks = {
  Query: () => ({
    todos: () => [
      { description: 'Task A' },
      { description: 'Task B' }
    ]
  })
};

const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({ schema, mocks });

module.exports = schema;
