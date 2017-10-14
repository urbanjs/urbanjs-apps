import { injectable, inject, track } from '../../decorators';
import { ILoggerService, TYPE_SERVICE_LOGGER } from '../log/types';
import { HttpError, NotFoundError, ForbiddenError, ValidationError } from './errors';
import {
  HttpMessagesByStatusCode, IErrorService,
  TYPE_HTTP_MESSAGES_BY_STATUS_CODE
} from './types';

@injectable()
export class ErrorService implements IErrorService {
  constructor(@inject(TYPE_SERVICE_LOGGER) private loggerService: ILoggerService,
              @inject(TYPE_HTTP_MESSAGES_BY_STATUS_CODE) private statuses: HttpMessagesByStatusCode) {
  }

  @track()
  createHttpError(rawError: Error): HttpError {
    if (rawError instanceof HttpError) {
      return rawError as HttpError;
    } else if (!(rawError instanceof Error)) {
      this.loggerService.debug(`${this.constructor.name}.createHttpError invalid-error-object`, rawError);

      rawError = new Error(`${rawError}`);
    }

    let httpError: HttpError;
    if (Object.getPrototypeOf(rawError) === ValidationError.prototype) {
      httpError = new HttpError(
        rawError.message,
        400,
        (<ValidationError> rawError).details
      );
    } else if (Object.getPrototypeOf(rawError) === ForbiddenError.prototype) {
      httpError = new HttpError(
        rawError.message,
        401
      );
    } else if (Object.getPrototypeOf(rawError) === NotFoundError.prototype) {
      httpError = new HttpError(
        rawError.message,
        404
      );
    } else {
      httpError = new HttpError(
        'Internal Server Error',
        500
      );
    }

    httpError.innerError = rawError;

    return httpError;
  }

  @track()
  createHttpErrorFromStatusCode(statusCode: number) {
    return new HttpError(this.statuses[statusCode] || 'Internal server error', statusCode || 500);
  }
}
