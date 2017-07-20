import {graphqlExpress, graphiqlExpress} from 'graphql-server-express';
import * as bodyParser from 'body-parser';
import {NextFunction, Request, Response, Router} from 'express';
import {schema} from './schema';

export type ApolloRouterConfig = {
  devMode: boolean;
};

export function createApolloRouter({devMode}: ApolloRouterConfig) {
  const router = Router();

  router.post('/graphql', bodyParser.json(), (req: Request, res: Response, next: NextFunction) => {
    graphqlExpress({schema})(req, res, next);
  });

  if (devMode) {
    router.get('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
  }

  return router;
}
