import 'reflect-metadata';
import './container';

import * as React from 'react';
import { render } from 'react-dom';
import { ApolloClient } from 'react-apollo';
import { createBrowserHistory } from 'history';
import { config } from './config';
import { ContextProvider, App, ErrorBoundary } from '../view';
import { translations } from '../i18n';
import registerServiceWorker from '../register-service-worker';
import { networkInterface } from './network-interface';
import { store } from './store';
import './index.css';

const history = createBrowserHistory();

const apolloClient = new ApolloClient({
  networkInterface,
  queryDeduplication: true,
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
