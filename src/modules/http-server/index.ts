import { ContainerModule } from 'inversify';
import { HttpServer } from './http-server';
import { ExpressApplicationBuilder } from './express-application-builder';
import {
  TYPE_HTTP_SERVER,
  IHttpServer,
  TYPE_HTTP_APPLICATION_BUILDER,
  IHttpApplicationBuilder
} from './types';

export const httpServerModule = new ContainerModule((bind) => {
  bind<IHttpServer>(TYPE_HTTP_SERVER).to(HttpServer);
  bind<IHttpApplicationBuilder>(TYPE_HTTP_APPLICATION_BUILDER).to(ExpressApplicationBuilder);
});
