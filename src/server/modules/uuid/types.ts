export const TYPE_UUID_FACTORY = 'TYPE_UUID_FACTORY';
export const TYPE_UUID_VALIDATOR = 'TYPE_UUID_VALIDATOR';
export const TYPE_UUID_SERVICE = 'TYPE_UUID_SERVICE';

export type Guid = string;

export type UuidFactory = () => Guid;
export type UuidValidator = (value: string) => boolean;

export interface IUuidService {
  createUuid(): Guid;
  validateUuid(value: string): boolean;
}
