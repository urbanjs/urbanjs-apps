export const TYPE_HTTP_APPLICATION_FACTORY = 'TYPE_HTTP_APPLICATION_FACTORY';
export const TYPE_HTTP_SERVER = 'TYPE_HTTP_SERVER';
export const TYPE_HTTP_CONFIG = 'TYPE_HTTP_CONFIG';
export const TYPE_HTTP_CONTROLLER = 'TYPE_HTTP_CONTROLLER';

export interface IHttpApplication {
  listen(port: number, cb: (err?: Error) => void): void;
}

export type HttpServerConfig = {
  port: number;
  host: string;
  enableGraphQLEditor: boolean;
  absolutePublicPath: string;
  relativePublicPath: string;
  sessionSecret: string;
  facebookAppId: string;
  facebookAppSecret: string;
};

export type HttpApplicationFactory = (config: HttpServerConfig) => IHttpApplication;

export interface IHttpServer {
  start(): Promise<void>;
}

export type HttpHeaders = {
  [key: string]: string | string[];
};

export type HttpControllerRequestParams = {
  params: { [key: string]: string };
  query: { [key: string]: string };
  payload: object;
  headers: HttpHeaders;
  remoteAddress: string;
};

export type HttpControllerResponse = {
  statusCode: number;
  payload: object;
};

export interface IHttpController {
}
