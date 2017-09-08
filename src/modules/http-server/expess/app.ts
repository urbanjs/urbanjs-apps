import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as cors from 'cors';
import session = require('cookie-session');

export type AppConfig = {
  sessionSecret: string;
  corsAllowedOrigins: string;
};

export function createApp({sessionSecret, corsAllowedOrigins}: AppConfig) {
  const app = express();

  app.use(cors({
    origin: corsAllowedOrigins.split(', '),
    credentials: true
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
