import { createContainer } from '../container';
import { config } from './config';

export const container = createContainer({
  devMode: config.devMode,
  lazyInject: true
});

container.load(
  require('../modules/authorization').authorizationModule
);
