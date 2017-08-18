import { interfaces as inversify } from 'inversify';
import { GraphQLDateTime, GraphQLEmail } from 'graphql-custom-types';
import {
  User,
  UserSubscription,
  IGraphqlResolver,
  GraphqlRootValue,
  TYPE_GRAPHQL_RESOLVER,
  GraphqlResolverContext,
  RESOLVER_USER,
  RESOLVER_USER_SUBSCRIPTION,
  RESOLVER_USER_PERSONAL_INFORMATION,
  UserPersonalInformation,
  RESOLVER_UPDATE_USER_PERSONAL_INFORMATION
} from './types';

export const resolverMap = (context: inversify.Context) => {
  const container = context.container;

  // TODO: use decorators and generate the resolver map
  //       + add debug logs
  //       + json schema validation based on the annotation
  //       + handle errors (Forbidden, Validation, NotFound...)
  const userResolver = container
    .getNamed<IGraphqlResolver<GraphqlRootValue, User>>(
      TYPE_GRAPHQL_RESOLVER, RESOLVER_USER);
  const userSubscriptionResolver = container
    .getNamed<IGraphqlResolver<User, UserSubscription>>(
      TYPE_GRAPHQL_RESOLVER, RESOLVER_USER_SUBSCRIPTION);
  const userPersonalInformationResolver = container
    .getNamed<IGraphqlResolver<User, UserPersonalInformation>>(
      TYPE_GRAPHQL_RESOLVER, RESOLVER_USER_PERSONAL_INFORMATION);
  const updateUserPersonalInformationResolver = container
    .getNamed<IGraphqlResolver<GraphqlRootValue, UserPersonalInformation>>(
      TYPE_GRAPHQL_RESOLVER, RESOLVER_UPDATE_USER_PERSONAL_INFORMATION);

  return {
    Email: GraphQLEmail,
    Date: GraphQLDateTime,

    User: {
      subscription: (obj: User, args: {}, con: GraphqlResolverContext) =>
        userSubscriptionResolver.resolve(obj, args, con),
      personalInformation: (obj: User, args: {}, con: GraphqlResolverContext) =>
        userPersonalInformationResolver.resolve(obj, args, con),
    },

    Query: {
      user: (obj: GraphqlRootValue, args: object, con: GraphqlResolverContext) =>
        userResolver.resolve(obj, args, con)
    },

    Mutation: {
      updateUserPersonalInformation: (obj: GraphqlRootValue, args: object, con: GraphqlResolverContext) =>
        updateUserPersonalInformationResolver.resolve(obj, args, con)
    }
  };
};
