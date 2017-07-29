import { Router, Request } from 'express';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { makeExecutableSchema, addErrorLoggingToSchema } from 'graphql-tools';
import { join } from 'path';
import { GraphqlTypeDefs, GraphqlResolvers, GraphqlResolverContext } from '../../../graphql/types';
import { ILoggerService } from '../../../log/types';

export type GraphqlRouterConfig = {
  devMode: boolean;
  routerPrefix: string;
  enableGraphQLEditor: boolean;
  graphqlResolvers: GraphqlResolvers;
  graphqlTypeDefs: GraphqlTypeDefs;
  loggerService: ILoggerService;
};

export function createGraphqlRouter({
                                      devMode,
                                      graphqlTypeDefs,
                                      graphqlResolvers,
                                      enableGraphQLEditor,
                                      routerPrefix,
                                      loggerService
                                    }: GraphqlRouterConfig) {
  const router = Router();
  const schema = makeExecutableSchema({
    typeDefs: graphqlTypeDefs,
    resolvers: graphqlResolvers
  });

  addErrorLoggingToSchema(
    schema,
    {log: (e: Error) => loggerService.error(e.stack)}
  );

  router.post('/', graphqlExpress((req: Request & { user?: object }) => ({
    schema,
    rootValue: {},
    context: {
      user: req.user || null
    } as GraphqlResolverContext,
    debug: devMode
    // logFunction: message => loggerService.debug(message)
  })));

  if (enableGraphQLEditor) {
    router.get('/playground', graphiqlExpress({
      endpointURL: join('/', routerPrefix, '/')
    }));
  }

  return router;
}
