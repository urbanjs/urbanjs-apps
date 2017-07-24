import { ContainerModule } from 'inversify';
import { join } from 'path';
import { DEV_MODE, SERVER_PORT } from '../../constants';
import { schema } from '../../graphql';
import {
  LoggerConfig,
  TYPE_CONFIG_LOGGER,
  HttpServerConfig,
  TYPE_CONFIG_HTTP
} from '../types';

export const configModule = new ContainerModule((bind) => {
  bind<LoggerConfig>(TYPE_CONFIG_LOGGER).toConstantValue({
    debug: DEV_MODE,
    info: true,
    error: true,
    warning: true
  });

  bind<HttpServerConfig>(TYPE_CONFIG_HTTP).toConstantValue({
    port: SERVER_PORT,
    enableGraphQLEditor: DEV_MODE,
    absolutePublicPath: join(__dirname, '../../../build'),
    relativePublicPath: 'build',
    graphQLSchema: schema
  });
});
