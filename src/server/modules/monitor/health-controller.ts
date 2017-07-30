import { injectable, httpRoute, track } from '../../decorators';
import { HttpControllerResponse, IHttpController } from '../http/types';

@injectable()
export class HealthController implements IHttpController {

  @track()
  @httpRoute({
    method: 'GET',
    path: '/health'
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
