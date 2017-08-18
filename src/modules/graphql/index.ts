import { ContainerModule } from 'inversify';
import { typeDefs } from './type-defs';
import { resolverMap } from './resolver-map';
import {
  TYPE_GRAPHQL_TYPE_DEFS,
  TYPE_GRAPHQL_RESOLVER,
  TYPE_GRAPHQL_RESOLVER_MAP,
  RESOLVER_USER,
  RESOLVER_USER_SUBSCRIPTION,
  GraphqlRootValue,
  GraphqlTypeDefs,
  IGraphqlResolver,
  GraphqlResolverMap,
  User,
  UserSubscription,
  UserPersonalInformation,
  RESOLVER_USER_PERSONAL_INFORMATION,
  RESOLVER_UPDATE_USER_PERSONAL_INFORMATION
} from './types';
import {
  UserResolver,
  UserSubscriptionResolver,
  UserPersonalInformationResolver,
  UpdateUserPersonalInformationResolver
} from './resolvers';

export const graphqlModule = new ContainerModule((bind) => {
  bind<GraphqlTypeDefs>(TYPE_GRAPHQL_TYPE_DEFS).toConstantValue(typeDefs);

  bind<IGraphqlResolver<GraphqlRootValue, User>>(TYPE_GRAPHQL_RESOLVER)
    .to(UserResolver)
    .whenTargetNamed(RESOLVER_USER);

  bind<IGraphqlResolver<User, UserSubscription>>(TYPE_GRAPHQL_RESOLVER)
    .to(UserSubscriptionResolver)
    .whenTargetNamed(RESOLVER_USER_SUBSCRIPTION);

  bind<IGraphqlResolver<User, UserPersonalInformation>>(TYPE_GRAPHQL_RESOLVER)
    .to(UserPersonalInformationResolver)
    .whenTargetNamed(RESOLVER_USER_PERSONAL_INFORMATION);

  bind<IGraphqlResolver<GraphqlRootValue, UserPersonalInformation>>(TYPE_GRAPHQL_RESOLVER)
    .to(UpdateUserPersonalInformationResolver)
    .whenTargetNamed(RESOLVER_UPDATE_USER_PERSONAL_INFORMATION);

  bind<GraphqlResolverMap>(TYPE_GRAPHQL_RESOLVER_MAP).toDynamicValue(resolverMap);
});
