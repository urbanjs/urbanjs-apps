import { injectable, inject, track } from '../../decorators';
import { FEATURE_CORE } from '../../constants';
import { NotFoundError } from '../error/errors';
import { IUuidService, TYPE_UUID_SERVICE } from '../uuid/types';
import { Feature } from '../authorization/types';
import {
  IUserService,
  RawUser,
  User,
  UserSubscription,
  UserPersonalInformation,
  UserPersonalInformationInput
} from './types';

@injectable()
export class UserService implements IUserService {
  private users: { [key: string]: User } = {};
  private subscriptions: { [key: string]: UserSubscription } = {};
  private userPersonalInformations: { [key: string]: UserPersonalInformation } = {};

  constructor(@inject(TYPE_UUID_SERVICE) private uuidService: IUuidService) {
  }

  @track()
  async createUser(user: RawUser) {
    const now = new Date();

    const storedUser: User = {
      id: this.uuidService.createUuid(),
      createdAt: now,
      facebookId: user.facebookId,
      email: user.email,
      displayName: user.displayName,
      avatar: user.avatar
    };

    const storedSubscription: UserSubscription = {
      id: this.uuidService.createUuid(),
      createdAt: now,
      expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      type: 'FREE',
      features: <Feature[]> [
        FEATURE_CORE
      ]
    };

    const storedPersonalInformation = {
      id: this.uuidService.createUuid(),
      firstName: null,
      lastName: null,
      phoneNumber: null,
      birthDate: null,
      birthPlace: null,
      socialSecurityNumber: null,
      taxNumber: null,
      mothersMaidenName: null
    };

    this.users[storedUser.id] = storedUser;
    this.subscriptions[storedUser.id] = storedSubscription;
    this.userPersonalInformations[storedUser.id] = storedPersonalInformation;

    return storedUser;
  }

  @track()
  async getUser(userId: string) {
    if (!this.users.hasOwnProperty(userId)) {
      throw new NotFoundError();
    }

    return this.users[userId];
  }

  @track()
  async getSubscription(userId: string) {
    if (!this.subscriptions.hasOwnProperty(userId)) {
      throw new NotFoundError();
    }

    return this.subscriptions[userId];
  }

  @track()
  async getPersonalInformation(userId: string) {
    if (!this.userPersonalInformations.hasOwnProperty(userId)) {
      throw new NotFoundError();
    }

    return this.userPersonalInformations[userId];
  }

  @track()
  async updatePersonalInformation(userId: string, data: UserPersonalInformationInput) {
    if (!this.userPersonalInformations.hasOwnProperty(userId)) {
      throw new NotFoundError();
    }

    return Object.assign(this.userPersonalInformations[userId], data);
  }
}
