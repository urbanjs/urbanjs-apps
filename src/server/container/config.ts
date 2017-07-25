import { ContainerModule } from 'inversify';
import { join } from 'path';
import { config } from '../../config';
import { schema } from '../../graphql';
import {
  LoggerConfig,
  TYPE_CONFIG_LOGGER,
  HttpServerConfig,
  TYPE_CONFIG_HTTP
} from '../types';

export const configModule = new ContainerModule((bind) => {
  bind<LoggerConfig>(TYPE_CONFIG_LOGGER).toConstantValue({
    debug: config.devMode,
    info: true,
    error: true,
    warning: true
  });

  bind<HttpServerConfig>(TYPE_CONFIG_HTTP).toConstantValue({
    port: config.port,
    enableGraphQLEditor: config.devMode,
    absolutePublicPath: join(__dirname, '../../../build'),
    relativePublicPath: 'build',
    graphQLSchema: schema
  });
});
