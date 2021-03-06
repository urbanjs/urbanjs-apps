/// <reference path="../utils/config/es6-template-strings.d.ts" />

import { join } from 'path';
import es6TemplateResolver = require('es6-template-strings');
import { applyEnvironmentVariables, resolveReferences } from '../utils/config';
import { ENV_VARIABLE_PREFIX_FOR_CLIENT } from '../../constants';

export type ServerConfiguration = {
  port: number;
  showDebugLogs: boolean;
  includeInnerError: boolean;
  enableGraphQLEditor: boolean;
  useSecureCookies: boolean;
  cookieDomain: string;
  sessionSecret: string;
  corsAllowedOriginPatterns: string;
  absolutePublicPath: string;
  facebookAppId: string;
  facebookAppSecret: string;
};

const devMode = process.env.NODE_ENV !== 'production';
export const defaults: ServerConfiguration = {
  port: 3001,
  showDebugLogs: devMode,
  includeInnerError: devMode,
  enableGraphQLEditor: devMode,
  useSecureCookies: false,
  cookieDomain: '',
  sessionSecret: 'awesome_secret',
  corsAllowedOriginPatterns: '/.*/',
  absolutePublicPath: join(__dirname, '../../../build'),
  facebookAppId: 'facebook-app-id',
  facebookAppSecret: 'facebook-app-secret'
};

export const config =
  resolveReferences<ServerConfiguration>(
    applyEnvironmentVariables<ServerConfiguration>(
      applyEnvironmentVariables<ServerConfiguration>(
        defaults,
        ENV_VARIABLE_PREFIX_FOR_CLIENT
      ),
      'REACT_SERVER'
    ),
    es6TemplateResolver
  );
