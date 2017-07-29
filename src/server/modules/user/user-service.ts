import { injectable, inject, track } from '../../decorators';
import { IUserService, User } from './types';
import { TYPE_SERVICE_TRACE, ITraceService } from '../log/types';

@injectable()
export class UserService implements IUserService {
  private users = {};

  constructor(@inject(TYPE_SERVICE_TRACE) traceService: ITraceService) {
    traceService.track(this);
  }

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
