import * as React from 'react';
import { render } from 'react-dom';
import { ApolloClient, createNetworkInterface } from 'react-apollo';
import { createBrowserHistory } from 'history';
import { config } from './config';
import { createStore } from './store';
import { ContextProvider, App } from './view';
import { translations } from './i18n';
import registerServiceWorker from './register-service-worker';
import './index.css';

const history = createBrowserHistory();

const store = createStore({}, {
  devMode: config.devMode,
  platform: 'browser'
});

const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: config.devMode
      ? `${config.hostOrigin}/graphql`
      : '/graphql',
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
    <App/>
  </ContextProvider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
