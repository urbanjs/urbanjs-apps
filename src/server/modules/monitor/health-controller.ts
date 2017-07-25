import { inject, injectable, httpRoute, track } from '../../decorators';
import { ITraceService, TYPE_SERVICE_TRACE } from '../log/types';
import { HttpControllerResponse, IHttpController } from '../http/types';

@injectable()
export class HealthController implements IHttpController {
  constructor(@inject(TYPE_SERVICE_TRACE) traceService: ITraceService) {
    traceService.track(this);
  }

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
