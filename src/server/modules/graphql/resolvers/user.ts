import { injectable, track } from '../../../decorators';
import { GraphqlResolverContext, IGraphqlResolver } from '../types';

export type User = null | {
  id: string;
};

@injectable()
export class UserResolver implements IGraphqlResolver<User> {

  @track()
  resolve(obj: object, args: object, context: GraphqlResolverContext) {
    if (context.user === null) {
      return null;
    }

    return {
      id: context.user.id,
      displayName: context.user.displayName
    };
  }
}
