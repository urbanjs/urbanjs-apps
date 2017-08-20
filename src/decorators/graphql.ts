import 'reflect-metadata';

export const METADATA_KEY_GRAPHQL_RESOLVER = 'METADATA_KEY_GRAPHQL_RESOLVER';

export type ResolverOptions = {
  host: string;
};

export function resolver(options: ResolverOptions): MethodDecorator {
  return (target: object, propertyKey: string, descriptor: PropertyDescriptor) => {
    if (typeof target[propertyKey] !== 'function') {
      throw new Error('@resolver() decorator can be used for methods only');
    }

    descriptor.enumerable = true;
    Reflect.defineMetadata(METADATA_KEY_GRAPHQL_RESOLVER, options, target, propertyKey);
  };
}
