import { ContainerModule } from 'inversify';
import { ErrorService } from './error-service';
import {
  TYPE_ERROR_SERVICE,
  IErrorService
} from './types';

export const errorModule = new ContainerModule((bind) => {
  bind<IErrorService>(TYPE_ERROR_SERVICE).to(ErrorService);
});
