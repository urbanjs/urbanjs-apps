import { combineReducers, ReducersMapObject } from 'redux';
import { runtime, RuntimeState } from './runtime';
import { i18n, I18NState } from './i18n';
import { ping, PingState } from './ping';
import { loader, LoaderState } from './loader';

export type RootState = {
  i18n: I18NState;
  runtime: RuntimeState;
  ping: PingState;
  loader: LoaderState;
};

export const root = (extraReducers?: ReducersMapObject) => combineReducers({
  runtime,
  i18n,
  ping,
  loader,
  ...(extraReducers || {})
});
