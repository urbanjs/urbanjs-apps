import { injectable, inject, track } from '../../decorators';
import { ILoggerService, TYPE_SERVICE_LOGGER } from '../log/types';
import { HttpError, ValidationError } from './errors';
import { IErrorService } from './types';

@injectable()
export class ErrorService implements IErrorService {
  constructor(@inject(TYPE_SERVICE_LOGGER) private loggerService: ILoggerService) {
  }

  @track()
  createHttpError(rawError: Error): HttpError {
    if (rawError instanceof HttpError) {
      return rawError as HttpError;
    } else if (!(rawError instanceof Error)) {
      this.loggerService.debug(`${this.constructor.name}.createHttpError invalid-error-object`, rawError);

      rawError = new Error(`${rawError}`);
    }

    const httpError = new HttpError(
      'Internal Server Error',
      500
    );

    httpError.innerError = rawError;

    return httpError;
  }

  @track()
  createValidationError(rawError: Error): ValidationError {
    if (rawError instanceof ValidationError) {
      return rawError as ValidationError;
    } else if (!(rawError instanceof Error)) {
      this.loggerService.debug(`${this.constructor.name}.createValidatorError invalid-error-object`, rawError);

      rawError = new Error(`${rawError}`);
    }

    const validationError = new ValidationError(rawError.message);
    validationError.innerError = rawError;

    return validationError;
  }
}
