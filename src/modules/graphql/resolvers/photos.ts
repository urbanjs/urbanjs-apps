import { injectable, inject, track } from '../../../decorators';
import { ValidationError } from '../../error/errors';
import { TYPE_FACEBOOK_API_SERVICE, IFacebookApiService } from '../../facebook/types';
import {
  Photos,
  GraphqlResolverContext,
  IGraphqlResolver,
  User
} from '../types';

@injectable()
export class PhotosResolver implements IGraphqlResolver<User, Photos> {

  constructor(@inject(TYPE_FACEBOOK_API_SERVICE) private facebookApiService: IFacebookApiService) {
  }

  @track()
  async resolve(user: User, args: {}, context: GraphqlResolverContext) {
    if (!user) {
      throw new ValidationError('user is required');
    }

    return await this.facebookApiService.getPhotos(
      user.facebookId, user.facebookToken.token);
  }
}
