export const TYPE_JWT_SERVICE_CONFIG = 'TYPE_JWT_SERVICE_CONFIG';
export const TYPE_JWT_SERVICE = 'TYPE_JWT_SERVICE';
export const TYPE_JWT_DRIVER = 'TYPE_JWT_DRIVER';

export type JWTDriver = {
  sign(payload: object, secret: string): string;
  verify<T extends object | string>(token: string, secret: string): T;
  isTokenExpiredError(e: Error): boolean;
};

export type JWTServiceConfig = {
  jwtSignatureSecret: string;
};

export type JWTPayload = { [key: string]: string };

export interface IJWTService {
  sign(payload: JWTPayload): string;
  verify<T extends JWTPayload>(token: string): T;
}
