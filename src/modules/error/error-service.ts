import { injectable, inject, track } from '../../decorators';
import { ILoggerService, TYPE_SERVICE_LOGGER } from '../log/types';
import { HttpError } from './errors';
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
}
