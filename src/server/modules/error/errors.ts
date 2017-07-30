import { inherits } from 'util';

export type ErrorResponse = {
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

  public toResponse(includeInnerError: boolean = false): ErrorResponse {
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
