import { applyEnvironmentVariables } from './utils';

export type Configuration = {
  port: number;
  devMode: boolean;
  defaultLocale: string;
};

export const config = applyEnvironmentVariables<Configuration>({
  devMode: process.env.NODE_ENV !== 'production',
  port: 3001,
  defaultLocale: 'hu'
});
