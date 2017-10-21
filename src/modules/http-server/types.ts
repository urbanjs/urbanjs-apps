import { HttpHeaders } from '../http/types';

export const TYPE_HTTP_APPLICATION_BUILDER = 'TYPE_HTTP_APPLICATION_BUILDER';
export const TYPE_HTTP_SERVER = 'TYPE_HTTP_SERVER';
export const TYPE_HTTP_CONFIG = 'TYPE_HTTP_CONFIG';
export const TYPE_HTTP_CONTROLLER = 'TYPE_HTTP_CONTROLLER';

export interface IHttpApplication {
  listen(port: number, cb: (err?: Error) => void): void;
  close(cb?: () => void): void;
  address(): { port: number };
}

export type HttpServerConfig = {
  port: number;
  corsAllowedOriginPatterns: string[];
  includeInnerError: boolean;
  enableGraphQLEditor: boolean;
  absolutePublicPath: string;
  relativePublicPath: string;
  sessionSecret: string;
  facebookAppId: string;
  facebookAppSecret: string;
  useSecureCookies: boolean;
  cookieDomain: string;
};

export interface IHttpApplicationBuilder {
  create(): IHttpApplication;
}

export interface IHttpServer {
  stop(): Promise<void>;
  start(): Promise<{ origin: string }>;
}

export type HttpControllerRequestParams<T = object> = {
  params: { [key: string]: string };
  query: { [key: string]: string };
  payload: T;
  headers: HttpHeaders;
  remoteAddress: string;
};

export type HttpControllerResponse = {
  statusCode?: number;
  payload?: object;
  headers?: HttpHeaders;
};

export interface IHttpController {
}
