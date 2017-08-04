import { injectable, httpRoute, track } from '../../decorators';
import { PATH_API_HEALTH } from '../../../constants';
import { HttpControllerResponse, IHttpController } from '../http/types';

@injectable()
export class HealthController implements IHttpController {

  @track()
  @httpRoute({
    method: 'GET',
    path: PATH_API_HEALTH
  })
  handler(): HttpControllerResponse {
    return {
      payload: {
        success: true
      },
      statusCode: 200
    };
  }
}
