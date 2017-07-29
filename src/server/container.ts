import { Container } from 'inversify';
import { configModule } from './config';
import {
  logModule,
  monitorModule,
  httpModule,
  graphqlModule,
  userModule,
  errorModule
} from './modules';

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
