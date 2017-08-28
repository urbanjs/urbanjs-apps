import { Container } from 'inversify';
import { supportLazyInject, reinitializeTrackDecorators } from '../../decorators';
import { createLoggerMiddleware } from './middlewares';
import {
  LoggerConfig,
  TYPE_CONFIG_LOGGER,
  ILoggerService,
  TYPE_SERVICE_LOGGER
} from '../../modules/log/types';

export type ContainerConfig = {
  devMode: boolean;
  lazyInject?: boolean;
};

export function createContainer({devMode, lazyInject}: ContainerConfig) {
  const container = new Container({defaultScope: 'Singleton'});

  if (lazyInject) {
    supportLazyInject(container);
  }

  container.load(require('../../modules/log').logModule);
  container.bind<LoggerConfig>(TYPE_CONFIG_LOGGER).toConstantValue({
    debug: devMode,
    info: true,
    error: true,
    warning: true
  });

  if (devMode) {
    container.applyMiddleware(...[createLoggerMiddleware()]);

    const loggerService = container.get<ILoggerService>(TYPE_SERVICE_LOGGER);
    reinitializeTrackDecorators({
      track: () => (target: ObjectConstructor, propertyKey: string, descriptor: PropertyDescriptor) => {
        const oldMethod = descriptor.value;

        if (typeof oldMethod !== 'function') {
          throw new Error('@track can only be used for methods');
        }

        const debugPrefix = `${target.constructor.name}.${propertyKey}`;
        Object.assign(descriptor, {
          value: function () {
            loggerService.debug(debugPrefix, 'called');

            return oldMethod.apply(this, arguments);
          }
        });
      }
    });
  }

  return container;
}
