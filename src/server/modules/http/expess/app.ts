import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as cors from 'cors';
import * as express from 'express';

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
  app.use(session({
    secret: sessionSecret,
    name: 'zvapp.sid',
    cookie: {
      httpOnly: true,
      sameSite: 'strict',
      // secure: true, // TODO: https would be required
    },
    // store: 'MemoryStore', // TODO: use redis in production
    resave: true,
    saveUninitialized: true
  }));

  return app;
}
