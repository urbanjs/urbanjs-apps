import { injectable, inject, track } from '../../../decorators';
import { TYPE_USER_SERVICE, IUserService } from '../../user/types';
import { TYPE_SERVICE_LOGGER, ILoggerService } from '../../log/types';
import { GraphqlResolverContext, IGraphqlResolver } from '../types';

export type User = null | {
  id: string;
  displayName: string;
};

@injectable()
export class UserResolver implements IGraphqlResolver<User> {

  constructor(@inject(TYPE_USER_SERVICE) private userService: IUserService,
              @inject(TYPE_SERVICE_LOGGER) private loggerService: ILoggerService) {
  }

  @track()
  async resolve(obj: object, args: { id?: string }, context: GraphqlResolverContext) {
    if (!context.authenticatedUserId) {
      return null;
    } else if (args.id && args.id !== context.authenticatedUserId) {
      this.loggerService.warn(
        'user query prohibited',
        'authenticated user id', context.authenticatedUserId,
        'target user id:', args.id
      );

      return null;
    }

    const user = await this.userService.getUser(context.authenticatedUserId);

    return {
      id: user.id,
      displayName: user.displayName,
      facebookRegistration: {
        id: user.facebookId
      },
      subscription: user.subscription
    };
  }
}
