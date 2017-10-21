import * as chalk from 'chalk';
import { Container } from 'inversify';
import { initalizeContainer } from '../utils/container';
import { config } from './config';
import { cliModule } from '../../modules/cli';
import { jsonModule } from '../../modules/json';
import { uuidModule } from '../../modules/uuid';
import { logModule } from '../../modules/log';
import { ILoggerService, TYPE_SERVICE_LOGGER } from '../../modules/log/types';
import {
  ConsoleLoggerService,
  TYPE_DRIVER_CHALK,
  ConsoleLoggerConfig,
  TYPE_CONSOLE_LOGGER_CONFIG
} from '../../modules/log/console-logger-service';

export const container: Container = new Container({defaultScope: 'Singleton'});
initalizeContainer(container, {showDebugLogs: config.showDebugLogs});

container.bind(TYPE_DRIVER_CHALK).toConstantValue(chalk);
container.bind<ILoggerService>(TYPE_SERVICE_LOGGER).to(ConsoleLoggerService);
container.bind<ConsoleLoggerConfig>(TYPE_CONSOLE_LOGGER_CONFIG).toConstantValue({
  debug: config.showDebugLogs,
  info: true,
  warning: true,
  error: true
});

container.load(logModule);
container.load(cliModule);
container.load(jsonModule);
container.load(uuidModule);
