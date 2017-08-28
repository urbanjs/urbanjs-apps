import { ContainerModule } from 'inversify';
import { typeDefs } from './type-defs';
import { resolverMap } from './resolver-map';
import {
  TYPE_GRAPHQL_TYPE_DEFS,
  TYPE_GRAPHQL_RESOLVER,
  TYPE_GRAPHQL_RESOLVER_MAP,
  GraphqlTypeDefs,
  GraphqlResolverMap,
  IGraphqlResolver
} from './types';
import { UserResolver } from './resolvers';

export const graphqlModule = new ContainerModule((bind) => {
  bind<GraphqlTypeDefs>(TYPE_GRAPHQL_TYPE_DEFS).toConstantValue(typeDefs);
  bind<GraphqlResolverMap>(TYPE_GRAPHQL_RESOLVER_MAP).toDynamicValue(resolverMap);

  bind<IGraphqlResolver>(TYPE_GRAPHQL_RESOLVER).to(UserResolver);
});
