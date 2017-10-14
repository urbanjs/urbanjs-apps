import { ContainerModule } from 'inversify';
import { HttpService } from './http-service';
import { TYPE_HTTP_SERVICE, IHttpService } from './types';

export const httpModule = new ContainerModule((bind) => {
  bind<IHttpService>(TYPE_HTTP_SERVICE).to(HttpService);
});
