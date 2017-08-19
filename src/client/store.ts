import { setRuntimeVariable } from '../actions';
import { createStore } from '../store';
import { config } from './config';

export const store = createStore({}, {
  devMode: config.devMode,
  platform: 'browser'
});

store.dispatch(setRuntimeVariable({
  name: 'devMode',
  value: config.devMode
}));

store.dispatch(setRuntimeVariable({
  name: 'appOrigin',
  value: config.appOrigin
}));

store.dispatch(setRuntimeVariable({
  name: 'serverOrigin',
  value: config.serverOrigin
}));
