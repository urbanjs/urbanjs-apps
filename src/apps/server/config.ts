/// <reference path="../utils/config/es6-template-strings.d.ts" />

import { join } from 'path';
import es6TemplateResolver = require('es6-template-strings');
import { applyEnvironmentVariables, resolveReferences } from '../utils/config';

export type ServerConfiguration = {
  port: number;
  corsAllowedOriginPatterns: string;
  devMode: boolean;
  absolutePublicPath: string;
  facebookAppId: string;
  facebookAppSecret: string;
  sessionSecret: string;
};

export const defaults = {
  port: 3001,
  corsAllowedOriginPatterns: '/.*/',
  devMode: process.env.NODE_ENV !== 'production',
  absolutePublicPath: join(__dirname, '../../../build'),
  facebookAppId: 'facebook-app-id',
  facebookAppSecret: 'facebook-app-secret',
  sessionSecret: 'awesome_secret'
};

export const config =
  resolveReferences<ServerConfiguration>(
    applyEnvironmentVariables<ServerConfiguration>(
      applyEnvironmentVariables<ServerConfiguration>(
        defaults,
        'REACT_APP'
      ),
      'REACT_SERVER'
    ),
    es6TemplateResolver
  );
