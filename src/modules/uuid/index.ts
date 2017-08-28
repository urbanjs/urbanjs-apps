import { ContainerModule } from 'inversify';
import * as uuid from 'uuid/v4';
import * as uuidValidate from 'uuid-validate';
import { UuidService } from './uuid-service';
import {
  TYPE_UUID_FACTORY,
  UuidFactory,
  TYPE_UUID_SERVICE,
  IUuidService,
  TYPE_UUID_VALIDATOR,
  UuidValidator
} from './types';

export const uuidModule = new ContainerModule((bind) => {
  bind<UuidFactory>(TYPE_UUID_FACTORY).toFunction(uuid);
  bind<UuidValidator>(TYPE_UUID_VALIDATOR).toFunction((val) => uuidValidate(val, 4));
  bind<IUuidService>(TYPE_UUID_SERVICE).to(UuidService);
});
