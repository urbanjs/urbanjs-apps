import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as cors from 'cors';
import * as express from 'express';

export type AppConfig = {
  sessionSecret: string;
};

export function createApp({sessionSecret}: AppConfig) {
  const app = express();

  app.use(cors());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use(session({
    secret: sessionSecret,
    resave: true,
    saveUninitialized: true
  }));

  return app;
}
