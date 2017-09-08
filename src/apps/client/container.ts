import { createContainer } from '../utils/container';
import {
  TYPE_ROUTE_SERVICE_CONFIG,
  RouterServiceConfig
} from '../../modules/route/types';
import { config } from './config';

export const container = createContainer({
  devMode: config.devMode,
  lazyInject: true
});

container.bind<RouterServiceConfig>(TYPE_ROUTE_SERVICE_CONFIG).toConstantValue({
  appOrigin: config.appOrigin,
  serverOrigin: config.serverOrigin
});

container.load(
  require('../../modules/authorization').authorizationModule,
  require('../../modules/route').routeModule
);
