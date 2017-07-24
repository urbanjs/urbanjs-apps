import {
  ExpressRouterFactory,
  GraphQLSchema,
  GraphqlExpressMiddlewareFactory,
  GraphiqlExpressMiddlewareFactory
} from '../../../types';

export type GraphQLRouterConfig = {
  schema: GraphQLSchema;
  enableGraphQLEditor: boolean;
  routerFactory: ExpressRouterFactory;
  graphqlMiddlewareFactory: GraphqlExpressMiddlewareFactory;
  graphiqlMiddlewareFactory: GraphiqlExpressMiddlewareFactory;
};

export function createGraphQLRouter({
                                      enableGraphQLEditor,
                                      schema,
                                      routerFactory,
                                      graphqlMiddlewareFactory,
                                      graphiqlMiddlewareFactory
                                    }: GraphQLRouterConfig) {
  const router = routerFactory();

  router.post('/graphql', graphqlMiddlewareFactory({schema}));

  if (enableGraphQLEditor) {
    router.get('/graphiql', graphiqlMiddlewareFactory({endpointURL: '/graphql'}));
  }

  return router;
}
