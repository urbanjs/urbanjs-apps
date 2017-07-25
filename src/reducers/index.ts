import { combineReducers } from 'redux';
import { runtime, RuntimeState } from './runtime';
import { i18n, I18NState } from './i18n';
import { ping, PingState } from './ping';

export type RootState = {
  i18n: I18NState;
  runtime: RuntimeState;
  ping: PingState;
};

export const root = combineReducers({runtime, i18n, ping});
