import { inject, injectable, httpRoute, track } from '../../decorators';
import {
  HttpControllerRequestParams,
  IHttpController
} from '../http/types';
import {
  ILogService,
  TYPE_LOG_SERVICE
} from './types';

@injectable()
export class ReportController implements IHttpController {
  constructor(@inject(TYPE_LOG_SERVICE) private logService: ILogService) {
  }

  @track()
  @httpRoute({
    method: 'POST',
    path: '/v1/report/error'
  })
  async handler(params: HttpControllerRequestParams) {
    await this.logService.createLog(JSON.stringify(params.payload));
  }
}
