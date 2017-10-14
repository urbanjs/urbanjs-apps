import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as cors from 'cors';
import * as csrf from 'csurf';
import session = require('cookie-session');
import { parse as parseUrl } from 'url';
import { ForbiddenError } from '../../error/errors';
import {
  SESSION_KEY,
  CSRF_TOKEN_KEY,
  PATH_API_REPORT_ERROR,
  PATH_GRAPHQL_PLAYGROUND
} from '../../../constants';
import { ILoggerService } from '../../log/types';

export type AppConfig = {
  sessionSecret: string;
  corsAllowedOriginPatterns: string[];
  loggerService: ILoggerService;
};

export function createApp({sessionSecret, corsAllowedOriginPatterns, loggerService}: AppConfig) {
  const app = express();

  const corsPatterns: RegExp[] = corsAllowedOriginPatterns
    .map(pattern => new RegExp(pattern));

  app.use(cors({
    credentials: true,
    origin: (origin: string, next: (err: Error | null, allow?: boolean) => void) => {
      next(null, corsPatterns.some(pattern => pattern.test(origin)));
    }
  }));

  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

  app.use(session(<CookieSessionInterfaces.CookieSessionOptions> {
    name: SESSION_KEY,
    secret: sessionSecret,
    signed: true,
    httpOnly: true,
    sameSite: true,
    overwrite: true,
    maxAge: 0
  }));

  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    const currentCsrfTokenSecret = req.session.csrfSecret;
    const csrfOptions = {
      cookie: false,
      ignoreMethods: ['GET', 'OPTION', 'PATCH'],
      value: (req2: express.Request) => Array.prototype.concat(req2.headers[CSRF_TOKEN_KEY])[0]
    };

    csrf(csrfOptions)(req, res, (rawErr) => {
      // token secret is stored within the session cookie
      // and send the actual token within a non-http-only cookie
      // to let the client send it back within the headers (double submit)
      res.cookie(CSRF_TOKEN_KEY, req.csrfToken(), {
        httpOnly: false,
        sameSite: 'strict'
      });

      let error;
      if (rawErr) {
        const refererUrl: string = Array.prototype.concat(req.headers.referer)[0];
        const refererPath = refererUrl && parseUrl(refererUrl).pathname;
        const requestPath = parseUrl(req.originalUrl).pathname;

        if (refererPath !== PATH_GRAPHQL_PLAYGROUND &&
          requestPath !== PATH_API_REPORT_ERROR &&
          typeof currentCsrfTokenSecret !== 'undefined') {
          loggerService.debug('forbidden - csrf token invalid', {
            refererPath,
            requestPath,
            currentCsrfTokenSecret
          });

          error = new ForbiddenError();
        }
      }

      next(error);
    });
  });

  return app;
}
