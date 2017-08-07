import { relative } from 'path';
import { config } from './config';
import {
  monitorModule,
  httpModule,
  graphqlModule,
  userModule,
  errorModule,
  uuidModule
} from '../modules';
import {
  HttpServerConfig,
  TYPE_HTTP_CONFIG
} from '../modules/http/types';
import { createContainer } from '../container';

export const container = createContainer({devMode: config.devMode});

container.bind<HttpServerConfig>(TYPE_HTTP_CONFIG).toConstantValue({
  port: config.port,
  hostOrigin: config.hostOrigin,
  corsAllowedOrigins: config.corsAllowedOrigins,
  devMode: config.devMode,
  enableGraphQLEditor: config.devMode,
  sessionSecret: config.sessionSecret,
  facebookAppId: config.facebookAppId,
  facebookAppSecret: config.facebookAppSecret,
  absolutePublicPath: config.absolutePublicPath,
  relativePublicPath: relative(process.cwd(), config.absolutePublicPath)
});

container.load(
  monitorModule,
  httpModule,
  graphqlModule,
  userModule,
  errorModule,
  uuidModule
);
