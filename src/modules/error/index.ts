import { ContainerModule } from 'inversify';
import * as statuses from 'statuses';
import { ErrorService } from './error-service';
import {
  TYPE_ERROR_SERVICE,
  IErrorService,
  HttpMessagesByStatusCode,
  TYPE_HTTP_MESSAGES_BY_STATUS_CODE
} from './types';

export const errorModule = new ContainerModule((bind) => {
  bind<IErrorService>(TYPE_ERROR_SERVICE).to(ErrorService);
  bind<HttpMessagesByStatusCode>(TYPE_HTTP_MESSAGES_BY_STATUS_CODE).toConstantValue(statuses);
});
