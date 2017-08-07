import getDecorators from 'inversify-inject-decorators';
import { createContainer } from '../container';
import { reinitializeInjectDecorators } from '../decorators';
import { config } from './config';

export const container = createContainer({devMode: config.devMode});

reinitializeInjectDecorators({
  inject: getDecorators(container).lazyInject
});
