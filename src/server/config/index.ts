/// <reference path="./es6-template-strings.d.ts" />

import { join } from 'path';
import { config as initializeDotEnvVariables } from 'dotenv';
import es6TemplateResolver = require('es6-template-strings');
import { applyEnvironmentVariables, resolveReferences } from './utils';
import { Configuration } from './types';

export const defaults = {
  port: 3001,
  hostOrigin: 'http://localhost:${port}',
  corsAllowedOrigins: '${hostOrigin}, http://localhost:3000',
  devMode: process.env.NODE_ENV !== 'production',
  absolutePublicPath: join(__dirname, '../../build'),
  facebookAppId: '369058166771856',
  facebookAppSecret: '',
  sessionSecret: 'awesome_secret'
};

initializeDotEnvVariables();

export const config =
  resolveReferences<Configuration>(
    applyEnvironmentVariables<Configuration>(
      applyEnvironmentVariables<Configuration>(
        defaults,
        'REACT_APP'
      ),
      'REACT_SERVER'
    ),
    es6TemplateResolver
  );
