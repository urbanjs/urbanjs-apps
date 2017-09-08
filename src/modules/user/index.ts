import { ContainerModule } from 'inversify';
import { UserService } from './user-service';
import { TYPE_USER_SERVICE, IUserService } from './types';

export const userModule = new ContainerModule((bind) => {
  bind<IUserService>(TYPE_USER_SERVICE).to(UserService);
});
