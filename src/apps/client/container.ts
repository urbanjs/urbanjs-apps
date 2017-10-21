import * as chalk from 'chalk';
import { Container } from 'inversify';
import { initalizeContainer } from '../utils/container';
import { ILoggerService, TYPE_SERVICE_LOGGER } from '../../modules/log/types';
import {
  ConsoleLoggerService,
  TYPE_DRIVER_CHALK,
  ConsoleLoggerConfig,
  TYPE_CONSOLE_LOGGER_CONFIG
} from '../../modules/log/console-logger-service';
import { config } from './config';

export const container = new Container({defaultScope: 'Singleton'});

container.bind(TYPE_DRIVER_CHALK).toConstantValue(chalk);
container.bind<ILoggerService>(TYPE_SERVICE_LOGGER).to(ConsoleLoggerService);
container.bind<ConsoleLoggerConfig>(TYPE_CONSOLE_LOGGER_CONFIG).toConstantValue({
  debug: config.showDebugLogs,
  info: true,
  error: true,
  warning: true
});

container.load(
  require('../../modules/log').logModule,
  require('../../modules/route').routeModule,
  require('../../modules/authorization').authorizationModule
);

initalizeContainer(container, {
  showDebugLogs: config.showDebugLogs,
  lazyInject: true
});
