import { interfaces  as inversify } from 'inversify';
import { TYPE_SERVICE_LOGGER, ILoggerService } from '../log/types';
import {
  TYPE_HTTP_CONTROLLER,
  IHttpController,
  HttpApplicationFactory,
  HttpServerConfig
} from './types';
import { createExpressApplication } from './expess';

export const expressApplicationFactory: inversify.FactoryCreator<HttpApplicationFactory> =
  (context: inversify.Context) =>
    (config: HttpServerConfig) =>
      createExpressApplication(Object.assign({}, config, {
        apiControllers: context.container.getAll<IHttpController>(TYPE_HTTP_CONTROLLER),
        loggerService: context.container.get<ILoggerService>(TYPE_SERVICE_LOGGER)
      }));
