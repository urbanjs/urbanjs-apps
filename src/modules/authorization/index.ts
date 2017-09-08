import { ContainerModule } from 'inversify';
import { AuthorizationService } from './authorization-service';
import {
  IAuthorizationService,
  TYPE_AUTHORIZATION_SERVICE
} from './types';

export const authorizationModule = new ContainerModule((bind) => {
  bind<IAuthorizationService>(TYPE_AUTHORIZATION_SERVICE).to(AuthorizationService);
});
