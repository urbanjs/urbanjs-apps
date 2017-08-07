import { Guid } from '../uuid/types';

export const TYPE_USER_SERVICE = 'TYPE_USER_SERVICE';

export type SubscriptionType = 'FREE';
export type ApplicationFeature = 'CORE';

export type RawUser = {
  facebookId: string;
  displayName: string;
};

export type User = {
  id: Guid;
  createdAt: Date;
  facebookId: string;
  displayName: string;
  subscription: {
    id: Guid;
    createdAt: Date;
    expiresAt: Date;
    type: SubscriptionType;
    features: ApplicationFeature[];
  }
};

export interface IUserService {
  getUser(id: string): Promise<User>;
  createUser(user: RawUser): Promise<User>;
}
