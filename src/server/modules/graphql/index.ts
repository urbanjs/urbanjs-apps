import { ContainerModule } from 'inversify';
import { UserResolver, User, resolversFactory } from './resolvers';
import { typeDefs } from './typeDefs';
import {
  TYPE_GRAPHQL_RESOLVERS_FACTORY,
  GraphqlResolversFactory,
  TYPE_GRAPHQL_TYPE_DEFS,
  GraphqlTypeDefs,
  IGraphqlResolver, TYPE_GRAPHQL_RESOLVER
} from './types';

export const graphqlModule = new ContainerModule((bind) => {
  bind<GraphqlTypeDefs>(TYPE_GRAPHQL_TYPE_DEFS).toConstantValue(typeDefs);
  bind<GraphqlResolversFactory>(TYPE_GRAPHQL_RESOLVERS_FACTORY).toFactory(resolversFactory);

  bind<IGraphqlResolver<User>>(TYPE_GRAPHQL_RESOLVER).to(UserResolver).whenTargetNamed('user');
});
