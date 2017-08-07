import { injectable, inject, track } from '../../decorators';
import { ILoggerService, TYPE_SERVICE_LOGGER } from '../log/types';
import { HttpError } from './errors';
import { IErrorService } from './types';

@injectable()
export class ErrorService implements IErrorService {
  constructor(@inject(TYPE_SERVICE_LOGGER) private loggerService: ILoggerService) {
  }

  @track()
  createHttpError(error: Error): HttpError {
    if (error instanceof HttpError) {
      return error as HttpError;
    } else if (!(error instanceof Error)) {
      this.loggerService.debug(`${this.constructor.name}.createHttpError invalid-error-object`, error);

      error = new Error(`${error}`);
    }

    const httpError = new HttpError(
      'Internal Server Error',
      500
    );

    httpError.innerError = error;

    return httpError;
  }
}
