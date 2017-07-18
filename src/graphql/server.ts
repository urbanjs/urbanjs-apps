import {graphqlExpress, graphiqlExpress} from 'graphql-server-express';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import {NextFunction, Request, Response} from 'express';
import * as cors from 'cors';

const app = express();

app.use(cors());

app.use('/graphql', bodyParser.json(), (req: Request, res: Response, next: NextFunction) => {
  Object.keys(require.cache).forEach(absPath => {
    if (absPath.startsWith(__dirname)) {
      delete require.cache[absPath];
    }
  });

  const schema = require('./schema.ts');
  graphqlExpress({schema})(req, res, next);
});

app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));

const GRAPHQL_PORT = 3001;
app.listen(GRAPHQL_PORT, () => console.info(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
));
