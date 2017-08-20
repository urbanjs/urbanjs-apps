import { inject, injectable, httpRoute, track } from '../../decorators';
import { PATH_API_REPORT_ERROR } from '../../constants';
import {
  HttpControllerRequestParams,
  IHttpController
} from '../http-server/types';
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
    path: PATH_API_REPORT_ERROR
  })
  async handler(params: HttpControllerRequestParams) {
    await this.logService.createLog(JSON.stringify(params.payload));
  }
}
