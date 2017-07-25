import { ContainerModule } from 'inversify';
import { HttpServer } from '../injectables';
import { TYPE_HTTP_SERVER, IHttpServer } from '../types';

export const httpModule = new ContainerModule((bind) => {
  bind<IHttpServer>(TYPE_HTTP_SERVER).to(HttpServer);
});
