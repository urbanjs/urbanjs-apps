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
  RESOLVER_UPDATE_USER_PERSONAL_INFORMATION,
  FacebookPermissions,
  RESOLVER_FACEBOOK_PERMISSIONS,
  Photos,
  RESOLVER_PHOTOS
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
  const facebookPermissionsResolver = container
    .getNamed<IGraphqlResolver<User, FacebookPermissions>>(
      TYPE_GRAPHQL_RESOLVER, RESOLVER_FACEBOOK_PERMISSIONS);
  const photosResolver = container
    .getNamed<IGraphqlResolver<User, Photos>>(
      TYPE_GRAPHQL_RESOLVER, RESOLVER_PHOTOS);

  return {
    Email: GraphQLEmail,
    Date: GraphQLDateTime,

    User: {
      subscription: (obj: User, args: {}, con: GraphqlResolverContext) =>
        userSubscriptionResolver.resolve(obj, args, con),
      personalInformation: (obj: User, args: {}, con: GraphqlResolverContext) =>
        userPersonalInformationResolver.resolve(obj, args, con),
      facebookPermissions: (obj: User, args: {}, con: GraphqlResolverContext) =>
        facebookPermissionsResolver.resolve(obj, args, con),
      photos: (obj: User, args: {}, con: GraphqlResolverContext) =>
        photosResolver.resolve(obj, args, con)
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
