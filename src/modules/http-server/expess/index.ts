import { PATH_AUTH_FACEBOOK_CALLBACK } from '../../../constants';
import { IJWTService } from '../../jwt/types';
import { IUserService } from '../../user/types';
import { ILoggerService } from '../../log/types';
import { GraphqlResolverMap, GraphqlTypeDefs } from '../../graphql/types';
import { IErrorService } from '../../error/types';
import { IFacebookApiService } from '../../facebook/types';
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
  GraphqlRouterConfig,
  AuthRouterConfig
} from './router';

export type ExpressApplicationConfig = HttpServerConfig & {
  graphqlResolvers: GraphqlResolverMap;
  graphqlTypeDefs: GraphqlTypeDefs;
  apiControllers: IHttpController[];
  loggerService: ILoggerService;
  errorService: IErrorService;
  userService: IUserService;
  jwtService: IJWTService;
  facebookApiService: IFacebookApiService;
};

export function createExpressApplication(config: ExpressApplicationConfig) {
  const app = createApp(config as AppConfig);
  const passport = createPassport(Object.assign({}, config, {
    facebookCallbackURL: `${config.serverOrigin}${PATH_AUTH_FACEBOOK_CALLBACK}`,
    state: true
  }) as PassportConfig);

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(createAuthRouter(Object.assign({}, config, {
    passport: passport as Passport,
    allowedRedirectOrigins: [
      config.serverOrigin,
      ...config.corsAllowedOrigins.split(', ')
    ]
  }) as AuthRouterConfig));

  app.use(createGraphqlRouter(config as GraphqlRouterConfig));

  app.use(createApiRouter(config as ApiRouterConfig));

  app.use(createStaticRouter(config as StaticRouterConfig));

  app.use(createAppRouter(config as AppRouterConfig));

  app.use(createErrorHandler(config as ErrorHandlerConfig));

  return app;
}