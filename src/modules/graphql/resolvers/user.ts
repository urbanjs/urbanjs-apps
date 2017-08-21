import { injectable, inject, track, resolver } from '../../../decorators';
import { ForbiddenError, ValidationError } from '../../error/errors';
import { TYPE_USER_SERVICE, IUserService, UserPersonalInformationInput } from '../../user/types';
import { TYPE_SERVICE_LOGGER, ILoggerService } from '../../log/types';
import { Guid } from '../../uuid/types';
import { TYPE_DATE_SERVICE, IDateService } from '../../date/types';
import { TYPE_FACEBOOK_API_SERVICE, IFacebookApiService } from '../../facebook/types';
import {
  GraphqlResolverContext,
  GraphqlRootValue,
  IGraphqlResolver,
  User,
  FacebookPermissions,
  Photos,
  UserPersonalInformation,
  UserSubscription
} from '../types';

@injectable()
export class UserResolver implements IGraphqlResolver {

  constructor(@inject(TYPE_USER_SERVICE) private userService: IUserService,
              @inject(TYPE_SERVICE_LOGGER) private loggerService: ILoggerService,
              @inject(TYPE_FACEBOOK_API_SERVICE) private facebookApiService: IFacebookApiService,
              @inject(TYPE_DATE_SERVICE) private dateService: IDateService) {
  }

  @track()
  @resolver({host: 'Query'})
  async user(obj: GraphqlRootValue,
             args: { id?: string },
             context: GraphqlResolverContext): Promise<User> {
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

  @track()
  @resolver({host: 'User'})
  async subscription(user: User,
                     args: {},
                     context: GraphqlResolverContext): Promise<UserSubscription> {
    if (!user) {
      throw new ValidationError('User is required');
    }

    return await this.userService.getSubscription(user.id);
  }

  @track()
  @resolver({host: 'User'})
  async facebookPermissions(user: User,
                            args: { id: string },
                            context: GraphqlResolverContext): Promise<FacebookPermissions> {
    if (!user) {
      throw new ValidationError('user is required');
    }

    const permissions = await this.facebookApiService.getPermissions(
      user.facebookId, user.facebookToken.token);

    if (typeof args.id === 'string') {
      const permission = {granted: false, id: args.id};
      for (const item of permissions) {
        if (item.id === permission.id) {
          permission.granted = item.granted;
          break;
        }
      }

      return [permission];
    }

    return permissions;
  }

  @track()
  @resolver({host: 'User'})
  async photos(user: User,
               args: {},
               context: GraphqlResolverContext): Promise<Photos> {
    if (!user) {
      throw new ValidationError('user is required');
    }

    return await this.facebookApiService.getPhotos(
      user.facebookId, user.facebookToken.token);
  }

  @track()
  @resolver({host: 'User'})
  async personalInformation(user: User,
                            args: {},
                            context: GraphqlResolverContext): Promise<UserPersonalInformation> {
    if (!user) {
      throw new ValidationError('user is required');
    }

    const personalInformation = await this.userService.getPersonalInformation(user.id);

    return {
      ...personalInformation,
      age: this.getAge(personalInformation.birthDate)
    };
  }

  @track()
  @resolver({host: 'Mutation'})
  async updateUserPersonalInformation(obj: GraphqlRootValue,
                                      args: { userId: Guid, data: UserPersonalInformationInput },
                                      context: GraphqlResolverContext): Promise<UserPersonalInformation> {
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
      age: this.getAge(personalInformation.birthDate)
    };
  }

  private getAge(birthDate: null | string) {
    let age = null;
    if (birthDate) {
      age = this.dateService.getYears(
        new Date().getTime() - new Date(birthDate).getTime());
    }

    return age;
  }
}
