import { injectable, track, inject } from '../../decorators';
import { ValidationError } from '../error/errors';
import {
  TYPE_SERVICE_LOGGER,
  ILoggerService
} from '../log/types';
import {
  AJVDriver,
  IJSONService,
  TYPE_AJV_DRIVER,
  ValidationResult
} from './types';

@injectable()
export class JSONService implements IJSONService {
  constructor(@inject(TYPE_AJV_DRIVER) private ajv: AJVDriver,
              @inject(TYPE_SERVICE_LOGGER) private loggerService: ILoggerService) {
  }

  @track()
  public validate(value: object, schema: object): ValidationResult {
    try {
      const isValid = this.ajv.validate(schema, value);
      const errors = (this.ajv.errors || []).map(e => {
        const target = e.dataPath.substring(1) || 'Given object';
        return new ValidationError(`${target} ${e.message || ''}`);
      });

      return {isValid, errors};
    } catch (error) {
      this.loggerService.error('unexpected error during validation', error);

      return {
        isValid: false,
        errors: []
      };
    }
  }
}
