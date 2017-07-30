import { injectable, track } from '../../decorators';
import { IUserService, User } from './types';

@injectable()
export class UserService implements IUserService {
  private users = {};

  @track()
  async getUser(userId: string) {
    if (!this.users.hasOwnProperty(userId)) {
      throw new Error('Not found');
    }

    return this.users[userId];
  }

  @track()
  async createUser(user: User) {
    const storedUser = {
      id: user.id,
      displayName: user.displayName
    };

    this.users[storedUser.id] = storedUser;

    return storedUser;
  }
}
