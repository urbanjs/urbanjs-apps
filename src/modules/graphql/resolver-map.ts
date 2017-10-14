import 'reflect-metadata';
import { interfaces as inversify } from 'inversify';
import { GraphQLDateTime, GraphQLEmail } from 'graphql-custom-types';
import { METADATA_KEY_GRAPHQL_RESOLVER, ResolverOptions } from '../../decorators/graphql';
import { TYPE_SERVICE_LOGGER, ILoggerService } from '../log/types';
import { TYPE_GRAPHQL_RESOLVER, GraphqlResolverContext, GraphqlRootValue } from './types';

export const resolverMap = ({container}: inversify.Context) => {
  const loggerService = container.get<ILoggerService>(TYPE_SERVICE_LOGGER);
  const resolvers = {
    Email: GraphQLEmail,
    Date: GraphQLDateTime
  };

  container.getAll(TYPE_GRAPHQL_RESOLVER).forEach((resolver: object) => {
    Object.keys(resolver.constructor.prototype).forEach((methodName) => {
      if (typeof resolver[methodName] !== 'function') {
        return;
      }

      const resolverOptions: ResolverOptions = Reflect.getMetadata(
        METADATA_KEY_GRAPHQL_RESOLVER,
        resolver,
        methodName
      );

      if (resolverOptions) {
        const debugPrefix = `${resolver.constructor.name}.${methodName}`;
        loggerService.debug(`adding ${debugPrefix} to`, resolverOptions);

        resolvers[resolverOptions.host] = resolvers[resolverOptions.host] || {};
        resolvers[resolverOptions.host][resolverOptions.target] =
          async (obj: GraphqlRootValue | object, args: object, context: GraphqlResolverContext) => {
            loggerService.debug(`executing ${debugPrefix}...`);

            // TODO: json schema validation based on the annotation

            try {
              const result = await resolver[methodName](obj, args, context);
              loggerService.debug(`execution of ${debugPrefix} returned with`, result);
              return result;
            } catch (e) {
              loggerService.error(`execution of ${debugPrefix} failed`, e);
              throw e;
            }
          };
      }
    });
  });

  return resolvers;
};
