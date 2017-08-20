import { ContainerModule } from 'inversify';
import { HealthController } from './health-controller';
import { TYPE_HTTP_CONTROLLER, IHttpController } from '../http-server/types';

export const monitorModule = new ContainerModule((bind) => {
  bind<IHttpController>(TYPE_HTTP_CONTROLLER).to(HealthController);
});
