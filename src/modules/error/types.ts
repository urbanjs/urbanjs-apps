import { HttpError, BaseError } from './errors';

export const TYPE_ERROR_SERVICE = 'TYPE_ERROR_SERVICE';
export const TYPE_HTTP_MESSAGES_BY_STATUS_CODE = 'TYPE_HTTP_MESSAGES_BY_STATUS_CODE';

export type HttpMessagesByStatusCode = {
  [key: number]: string | undefined;
};

export interface IErrorService {
  createHttpError(error: Error | BaseError): HttpError;
  createHttpErrorFromStatusCode(statusCode: number): HttpError;
}
