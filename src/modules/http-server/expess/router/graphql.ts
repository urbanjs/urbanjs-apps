import { Router, Request } from 'express';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { makeExecutableSchema, addErrorLoggingToSchema } from 'graphql-tools';
import { GraphQLError } from 'graphql';
import { PATH_GRAPHQL, PATH_GRAPHQL_PLAYGROUND } from '../../../../constants';
import {
  GraphqlTypeDefs,
  GraphqlResolverMap,
  GraphqlResolverContext,
  GraphqlRootValue
} from '../../../graphql/types';
import { ILoggerService } from '../../../log/types';
import { IErrorService } from '../../../error/types';

export type GraphqlRouterConfig = {
  devMode: boolean;
  enableGraphQLEditor: boolean;
  graphqlResolvers: GraphqlResolverMap;
  graphqlTypeDefs: GraphqlTypeDefs;
  loggerService: ILoggerService;
  errorService: IErrorService;
};

export function createGraphqlRouter({
                                      devMode,
                                      graphqlTypeDefs,
                                      graphqlResolvers,
                                      enableGraphQLEditor,
                                      loggerService,
                                      errorService
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
    debug: devMode,
    formatError(error: GraphQLError) {
      const {locations, path} = error;
      const httpError = errorService.createHttpError(error.originalError || error);
      return {
        ...httpError.toResponse(devMode),
        statusCode: httpError.statusCode,
        locations,
        path
      };
    }
    // logFunction: message => loggerService.debug(message)
  })));

  if (enableGraphQLEditor) {
    router.get(PATH_GRAPHQL_PLAYGROUND, graphiqlExpress({
      endpointURL: PATH_GRAPHQL
    }));
  }

  return router;
}
