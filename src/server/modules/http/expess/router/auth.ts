import { Router, Request, Response } from 'express';
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

  router.get('/facebook', passport.authenticate(STRATEGY_FACEBOOK));
  router.get('/facebook/callback', passport.authenticate(STRATEGY_FACEBOOK, {
    successRedirect: '/',
    failureRedirect: '/'
  }));

  return router;
}
