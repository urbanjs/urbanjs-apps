/// <reference path="../utils/config/es6-template-strings.d.ts" />

import es6TemplateResolver = require('es6-template-strings');
import { applyEnvironmentVariables, resolveReferences } from '../utils/config';

export type CliConfiguration = {
  showDebugLogs: boolean;
};

const devMode = process.env.NODE_ENV !== 'production';
export const defaults: CliConfiguration = {
  showDebugLogs: devMode
};

export const config =
  resolveReferences<CliConfiguration>(
    applyEnvironmentVariables<CliConfiguration>(
      defaults,
      'REACT_CLI'
    ),
    es6TemplateResolver
  );
