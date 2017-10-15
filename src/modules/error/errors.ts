import { inherits } from 'util';

export const NO_STACK_TRACE = 'no stack trace is available';

export type ErrorDetail = { [key: string]: string };

export class BaseError {
  public stack: string;
  public details: ErrorDetail[] = [];

  constructor(public message: string) {
    Error.captureStackTrace(this, this.constructor);
  }
}

// we can not extend built-in classes
// by `extends` syntax as we are using babel
inherits(BaseError, Error);

export type HttpErrorResponse = {
  message: string;
  details?: ErrorDetail[];
  innerError?: {
    message: string;
    stack: string
  };
};

export class HttpError extends BaseError {
  public headers: Object = {};
  public innerError: BaseError;

  constructor(public message: string, public statusCode: number) {
    super(message);
  }

  public toResponse(includeInnerError: boolean = false): HttpErrorResponse {
    const error: HttpErrorResponse = {
      message: this.message
    };

    if (this.details.length) {
      error.details = this.details;
    }

    if (includeInnerError === true && this.innerError) {
      error.innerError = {
        message: this.innerError.message,
        stack: this.innerError.stack
      };
    }

    return error;
  }
}

export class ValidationError extends BaseError {
  constructor(public message: string) {
    super(message);
  }
}

export class ForbiddenError extends BaseError {
  constructor(public message: string = 'Forbidden') {
    super(message);
  }
}

export class ImplementationError extends BaseError {
  constructor(public message: string = 'Unexpected Error') {
    super(message);
  }
}

export class NotFoundError extends BaseError {
  constructor(public message: string = 'Not Found') {
    super(message);
  }
}
