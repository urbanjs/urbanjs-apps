import { Router, Request } from 'express';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { makeExecutableSchema, addErrorLoggingToSchema } from 'graphql-tools';
import { PATH_GRAPHQL, PATH_GRAPHQL_PLAYGROUND } from '../../../../constants';
import {
  GraphqlTypeDefs,
  GraphqlResolverMap,
  GraphqlResolverContext,
  GraphqlRootValue
} from '../../../graphql/types';
import { ILoggerService } from '../../../log/types';

export type GraphqlRouterConfig = {
  devMode: boolean;
  enableGraphQLEditor: boolean;
  graphqlResolvers: GraphqlResolverMap;
  graphqlTypeDefs: GraphqlTypeDefs;
  loggerService: ILoggerService;
};

export function createGraphqlRouter({
                                      devMode,
                                      graphqlTypeDefs,
                                      graphqlResolvers,
                                      enableGraphQLEditor,
                                      loggerService
                                    }: GraphqlRouterConfig) {
  const router = Router();
  const schema = makeExecutableSchema({
    typeDefs: graphqlTypeDefs,
    resolvers: graphqlResolvers,
    allowUndefinedInResolve: !devMode
  });

  addErrorLoggingToSchema(
    schema,
    {log: (e: Error) => loggerService.error(e.stack)}
  );

  router.post(PATH_GRAPHQL, graphqlExpress((req: Request & { user?: { id: string } }) => ({
    schema,
    rootValue: null as GraphqlRootValue,
    context: {
      authenticatedUserId: req.user && req.user.id || null
    } as GraphqlResolverContext,
    debug: devMode
    // logFunction: message => loggerService.debug(message)
  })));

  if (enableGraphQLEditor) {
    router.get(PATH_GRAPHQL_PLAYGROUND, graphiqlExpress({
      endpointURL: PATH_GRAPHQL
    }));
  }

  return router;
}
