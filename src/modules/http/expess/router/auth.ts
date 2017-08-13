import { Router, Request, Response, NextFunction } from 'express';
import { parse, UrlObject } from 'url';
import { PATH_APP } from '../../../../constants';
import { PATH_AUTH_LOGOUT, PATH_AUTH_FACEBOOK_CALLBACK, PATH_AUTH_FACEBOOK } from '../../../../constants';
import { STRATEGY_FACEBOOK, Passport } from '../passport';
import { ILoggerService } from '../../../log/types';
import { AuthenticateOptions } from 'passport-facebook';

export type AuthRouterConfig = {
  passport: Passport;
  allowedRedirectOrigins: string[];
  loggerService: ILoggerService;
};

export function createAuthRouter({passport, allowedRedirectOrigins, loggerService}: AuthRouterConfig) {
  const router = Router();
  const allowedRedirectUriObjects = allowedRedirectOrigins.map(origin => parse(origin));
  const getRedirectUriFromRequest = (req: Request) => {
    let redirectUri = PATH_APP;

    if (req.query.hasOwnProperty('redirect_uri')) {
      const redirectUriObject: UrlObject = parse(req.query.redirect_uri);

      if (redirectUriObject.host === null ||
        allowedRedirectUriObjects.some((allowedRedirectUriObject) => (
          allowedRedirectUriObject.host === redirectUriObject.host
          && allowedRedirectUriObject.port === redirectUriObject.port
          && allowedRedirectUriObject.protocol === redirectUriObject.protocol
        ))
      ) {
        redirectUri = req.query.redirect_uri;
      } else {
        loggerService.debug('invalid redirect_uri parameter', req.query.redirect_uri);
      }
    }

    return redirectUri;
  };

  router.get(PATH_AUTH_LOGOUT, (req: Request & { user: object, logout: () => void }, res: Response) => {
    loggerService.debug('logging out...', req.user);
    req.logout();

    const redirectUri = getRedirectUriFromRequest(req);
    loggerService.debug('redirecting...', redirectUri);
    res.redirect(redirectUri);
  });

  router.get(
    PATH_AUTH_FACEBOOK,
    (req: Request, res: Response, next: NextFunction) => {
      const redirectUri = getRedirectUriFromRequest(req);
      loggerService.debug('logging in with facebook...', redirectUri);

      passport.authenticate(STRATEGY_FACEBOOK, <AuthenticateOptions> {
        state: JSON.stringify({redirectUri})
      })(req, res, next);
    }
  );

  router.get(
    PATH_AUTH_FACEBOOK_CALLBACK,
    passport.authenticate(STRATEGY_FACEBOOK),
    (req: Request, res: Response) => {
      loggerService.debug('logged in with facebook...');

      let redirectUri = PATH_APP;
      try {
        redirectUri = JSON.parse(req.query.state).redirectUri;
        loggerService.debug('redirecting...', redirectUri);
      } catch (e) {
        loggerService.error('session parse failed', req.query.state);
      }

      res.redirect(redirectUri);
    }
  );

  return router;
}
