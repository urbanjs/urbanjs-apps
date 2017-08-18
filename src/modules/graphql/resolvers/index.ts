import { interfaces as inversify } from 'inversify';
import { GraphQLEmail, GraphQLDateTime } from 'graphql-custom-types';
import { IGraphqlResolver, TYPE_GRAPHQL_RESOLVER } from '../types';
import { User } from './user';

export * from './user';

export function resolversFactory(context: inversify.Context) {
  const userResolver = context.container.getNamed<IGraphqlResolver<User>>(TYPE_GRAPHQL_RESOLVER, 'user');

  return () => ({
    Email: GraphQLEmail,
    Date: GraphQLDateTime,
    Query: {
      user: userResolver.resolve.bind(userResolver)
    }
  });
}
