import { ContainerModule } from 'inversify';
import { TraceService } from 'urbanjs-tools-core/dist/services/trace-service';
import { TYPE_HTTP_CONTROLLER, IHttpController } from '../http-server/types';
import { ReportController } from './report-controller';
import {
  ILoggerService,
  TYPE_SERVICE_LOGGER,
  ITraceService,
  TYPE_SERVICE_TRACE
} from './types';
import { DumbLoggerService } from './dumb-logger-service';

export const logModule = new ContainerModule((bind, unbind, isBound) => {
  if (!isBound(TYPE_SERVICE_LOGGER)) {
    bind<ILoggerService>(TYPE_SERVICE_LOGGER).to(DumbLoggerService);
  }

  bind<ITraceService>(TYPE_SERVICE_TRACE).to(TraceService);
  bind<IHttpController>(TYPE_HTTP_CONTROLLER).to(ReportController);
});
