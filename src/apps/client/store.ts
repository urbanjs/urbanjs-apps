import { setRuntimeVariable } from '../../state/actions';
import { createStore } from '../../state/store';
import { apolloClient } from './apollo';
import { config } from './config';

export const store = createStore({}, {
  devMode: config.devMode,
  platform: 'browser',
  apolloClient
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
