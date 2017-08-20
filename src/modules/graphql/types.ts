import { IResolvers } from 'graphql-tools/dist/Interfaces';
import {
  User as StoredUser,
  UserSubscription as StoredUserSubscription,
  UserPersonalInformation as StoredUserPersonalInformation
} from '../user/types';
import {
  FacebookPermission
} from '../facebook/types';

export const TYPE_GRAPHQL_TYPE_DEFS = 'TYPE_GRAPHQL_TYPE_DEFS';
export const TYPE_GRAPHQL_RESOLVER = 'TYPE_GRAPHQL_RESOLVER';
export const TYPE_GRAPHQL_RESOLVER_MAP = 'TYPE_GRAPHQL_RESOLVER_MAP';

export const RESOLVER_USER = 'RESOLVER_USER';
export const RESOLVER_USER_SUBSCRIPTION = 'RESOLVER_USER_SUBSCRIPTION';
export const RESOLVER_USER_PERSONAL_INFORMATION = 'RESOLVER_USER_PERSONAL_INFORMATION';
export const RESOLVER_UPDATE_USER_PERSONAL_INFORMATION = 'RESOLVER_UPDATE_USER_PERSONAL_INFORMATION';
export const RESOLVER_FACEBOOK_PERMISSIONS = 'RESOLVER_FACEBOOK_PERMISSIONS';

export type GraphqlTypeDefs = string;
export type GraphqlResolverMap = IResolvers;
export type GraphqlRootValue = null;
export type GraphqlResolverContext = {
  authenticatedUserId?: string
};

export interface IGraphqlResolver<T1, T2> {
  resolve(obj: T1, args: object, context: GraphqlResolverContext): Promise<T2>;
}

export type User = null | StoredUser;
export type UserSubscription = StoredUserSubscription;
export type UserPersonalInformation = StoredUserPersonalInformation;
export type FacebookPermissions = FacebookPermission[];
