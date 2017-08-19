import 'reflect-metadata';
import './container';

import * as React from 'react';
import { render } from 'react-dom';
import { ContextProvider, App, ErrorBoundary } from '../view';
import { translations } from '../i18n';
import registerServiceWorker from '../register-service-worker';
import { store } from './store';
import { history } from './history';
import { apolloClient } from './apollo';
import './index.css';

render
(
  <ContextProvider
    store={store}
    routerHistory={history}
    apolloClient={apolloClient}
    translations={translations}
  >
    <ErrorBoundary>
      <App/>
    </ErrorBoundary>
  </ContextProvider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
