import { Router, Request, Response } from 'express';
import { PATH_AUTH_FACEBOOK_CALLBACK, PATH_AUTH_FACEBOOK } from '../../../../constants';
import { STRATEGY_FACEBOOK, Passport } from '../passport';
import { ILoggerService } from '../../../log/types';

export type AuthRouterConfig = {
  passport: Passport;
  routerPrefix: string;
  loggerService: ILoggerService
};

export function createAuthRouter({passport, loggerService}: AuthRouterConfig) {
  const router = Router();

  router.get('/logout', (req: Request & { user: object, logout: () => void }, res: Response) => {
    loggerService.debug('logging out...', req.user);

    req.logout();
    res.redirect('/');
  });

  router.get(
    PATH_AUTH_FACEBOOK,
    passport.authenticate(STRATEGY_FACEBOOK)
  );

  router.get(
    `${PATH_AUTH_FACEBOOK}${PATH_AUTH_FACEBOOK_CALLBACK}`,
    passport.authenticate(STRATEGY_FACEBOOK, {
      successRedirect: '/',
      failureRedirect: '/'
    })
  );

  return router;
}
