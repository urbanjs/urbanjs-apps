'use strict';

const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use('/graphql', bodyParser.json(), (...args) => {
  // reload the schema per request to apply all the changes
  const schemaPath = './schema';
  delete require.cache[require.resolve(schemaPath)];
  const schema = require(schemaPath);

  return graphqlExpress({ schema })(...args);
});

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

const GRAPHQL_PORT = 3001;
app.listen(GRAPHQL_PORT, () => console.info(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
));
