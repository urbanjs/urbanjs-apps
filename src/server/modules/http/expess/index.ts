import { ILoggerService } from '../../log/types';
import { HttpServerConfig, IHttpController } from '../types';
import { createApp, AppConfig } from './app';
import { createPassport, PassportConfig, Passport } from './passport';
import {
  createApiRouter,
  ApiRouterConfig,
  createStaticRouter,
  StaticRouterConfig,
  createAppRouter,
  AppRouterConfig,
  createAuthRouter
} from './router';

export type ExpressApplicationConfig = HttpServerConfig & {
  apiControllers: IHttpController[],
  loggerService: ILoggerService
};

export function createExpressApplication(config: ExpressApplicationConfig) {
  const app = createApp(<AppConfig> config);
  const passport = createPassport(<PassportConfig> Object.assign({}, config, {
    facebookCallbackURL: `http://${config.host}:${config.port}/auth/facebook/callback`
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/api/v1', createApiRouter(<ApiRouterConfig> config));
  app.use('/auth', createAuthRouter({passport: <Passport> passport}));
  app.use(createStaticRouter(<StaticRouterConfig> config));
  app.use(createAppRouter(<AppRouterConfig> config));

  return app;
}
