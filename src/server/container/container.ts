import { Container } from 'inversify';
import { config } from '../config';
import {
  logModule,
  monitorModule,
  httpModule,
  graphqlModule,
  userModule,
  errorModule,
  uuidModule
} from '../modules';
import { createLoggerMiddleware, createTraceMiddleware } from './middlewares';
import { configModule } from './config';

export const container = new Container({defaultScope: 'Singleton'});

const middlewares = [];

if (config.devMode) {
  middlewares.push(createLoggerMiddleware(  ));
  middlewares.push(createTraceMiddleware({container}));
}

container.applyMiddleware(...middlewares);

container.load(
  configModule,
  monitorModule,
  logModule,
  httpModule,
  graphqlModule,
  userModule,
  errorModule,
  uuidModule
);
