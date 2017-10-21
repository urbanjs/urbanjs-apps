/// <reference path="../utils/config/es6-template-strings.d.ts" />

import es6TemplateResolver = require('es6-template-strings');
import { applyEnvironmentVariables, resolveReferences } from '../utils/config';
import { ENV_VARIABLE_PREFIX_FOR_CLIENT } from '../../constants';

export type ClientConfiguration = {
  serverOrigin: string;
  connectToDevTools: boolean;
  showDebugLogs: boolean;
  registerServiceWorker: boolean;
};

// `process.env` is replaced by webpack
// so use a trick to apply all environment variables
const processKey = 'process';
const envVariables: { [key: string]: string } = {
  ...process.env,
  ...window[processKey] && window[processKey].env
};

const devMode = envVariables.NODE_ENV !== 'production';
export const defaults: ClientConfiguration = {
  serverOrigin: window.location.origin,
  connectToDevTools: devMode,
  showDebugLogs: devMode,
  registerServiceWorker: false
};

export const config =
  resolveReferences<ClientConfiguration>(
    applyEnvironmentVariables<ClientConfiguration>(
      defaults,
      ENV_VARIABLE_PREFIX_FOR_CLIENT,
      envVariables
    ),
    es6TemplateResolver
  );
