export const TYPE_ROUTE_SERVICE = 'TYPE_ROUTE_SERVICE';
export const TYPE_ROUTE_SERVICE_CONFIG = 'TYPE_ROUTE_SERVICE_CONFIG';

export type RouterServiceConfig = {
  appOrigin: string;
  serverOrigin: string;
};

export type FormatOptions = {
  prefixWithOrigin?: boolean;
  params?: object
};

export interface IRouteService {
  format(path: string, options?: FormatOptions): string;
  isPathKnown(path: string): boolean;
}
