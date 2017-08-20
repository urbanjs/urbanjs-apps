import { Guid } from '../uuid/types';
import { Feature } from '../authorization/types';
import { FacebookAccessToken } from '../facebook/types';

export const TYPE_USER_SERVICE = 'TYPE_USER_SERVICE';

export type RawUser = {
  facebookId: string;
  facebookToken: FacebookAccessToken;
  email: string;
  displayName: string;
  avatar: string;
};

export type User = {
  id: Guid;
  createdAt: Date;
  facebookId: string;
  facebookToken: FacebookAccessToken;
  email: string;
  displayName: string;
  avatar: string;
};

export type UserSubscriptionType = 'FREE';
export type UserSubscription = {
  id: Guid;
  createdAt: Date;
  expiresAt: Date;
  type: UserSubscriptionType;
  features: Feature[];
};

export type UserPersonalInformationInput = {
  firstName: null | string;
  lastName: null | string;
  phoneNumber: null | string;
  birthDate: null | Date;
  birthPlace: null | string;
  socialSecurityNumber: null | string;
  taxNumber: null | string;
  mothersMaidenName: null | string;
};

export type UserPersonalInformation = UserPersonalInformationInput & {
  id: Guid;
};

export interface IUserService {
  createUser(user: RawUser): Promise<User>;
  getUser(id: string): Promise<User>;
  getSubscription(id: string): Promise<UserSubscription>;
  getPersonalInformation(id: string): Promise<UserPersonalInformation>;
  updatePersonalInformation(id: string, data: UserPersonalInformationInput): Promise<UserPersonalInformation>;
}
