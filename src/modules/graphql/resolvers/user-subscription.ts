import { injectable, inject, track } from '../../../decorators';
import { ValidationError } from '../../error/errors';
import { TYPE_USER_SERVICE, IUserService } from '../../user/types';
import { GraphqlResolverContext, IGraphqlResolver, User, UserSubscription } from '../types';

@injectable()
export class UserSubscriptionResolver implements IGraphqlResolver<User, UserSubscription> {

  constructor(@inject(TYPE_USER_SERVICE) private userService: IUserService) {
  }

  @track()
  async resolve(user: User, args: {}, context: GraphqlResolverContext) {
    if (!user) {
      throw new ValidationError('User is required');
    }

    return await this.userService.getSubscription(user.id);
  }
}
