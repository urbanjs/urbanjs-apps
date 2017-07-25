import { ContainerModule } from 'inversify';
import { relative } from 'path';
import { config } from '../config';
import {
  LoggerConfig,
  TYPE_CONFIG_LOGGER
} from './modules/log/types';
import {
  HttpServerConfig,
  TYPE_HTTP_CONFIG
} from './modules/http/types';

export const configModule = new ContainerModule((bind) => {
  bind<LoggerConfig>(TYPE_CONFIG_LOGGER).toConstantValue({
    debug: config.devMode,
    info: true,
    error: true,
    warning: true
  });

  bind<HttpServerConfig>(TYPE_HTTP_CONFIG).toConstantValue({
    enableGraphQLEditor: config.devMode,
    port: config.port,
    host: config.host,
    sessionSecret: config.sessionSecret,
    facebookAppId: config.facebookAppId,
    facebookAppSecret: config.facebookAppSecret,
    absolutePublicPath: config.absolutePublicPath,
    relativePublicPath: relative(process.cwd(), config.absolutePublicPath)
  });
});
