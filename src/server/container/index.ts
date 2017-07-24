import { Container } from 'inversify';
import { configModule } from './config';
import { loggerModule } from './logger';
import { driverModule } from './drivers';
import { httpModule } from './http';

export const container = new Container({defaultScope: 'Singleton'});

container.load(
  configModule,
  driverModule,
  loggerModule,
  httpModule
);
