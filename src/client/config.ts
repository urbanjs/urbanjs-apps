/// <reference path="../utils/config/es6-template-strings.d.ts" />

import es6TemplateResolver = require('es6-template-strings');
import { applyEnvironmentVariables, resolveReferences } from '../utils/config';

export type ClientConfiguration = {
  serverOrigin: string;
  devMode: boolean;
};

export const defaults = {
  serverOrigin: '',
  devMode: process.env.NODE_ENV !== 'production'
};

export const config =
  resolveReferences<ClientConfiguration>(
    applyEnvironmentVariables<ClientConfiguration>(
      defaults,
      'REACT_APP'
    ),
    es6TemplateResolver
  );
