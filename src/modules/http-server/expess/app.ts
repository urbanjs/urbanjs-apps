import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as cors from 'cors';
import session = require('cookie-session');

export type AppConfig = {
  sessionSecret: string;
  corsAllowedOriginPatterns: string[];
};

export function createApp({sessionSecret, corsAllowedOriginPatterns}: AppConfig) {
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
    name: 'zvapp.sid',
    secret: sessionSecret,
    signed: true,
    httpOnly: true,
    sameSite: true,
    overwrite: true,
    maxAge: 0,

    // TODO: https would be required
    // https://expressjs.com/en/guide/behind-proxies.html
    // secure: true,
  }));

  return app;
}
