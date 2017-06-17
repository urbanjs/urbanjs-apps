import {combineReducers} from 'redux';
import {runtime, RuntimeState} from './runtime';
import {i18n, I18NState} from './i18n';

export type RootState = {
  i18n: I18NState;
  runtime: RuntimeState;
};

export const root = combineReducers({runtime, i18n});
