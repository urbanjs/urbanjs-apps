import { injectable, inject, track } from '../../../decorators';
import { ForbiddenError } from '../../error/errors';
import { ILoggerService, TYPE_SERVICE_LOGGER } from '../../log/types';
import { TYPE_USER_SERVICE, IUserService, UserPersonalInformationInput } from '../../user/types';
import { Guid } from '../../uuid/types';
import { TYPE_DATE_SERVICE, IDateService } from '../../date/types';
import {
  GraphqlResolverContext,
  IGraphqlResolver,
  GraphqlRootValue,
  UserPersonalInformation
} from '../types';

export type ResolverArgs = {
  userId: Guid;
  data: UserPersonalInformationInput;
};

@injectable()
export class UpdateUserPersonalInformationResolver
  implements IGraphqlResolver<GraphqlRootValue, UserPersonalInformation> {

  constructor(@inject(TYPE_USER_SERVICE) private userService: IUserService,
              @inject(TYPE_SERVICE_LOGGER) private loggerService: ILoggerService,
              @inject(TYPE_DATE_SERVICE) private dateService: IDateService) {
  }

  @track()
  async resolve(obj: GraphqlRootValue, args: ResolverArgs, context: GraphqlResolverContext) {
    if (!context.authenticatedUserId || context.authenticatedUserId !== args.userId) {
      this.loggerService.error(
        'user action forbidden',
        'authenticated user id', context.authenticatedUserId,
        'target user id:', args.userId
      );

      throw new ForbiddenError();
    }

    const personalInformation = await this.userService.updatePersonalInformation(args.userId, args.data);

    return {
      ...personalInformation,
      age: personalInformation.birthDate && this.dateService.getYears(
        new Date().getTime() - personalInformation.birthDate.getTime())
    };
  }
}
