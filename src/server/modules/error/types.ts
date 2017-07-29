import { HttpError } from './errors';

export const TYPE_ERROR_SERVICE = 'TYPE_ERROR_SERVICE';

export interface IErrorService {
  createHttpError(error: Error): HttpError;
}
