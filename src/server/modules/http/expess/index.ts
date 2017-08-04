import {
  PATH_API,
  PATH_AUTH,
  PATH_AUTH_FACEBOOK,
  PATH_AUTH_FACEBOOK_CALLBACK,
  PATH_GRAPHQL
} from '../../../../constants';
import { IUserService } from '../../user/types';
import { ILoggerService } from '../../log/types';
import { GraphqlResolvers, GraphqlTypeDefs } from '../../graphql/types';
import { IErrorService } from '../../error/types';
import { HttpServerConfig, IHttpController } from '../types';
import { createApp, AppConfig } from './app';
import { createPassport, PassportConfig, Passport } from './passport';
import { createErrorHandler, ErrorHandlerConfig } from './error';
import {
  createApiRouter,
  ApiRouterConfig,
  createStaticRouter,
  StaticRouterConfig,
  createAppRouter,
  AppRouterConfig,
  createAuthRouter,
  createGraphqlRouter,
  GraphqlRouterConfig
} from './router';

export type ExpressApplicationConfig = HttpServerConfig & {
  graphqlResolvers: GraphqlResolvers,
  graphqlTypeDefs: GraphqlTypeDefs,
  apiControllers: IHttpController[],
  loggerService: ILoggerService,
  errorService: IErrorService,
  userService: IUserService
};

export function createExpressApplication(config: ExpressApplicationConfig) {
  const app = createApp(config as AppConfig);
  const passport = createPassport(Object.assign({}, config, {
    facebookCallbackURL: `${config.hostOrigin}${PATH_AUTH}${PATH_AUTH_FACEBOOK}${PATH_AUTH_FACEBOOK_CALLBACK}`
  }) as PassportConfig);

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(PATH_API, createApiRouter(config as ApiRouterConfig));

  const graphqlRouterPrefix = PATH_GRAPHQL;
  app.use(graphqlRouterPrefix, createGraphqlRouter(Object.assign({}, config, {
    routerPrefix: graphqlRouterPrefix
  }) as GraphqlRouterConfig));

  const authRouterPrefix = PATH_AUTH;
  app.use(authRouterPrefix, createAuthRouter(Object.assign({}, config, {
    routerPrefix: authRouterPrefix,
    passport: passport as Passport
  })));

  app.use(createStaticRouter(config as StaticRouterConfig));

  app.use(createAppRouter(config as AppRouterConfig));

  app.use(createErrorHandler(config as ErrorHandlerConfig));

  return app;
}
