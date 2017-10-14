import { inherits } from 'util';

export class BaseError {
  constructor(public message: string) {
    Error.captureStackTrace(this, this.constructor);
  }
}

// we can not extend built-in classes
// by `extends` syntax as we are using babel
inherits(BaseError, Error);

export type ErrorDetail = {
  message: string;
  target: string;
};

export type HttpErrorResponse = {
  message: string;
  innerError?: {
    message: string;
    stack: string
  },
  details?: ErrorDetail[];
};

export class HttpError extends BaseError {
  public headers: Object = {};
  public innerError: Error;

  constructor(public message: string, public statusCode: number, public details?: ErrorDetail[]) {
    super(message);
  }

  public toResponse(includeInnerError: boolean = false): HttpErrorResponse {
    const error = {message: this.message};

    if (includeInnerError === true && this.innerError) {
      Object.assign(error, {
        innerError: {
          message: this.innerError.message,
          stack: this.innerError.stack
        }
      });
    }

    if (this.details) {
      Object.assign(error, {details: this.details});
    }

    return error;
  }
}

export class ValidationError extends BaseError {
  constructor(public message: string, public details?: ErrorDetail[]) {
    super(message);
  }
}

export class ForbiddenError extends BaseError {
  constructor(public message: string = 'forbidden') {
    super(message);
  }
}

export class ImplementationError extends BaseError {
  constructor(public message: string = 'oh_uh') {
    super(message);
  }
}

export class NotFoundError extends BaseError {
  constructor(public message: string = 'not_found') {
    super(message);
  }
}
