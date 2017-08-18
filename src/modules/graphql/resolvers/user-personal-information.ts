import { injectable, inject, track } from '../../../decorators';
import { ValidationError } from '../../error/errors';
import { TYPE_USER_SERVICE, IUserService } from '../../user/types';
import {
  GraphqlResolverContext,
  IGraphqlResolver,
  User,
  UserPersonalInformation
} from '../types';

@injectable()
export class UserPersonalInformationResolver implements IGraphqlResolver<User, UserPersonalInformation> {

  constructor(@inject(TYPE_USER_SERVICE) private userService: IUserService) {
  }

  @track()
  async resolve(user: User, args: {}, context: GraphqlResolverContext) {
    if (!user) {
      throw new ValidationError('user is required');
    }

    return await this.userService.getPersonalInformation(user.id);
  }
}
