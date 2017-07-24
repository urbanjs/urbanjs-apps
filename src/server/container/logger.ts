import {ContainerModule} from 'inversify';
import {ConsoleLoggerService, TraceService} from 'urbanjs-tools-core';
import {
  ITraceService,
  TYPE_SERVICE_TRACE,
  ILoggerService,
  TYPE_SERVICE_LOGGER
} from '../types';

export const loggerModule = new ContainerModule((bind) => {
  bind<ILoggerService>(TYPE_SERVICE_LOGGER).to(ConsoleLoggerService);
  bind<ITraceService>(TYPE_SERVICE_TRACE).to(TraceService);
});
