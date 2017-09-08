import 'reflect-metadata';

export const METADATA_KEY_HTTP_ROUTE = 'METADATA_KEY_HTTP_ROUTE';

export type HttpRouteOptions = {
  method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';
  path: string;
};

export function httpRoute(options: HttpRouteOptions): MethodDecorator {
  return (target: object, propertyKey: string, descriptor: PropertyDescriptor) => {
    if (typeof target[propertyKey] !== 'function') {
      throw new Error('@httpRoute() decorator can be used for methods only');
    }

    descriptor.enumerable = true;
    Reflect.defineMetadata(METADATA_KEY_HTTP_ROUTE, options, target, propertyKey);
  };
}
