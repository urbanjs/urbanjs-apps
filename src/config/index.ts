import { join } from 'path';
import { applyEnvironmentVariables } from './utils';

export type Configuration = {
  port: number;
  hostOrigin: string;
  corsAllowedOrigins: string;
  devMode: boolean;
  absolutePublicPath: string;
  defaultLocale: string;
  facebookAppId: string;
  facebookAppSecret: string;
  sessionSecret: string;
};

const port = 3001;

export const config = applyEnvironmentVariables<Configuration>(
  {
    port: port,
    hostOrigin: `http://localhost:${port}`,
    corsAllowedOrigins: `http://localhost:${port}, http://localhost:3000`,
    devMode: process.env.NODE_ENV !== 'production',
    absolutePublicPath: join(__dirname, '../../build'),
    defaultLocale: 'hu',
    facebookAppId: '369058166771856',
    facebookAppSecret: '',
    sessionSecret: 'awesome_secret'
  },
  'ZV_APP'
);
