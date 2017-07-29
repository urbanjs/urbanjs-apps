import { ContainerModule } from 'inversify';
import { HttpServer } from './http-server';
import { expressApplicationFactory } from './express-application-factory';
import {
  TYPE_HTTP_SERVER,
  IHttpServer,
  TYPE_HTTP_APPLICATION_FACTORY,
  HttpApplicationFactory
} from './types';

export const httpModule = new ContainerModule((bind) => {
  bind<IHttpServer>(TYPE_HTTP_SERVER).to(HttpServer);

  bind<HttpApplicationFactory>(TYPE_HTTP_APPLICATION_FACTORY)
    .toFactory(expressApplicationFactory);
});
