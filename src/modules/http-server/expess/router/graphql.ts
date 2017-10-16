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
import { SessionTokenPayload } from '../passport';

export type GraphqlRouterConfig = {
  includeInnerError: boolean;
  enableGraphQLEditor: boolean;
  graphqlResolvers: GraphqlResolverMap;
  graphqlTypeDefs: GraphqlTypeDefs;
  loggerService: ILoggerService;
  errorService: IErrorService;
};

export function createGraphqlRouter({
                                      includeInnerError,
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
    allowUndefinedInResolve: false
  });

  addErrorLoggingToSchema(
    schema,
    {log: (e: Error) => loggerService.error(e.stack)}
  );

  router.post(PATH_GRAPHQL, graphqlExpress((req: Request & { user?: SessionTokenPayload }) => ({
    schema,
    rootValue: null as GraphqlRootValue,
    context: {
      authenticatedUserId: req.user && req.user.userId || null
    } as GraphqlResolverContext,
    debug: false,
    formatError(error: GraphQLError) {
      const {locations, path} = error;
      const httpError = errorService.createHttpError(error.originalError || error);
      return {
        ...httpError.toResponse(includeInnerError),
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
