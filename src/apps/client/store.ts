import { setRuntimeVariable } from '../../state/actions';
import { createStore } from '../../state/store';
import { apolloClient } from './apollo';
import { config } from './config';

export const store = createStore({}, {
  connectToDevTools: config.connectToDevTools,
  showDebugLogs: config.showDebugLogs,
  platform: 'browser',
  apolloClient
});

store.dispatch(setRuntimeVariable({
  name: 'appOrigin',
  value: window.location.origin
}));

store.dispatch(setRuntimeVariable({
  name: 'serverOrigin',
  value: config.serverOrigin
}));
