import { ContainerModule } from 'inversify';
import { ConsoleLoggerService } from 'urbanjs-tools-core/dist/services/console-logger-service';
import { TraceService } from 'urbanjs-tools-core/dist/services/trace-service';
import {
  ITraceService,
  TYPE_SERVICE_TRACE,
  ILoggerService,
  TYPE_SERVICE_LOGGER
} from './types';

export const logModule = new ContainerModule((bind) => {
  bind<ILoggerService>(TYPE_SERVICE_LOGGER).to(ConsoleLoggerService);
  bind<ITraceService>(TYPE_SERVICE_TRACE).to(TraceService);
});
