import { HttpError, ValidationError } from './errors';

export const TYPE_ERROR_SERVICE = 'TYPE_ERROR_SERVICE';

export interface IErrorService {
  createHttpError(error: Error): HttpError;
  createValidationError(error: Error): ValidationError;
}
