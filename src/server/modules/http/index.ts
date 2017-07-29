import { ContainerModule } from 'inversify';
import { HttpServer } from './http-server';
import { ErrorService } from './error-service';
import { expressApplicationFactory } from './express-application-factory';
import {
  TYPE_HTTP_SERVER,
  IHttpServer,
  TYPE_HTTP_APPLICATION_FACTORY,
  HttpApplicationFactory,
  TYPE_ERROR_SERVICE,
  IErrorService
} from './types';

export const httpModule = new ContainerModule((bind) => {
  bind<IHttpServer>(TYPE_HTTP_SERVER).to(HttpServer);
  bind<IErrorService>(TYPE_ERROR_SERVICE).to(ErrorService);

  bind<HttpApplicationFactory>(TYPE_HTTP_APPLICATION_FACTORY)
    .toFactory(expressApplicationFactory);
});
