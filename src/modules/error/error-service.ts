import { injectable, inject, track } from '../../decorators';
import { ILoggerService, TYPE_SERVICE_LOGGER } from '../log/types';
import {
  HttpError,
  NotFoundError,
  ForbiddenError,
  ValidationError,
  BaseError,
  NO_STACK_TRACE
} from './errors';
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
  createHttpError(rawError: Error | BaseError): HttpError {
    if (rawError instanceof HttpError) {
      return rawError as HttpError;
    }

    let baseError: BaseError;
    if (!(rawError instanceof Error)) {
      this.loggerService.debug(`${this.constructor.name}.createHttpError invalid-error-object`, rawError);

      try {
        baseError = new BaseError(JSON.stringify(rawError));
      } catch (e) {
        baseError = new BaseError(`${rawError}`);
      }
      baseError.stack = NO_STACK_TRACE;
    } else if (!(rawError instanceof BaseError)) {
      baseError = new BaseError(rawError.message);
      baseError.stack = rawError.stack || NO_STACK_TRACE;
    } else {
      baseError = rawError;
    }

    let httpError: HttpError;
    if (Object.getPrototypeOf(baseError) === ValidationError.prototype) {
      httpError = new HttpError(
        baseError.message,
        400
      );
    } else if (Object.getPrototypeOf(baseError) === ForbiddenError.prototype) {
      httpError = new HttpError(
        baseError.message,
        401
      );
      httpError.details = baseError.details;
    } else if (Object.getPrototypeOf(baseError) === NotFoundError.prototype) {
      httpError = new HttpError(
        baseError.message,
        404
      );
      httpError.details = baseError.details;
    } else {
      httpError = this.createHttpErrorFromStatusCode(500);
    }

    httpError.innerError = baseError;

    return httpError;
  }

  @track()
  createHttpErrorFromStatusCode(statusCode: number) {
    return new HttpError(this.statuses[statusCode] || 'Internal server error', statusCode || 500);
  }
}
