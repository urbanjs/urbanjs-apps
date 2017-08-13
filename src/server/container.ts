import { relative } from 'path';
import { HttpServerConfig, TYPE_HTTP_CONFIG } from '../modules/http/types';
import { createContainer } from '../utils/container';
import { config } from './config';

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
  require('../modules/authorization').authorizationModule,
  require('../modules/monitor').monitorModule,
  require('../modules/http').httpModule,
  require('../modules/graphql').graphqlModule,
  require('../modules/user').userModule,
  require('../modules/error').errorModule,
  require('../modules/uuid').uuidModule
);
