import { inherits } from 'util';

export type HttpErrorResponse = {
  message: string;
  innerError?: {
    message: string;
    stack: string
  }
};

export class HttpError {
  public headers: Object = {};
  public innerError: Error;

  constructor(public message: string, public statusCode: number) {
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

    return error;
  }
}

inherits(HttpError, Error);

export class ValidationError {
  public innerError: Error;

  constructor(public message: string) {
  }
}

inherits(ValidationError, Error);
