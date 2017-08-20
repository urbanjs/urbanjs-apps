import { ContainerModule } from 'inversify';
import * as chalk from 'chalk';
import { ConsoleLoggerService } from 'urbanjs-tools-core/dist/services/console-logger-service';
import { TraceService } from 'urbanjs-tools-core/dist/services/trace-service';
import { TYPE_HTTP_CONTROLLER, IHttpController } from '../http-server/types';
import { ReportController } from './report-controller';
import { LogService } from './log-service';
import {
  ITraceService,
  TYPE_SERVICE_TRACE,
  ILoggerService,
  TYPE_SERVICE_LOGGER,
  TYPE_DRIVER_CHALK,
  TYPE_LOG_SERVICE,
  ILogService
} from './types';

export const logModule = new ContainerModule((bind) => {
  bind<ILogService>(TYPE_LOG_SERVICE).to(LogService);
  bind<ILoggerService>(TYPE_SERVICE_LOGGER).to(ConsoleLoggerService);
  bind<ITraceService>(TYPE_SERVICE_TRACE).to(TraceService);
  bind(TYPE_DRIVER_CHALK).toConstantValue(chalk);
  bind<IHttpController>(TYPE_HTTP_CONTROLLER).to(ReportController);
});
