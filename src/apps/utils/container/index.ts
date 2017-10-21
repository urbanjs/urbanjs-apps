import { Container } from 'inversify';
import { supportLazyInject, reinitializeTrackDecorators } from '../../../decorators';
import { createLoggerMiddleware } from './middlewares';
import { ILoggerService, TYPE_SERVICE_LOGGER } from '../../../modules/log/types';

export type ContainerConfig = {
  showDebugLogs?: boolean;
  lazyInject?: boolean;
};

export function initalizeContainer(container: Container, {showDebugLogs, lazyInject}: ContainerConfig) {
  if (lazyInject) {
    supportLazyInject(container);
  }

  if (showDebugLogs) {
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
