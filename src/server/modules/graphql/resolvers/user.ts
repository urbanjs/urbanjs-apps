import { injectable, inject, track } from '../../../decorators';
import { TYPE_SERVICE_TRACE, ITraceService } from '../../log/types';
import { GraphqlResolverContext, IGraphqlResolver } from '../types';

export type User = null | {
  id: string;
};

@injectable()
export class UserResolver implements IGraphqlResolver<User> {
  constructor(@inject(TYPE_SERVICE_TRACE) traceService: ITraceService) {
    traceService.track(this);
  }

  @track()
  resolve(obj: object, args: object, context: GraphqlResolverContext) {
    if (context.user === null) {
      return null;
    }

    return {
      id: context.user.id
    };
  }
}
