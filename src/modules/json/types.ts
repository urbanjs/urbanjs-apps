import { ValidationError } from '../error/errors';

export const TYPE_JSON_SERVICE = 'TYPE_JSON_SERVICE';
export const TYPE_AJV_DRIVER = 'TYPE_AJV_DRIVER';

export type AJVDriver = {
  errors?: {
    keyword: string;
    dataPath: string;
    message?: string;
  }[];

  validate(schema: object, data: object): boolean;
};

export type ValidationResult = {
  isValid: boolean;
  errors: ValidationError[];
};

export interface IJSONService {
  validate(value: object, schema: object): ValidationResult;
}
