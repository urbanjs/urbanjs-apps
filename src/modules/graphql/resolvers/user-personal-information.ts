import { injectable, inject, track } from '../../../decorators';
import { ValidationError } from '../../error/errors';
import { TYPE_USER_SERVICE, IUserService } from '../../user/types';
import { TYPE_DATE_SERVICE, IDateService } from '../../date/types';
import {
  GraphqlResolverContext,
  IGraphqlResolver,
  User,
  UserPersonalInformation
} from '../types';

@injectable()
export class UserPersonalInformationResolver implements IGraphqlResolver<User, UserPersonalInformation> {

  constructor(@inject(TYPE_USER_SERVICE) private userService: IUserService,
              @inject(TYPE_DATE_SERVICE) private dateService: IDateService) {
  }

  @track()
  async resolve(user: User, args: {}, context: GraphqlResolverContext) {
    if (!user) {
      throw new ValidationError('user is required');
    }

    const personalInformation = await this.userService.getPersonalInformation(user.id);

    return {
      ...personalInformation,
      age: personalInformation.birthDate && this.dateService.getYears(
        new Date().getTime() - personalInformation.birthDate.getTime())
    };
  }
}
