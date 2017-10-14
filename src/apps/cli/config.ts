/// <reference path="../utils/config/es6-template-strings.d.ts" />

import es6TemplateResolver = require('es6-template-strings');
import { applyEnvironmentVariables, resolveReferences } from '../utils/config';

export type CliConfiguration = {
  devMode: boolean;
};

export const defaults = {
  devMode: process.env.NODE_ENV !== 'production'
};

export const config =
  resolveReferences<CliConfiguration>(
    applyEnvironmentVariables<CliConfiguration>(
      defaults,
      'REACT_CLI'
    ),
    es6TemplateResolver
  );
