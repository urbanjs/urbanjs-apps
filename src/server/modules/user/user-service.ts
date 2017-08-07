import { injectable, inject, track } from '../../decorators';
import { IUuidService, TYPE_UUID_SERVICE } from '../uuid/types';
import { IUserService, RawUser, ApplicationFeature, User } from './types';

@injectable()
export class UserService implements IUserService {
  private users = {};

  constructor(@inject(TYPE_UUID_SERVICE) private uuidService: IUuidService) {
  }

  @track()
  async getUser(userId: string) {
    if (!this.users.hasOwnProperty(userId)) {
      throw new Error('Not found');
    }

    return this.users[userId];
  }

  @track()
  async createUser(user: RawUser) {
    const now = new Date();

    const storedUser: User = {
      id: this.uuidService.createUuid(),
      createdAt: now,
      facebookId: user.facebookId,
      displayName: user.displayName,
      subscription: {
        id: this.uuidService.createUuid(),
        createdAt: now,
        expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        type: 'FREE',
        features: <ApplicationFeature[]> [
          'CORE'
        ]
      }
    };

    this.users[storedUser.id] = storedUser;

    return storedUser;
  }
}
