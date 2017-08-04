import * as React from 'react';
import { render } from 'react-dom';
import { ApolloClient, createNetworkInterface } from 'react-apollo';
import { createBrowserHistory } from 'history';
import { PATH_GRAPHQL } from './constants';
import { config } from './config';
import { setRuntimeVariable } from './actions';
import { createStore } from './store';
import { ContextProvider, App, ErrorBoundary } from './view';
import { translations } from './i18n';
import registerServiceWorker from './register-service-worker';
import './index.css';

const history = createBrowserHistory();

const store = createStore({}, {
  devMode: config.devMode,
  platform: 'browser'
});

store.dispatch(setRuntimeVariable({
  name: 'devMode',
  value: config.devMode
}));

store.dispatch(setRuntimeVariable({
  name: 'hostOrigin',
  value: config.hostOrigin
}));

const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: `${config.hostOrigin}${PATH_GRAPHQL}`,
    opts: {
      credentials: 'include'
    }
  }),
  connectToDevTools: config.devMode
});

render(
  <ContextProvider
    store={store}
    apolloClient={apolloClient}
    routerHistory={history}
    translations={translations}
  >
    <ErrorBoundary>
      <App/>
    </ErrorBoundary>
  </ContextProvider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
