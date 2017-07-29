import { join } from 'path';

import { applyEnvironmentVariables } from './utils';

export type Configuration = {
  port: number;
  host: string;
  corsAllowedOrigins: string[];
  devMode: boolean;
  absolutePublicPath: string;
  defaultLocale: string;
  facebookAppId: string;
  facebookAppSecret: string;
  sessionSecret: string;
};

export const config = applyEnvironmentVariables<Configuration>({
  port: 3001,
  host: 'localhost',
  corsAllowedOrigins: ['http://localhost', 'http://localhost:3000'],
  devMode: process.env.NODE_ENV !== 'production',
  absolutePublicPath: join(__dirname, '../../build'),
  defaultLocale: 'hu',
  facebookAppId: '369058166771856',
  facebookAppSecret: '',
  sessionSecret: 'awesome_secret'
});
