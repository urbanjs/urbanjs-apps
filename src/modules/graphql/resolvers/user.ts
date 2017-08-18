import { injectable, inject, track } from '../../../decorators';
import { ForbiddenError } from '../../error/errors';
import { TYPE_USER_SERVICE, IUserService } from '../../user/types';
import { TYPE_SERVICE_LOGGER, ILoggerService } from '../../log/types';
import { GraphqlResolverContext, IGraphqlResolver, GraphqlRootValue, User } from '../types';

@injectable()
export class UserResolver implements IGraphqlResolver<GraphqlRootValue, User> {

  constructor(@inject(TYPE_USER_SERVICE) private userService: IUserService,
              @inject(TYPE_SERVICE_LOGGER) private loggerService: ILoggerService) {
  }

  @track()
  async resolve(obj: GraphqlRootValue, args: { id?: string }, context: GraphqlResolverContext) {
    if (!context.authenticatedUserId) {
      return null;
    } else if (args.id && args.id !== context.authenticatedUserId) {
      this.loggerService.error(
        'user action forbidden',
        'authenticated user id', context.authenticatedUserId,
        'target user id:', args.id
      );

      throw new ForbiddenError();
    }

    return await this.userService.getUser(context.authenticatedUserId);
  }
}
