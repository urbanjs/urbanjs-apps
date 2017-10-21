import { inject, injectable, httpRoute, track } from '../../decorators';
import { PATH_API_REPORT_ERROR } from '../../constants';
import {
  HttpControllerRequestParams,
  IHttpController
} from '../http-server/types';
import {
  ILoggerService,
  TYPE_SERVICE_LOGGER
} from './types';

@injectable()
export class ReportController implements IHttpController {
  constructor(@inject(TYPE_SERVICE_LOGGER) private loggerService: ILoggerService) {
  }

  @track()
  @httpRoute({
    method: 'POST',
    path: PATH_API_REPORT_ERROR
  })
  async handler(params: HttpControllerRequestParams) {
    await this.loggerService.error(JSON.stringify(params.payload));
  }
}
