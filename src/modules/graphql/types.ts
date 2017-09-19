import { IResolvers } from 'graphql-tools/dist/Interfaces';
import {
  User as StoredUser,
  UserSubscription as StoredUserSubscription,
  UserPersonalInformation as StoredUserPersonalInformation
} from '../user/types';
import { FacebookPermission } from '../facebook/types';

export const TYPE_GRAPHQL_TYPE_DEFS = 'TYPE_GRAPHQL_TYPE_DEFS';
export const TYPE_GRAPHQL_RESOLVER = 'TYPE_GRAPHQL_RESOLVER';
export const TYPE_GRAPHQL_RESOLVER_MAP = 'TYPE_GRAPHQL_RESOLVER_MAP';

export type GraphqlTypeDefs = string;
export type GraphqlResolverMap = IResolvers;
export type GraphqlRootValue = null;
export type GraphqlResolverContext = {
  authenticatedUserId?: string
};

export interface IGraphqlResolver {
}

export type User = null | StoredUser;
export type UserSubscription = StoredUserSubscription;
export type UserPersonalInformation = StoredUserPersonalInformation & { age: number | null };
export type FacebookPermissions = FacebookPermission[];
