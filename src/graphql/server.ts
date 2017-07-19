import {graphqlExpress, graphiqlExpress} from 'graphql-server-express';
import * as bodyParser from 'body-parser';
import {NextFunction, Request, Response, Application} from 'express';

export function addGraphqlMiddleware(app: Application) {
  app.use('/graphql', bodyParser.json(), (req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV !== 'production') {
      Object.keys(require.cache).forEach(absPath => {
        if (absPath.startsWith(__dirname)) {
          delete require.cache[absPath];
        }
      });
    }

    const schema = require('./schema');
    graphqlExpress({schema})(req, res, next);
  });

  if (process.env.NODE_ENV !== 'production') {
    app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
  }
}
