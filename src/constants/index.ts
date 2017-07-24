export const DEV_MODE: boolean = process.env.NODE_ENV !== 'production';
export const SERVER_PORT: number = process.env.hasOwnProperty('PORT')
  ? parseInt(`${process.env.PORT}`, 10)
  : 3001;

export const DEFAULT_LOCALE = 'hu';

export const ACTION_SET_RUNTIME_VARIABLE = 'ACTION_SET_RUNTIME_VARIABLE';
export const ACTION_SET_LOCALE = 'ACTION_SET_LOCALE';
export const ACTION_PING = 'ACTION_PING';
export const ACTION_PONG = 'ACTION_PONG';
