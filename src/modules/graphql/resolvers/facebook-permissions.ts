import { injectable, inject, track } from '../../../decorators';
import { ValidationError } from '../../error/errors';
import { TYPE_FACEBOOK_API_SERVICE, IFacebookApiService } from '../../facebook/types';
import {
  FacebookPermissions,
  GraphqlResolverContext,
  IGraphqlResolver,
  User
} from '../types';

@injectable()
export class FacebookPermissionsResolver implements IGraphqlResolver<User, FacebookPermissions> {

  constructor(@inject(TYPE_FACEBOOK_API_SERVICE) private facebookApiService: IFacebookApiService) {
  }

  @track()
  async resolve(user: User, args: { id: string }, context: GraphqlResolverContext) {
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
}
