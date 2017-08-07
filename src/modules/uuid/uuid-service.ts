import { injectable, inject, track } from '../../decorators';
import {
  IUuidService,
  UuidFactory,
  TYPE_UUID_FACTORY,
  UuidValidator,
  TYPE_UUID_VALIDATOR
} from './types';

@injectable()
export class UuidService implements IUuidService {
  constructor(@inject(TYPE_UUID_FACTORY) private factory: UuidFactory,
              @inject(TYPE_UUID_VALIDATOR) private validator: UuidValidator) {
  }

  @track()
  createUuid() {
    return this.factory();
  }

  @track()
  validateUuid(value: string) {
    return this.validator(value);
  }
}
