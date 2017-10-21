import { applyEnvironmentVariables } from 'urbanjs-config';

export type Configuration = {
  serverOrigin: string;
};

export const defaults = {
  serverOrigin: ''
};

export const config =
  applyEnvironmentVariables<Configuration>(
    defaults,
    'REACT_E2E'
  );
