import { Router } from 'express';
import { STRATEGY_FACEBOOK, Passport } from '../passport';

export type AuthRouterConfig = {
  passport: Passport;
  routerPrefix: string;
};

export function createAuthRouter({passport}: AuthRouterConfig) {
  const router = Router();

  router.get('/facebook', passport.authenticate(STRATEGY_FACEBOOK));
  router.get('/facebook/callback', passport.authenticate(STRATEGY_FACEBOOK, {
    successRedirect: '/',
    failureRedirect: '/'
  }));

  return router;
}
