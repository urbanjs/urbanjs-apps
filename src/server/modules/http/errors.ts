import { inherits } from 'util';

export class HttpError {
  public message: string;
  public statusCode: number;
  public headers: Object;
  public innerError: Error;

  constructor(message: string, code: number) {
    this.message = message || 'No message';
    this.statusCode = code;

    this.headers = {};
    this.innerError = new Error(message);
  }

  public toResponse(includeInnerError: boolean = false): { message: string, innerError?: object } {
    const error = {
      message: this.message
    };

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
