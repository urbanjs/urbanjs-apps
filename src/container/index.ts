import { Container } from 'inversify';
import { reinitializeTrackDecorators } from '../decorators';
import { logModule } from '../modules/log';
import {
  LoggerConfig,
  TYPE_CONFIG_LOGGER,
  ILoggerService,
  TYPE_SERVICE_LOGGER
} from '../modules/log/types';
import { createLoggerMiddleware } from './middlewares';

export type ContainerConfig = {
  devMode: boolean;
};

export function createContainer(config: ContainerConfig) {
  const container = new Container({defaultScope: 'Singleton'});

  if (config.devMode) {
    container.load(logModule);

    container.bind<LoggerConfig>(TYPE_CONFIG_LOGGER).toConstantValue({
      debug: config.devMode,
      info: true,
      error: true,
      warning: true
    });

    container.applyMiddleware(...[createLoggerMiddleware()]);

    reinitializeTrackDecorators({
      track: () => (target: ObjectConstructor, propertyKey: string, descriptor: PropertyDescriptor) => {
        const oldMethod = descriptor.value;

        if (typeof oldMethod !== 'function') {
          throw new Error('@track can only be used for methods');
        }

        const debugPrefix = `${target.constructor.name}.${propertyKey}`;
        Object.assign(descriptor, {
          value: function () {
            container.get<ILoggerService>(TYPE_SERVICE_LOGGER).debug(debugPrefix, 'called');

            return oldMethod.apply(this, arguments);
          }
        });
      }
    });
  }

  return container;
}
