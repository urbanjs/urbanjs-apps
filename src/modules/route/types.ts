export const TYPE_ROUTE_SERVICE = 'TYPE_ROUTE_SERVICE';

export type FormatOptions = {
  params: object
};

export interface IRouteService {
  format(path: string, options: FormatOptions): string;
}
