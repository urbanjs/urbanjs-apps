import { interfaces  as inversify } from 'inversify';
import { IUserService, TYPE_USER_SERVICE } from '../user/types';
import { TYPE_SERVICE_LOGGER, ILoggerService } from '../log/types';
import { IErrorService, TYPE_ERROR_SERVICE } from '../error/types';
import { IFacebookApiService, TYPE_FACEBOOK_API_SERVICE } from '../facebook/types';
import {
  TYPE_GRAPHQL_RESOLVER_MAP,
  GraphqlResolverMap,
  TYPE_GRAPHQL_TYPE_DEFS,
  GraphqlTypeDefs
} from '../graphql/types';
import {
  TYPE_HTTP_CONTROLLER,
  IHttpController,
  HttpApplicationFactory,
  HttpServerConfig
} from './types';
import { createExpressApplication } from './expess';

export const expressApplicationFactory: inversify.FactoryCreator<HttpApplicationFactory> =
  (context: inversify.Context) =>
    (config: HttpServerConfig) =>
      createExpressApplication(Object.assign({}, config, {
        graphqlResolvers: context.container.get<GraphqlResolverMap>(TYPE_GRAPHQL_RESOLVER_MAP),
        graphqlTypeDefs: context.container.get<GraphqlTypeDefs>(TYPE_GRAPHQL_TYPE_DEFS),
        apiControllers: context.container.getAll<IHttpController>(TYPE_HTTP_CONTROLLER),
        loggerService: context.container.get<ILoggerService>(TYPE_SERVICE_LOGGER),
        errorService: context.container.get<IErrorService>(TYPE_ERROR_SERVICE),
        userService: context.container.get<IUserService>(TYPE_USER_SERVICE),
        facebookApiService: context.container.get<IFacebookApiService>(TYPE_FACEBOOK_API_SERVICE)
      }));
