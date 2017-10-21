import * as chalk from 'chalk';
import fetch from 'node-fetch';
import { Container } from 'inversify';
import { relative } from 'path';
import {
  HttpServerConfig,
  TYPE_HTTP_CONFIG
} from '../../modules/http-server/types';
import {
  Fetch,
  TYPE_DRIVER_FETCH
} from '../../modules/http/types';
import {
  JWTServiceConfig,
  TYPE_JWT_SERVICE_CONFIG
} from '../../modules/jwt/types';
import { initalizeContainer } from '../utils/container';
import { config } from './config';
import { ILoggerService, TYPE_SERVICE_LOGGER } from '../../modules/log/types';
import {
  ConsoleLoggerService,
  TYPE_DRIVER_CHALK,
  ConsoleLoggerConfig,
  TYPE_CONSOLE_LOGGER_CONFIG
} from '../../modules/log/console-logger-service';
import {
  FacebookApiServiceConfig,
  TYPE_FACEBOOK_API_SERVICE_CONFIG
} from '../../modules/facebook/types';

export const createContainer = () => {
  const container = new Container({defaultScope: 'Singleton'});

  container.bind(TYPE_DRIVER_CHALK).toConstantValue(chalk);
  container.bind<ILoggerService>(TYPE_SERVICE_LOGGER).to(ConsoleLoggerService);
  container.bind<ConsoleLoggerConfig>(TYPE_CONSOLE_LOGGER_CONFIG).toConstantValue({
    debug: config.showDebugLogs,
    info: true,
    error: true,
    warning: true
  });

  container.bind<Fetch>(TYPE_DRIVER_FETCH).toConstantValue(fetch);

  container.bind<HttpServerConfig>(TYPE_HTTP_CONFIG).toConstantValue({
    port: config.port,
    corsAllowedOriginPatterns: config.corsAllowedOriginPatterns.split(','),
    cookieDomain: config.cookieDomain,
    useSecureCookies: config.useSecureCookies,
    includeInnerError: config.includeInnerError,
    enableGraphQLEditor: config.enableGraphQLEditor,
    sessionSecret: config.sessionSecret,
    facebookAppId: config.facebookAppId,
    facebookAppSecret: config.facebookAppSecret,
    absolutePublicPath: config.absolutePublicPath,
    relativePublicPath: relative(process.cwd(), config.absolutePublicPath)
  });

  container.bind<FacebookApiServiceConfig>(TYPE_FACEBOOK_API_SERVICE_CONFIG).toConstantValue({
    appId: config.facebookAppId,
    appSecret: config.facebookAppSecret
  });

  container.bind<JWTServiceConfig>(TYPE_JWT_SERVICE_CONFIG).toConstantValue({
    jwtSignatureSecret: config.sessionSecret
  });

  container.load(
    require('../../modules/log').logModule,
    require('../../modules/authorization').authorizationModule,
    require('../../modules/monitor').monitorModule,
    require('../../modules/http-server').httpServerModule,
    require('../../modules/http').httpModule,
    require('../../modules/graphql').graphqlModule,
    require('../../modules/user').userModule,
    require('../../modules/error').errorModule,
    require('../../modules/uuid').uuidModule,
    require('../../modules/route').routeModule,
    require('../../modules/json').jsonModule,
    require('../../modules/facebook').facebookModule,
    require('../../modules/date').dateModule,
    require('../../modules/jwt').jwtModule
  );

  initalizeContainer(container, {
    showDebugLogs: config.showDebugLogs
  });

  return container;
};
