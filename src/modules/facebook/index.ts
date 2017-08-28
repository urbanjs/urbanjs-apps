import { ContainerModule } from 'inversify';
import { FacebookApiService } from './api-service';
import {
  TYPE_FACEBOOK_API_SERVICE,
  IFacebookApiService
} from './types';

export const facebookModule = new ContainerModule((bind) => {
  bind<IFacebookApiService>(TYPE_FACEBOOK_API_SERVICE).to(FacebookApiService);
});
