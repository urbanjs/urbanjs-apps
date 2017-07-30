import { Container } from 'inversify';
import { config } from '../../config';
import { ITraceService, TYPE_SERVICE_TRACE } from '../modules/log/types';
import {
  logModule,
  monitorModule,
  httpModule,
  graphqlModule,
  userModule,
  errorModule
} from '../modules';
import { createLoggerMiddleware, createTraceMiddleware } from './middlewares';
import { configModule } from './config';

export const container = new Container({defaultScope: 'Singleton'});

container.load(
  configModule,
  monitorModule,
  logModule,
  httpModule,
  graphqlModule,
  userModule,
  errorModule
);

const middlewares = [];

if (config.devMode) {
  middlewares.push(createLoggerMiddleware());
  middlewares.push(createTraceMiddleware({
    traceService: container.get<ITraceService>(TYPE_SERVICE_TRACE)
  }));
}

container.applyMiddleware(...middlewares);
