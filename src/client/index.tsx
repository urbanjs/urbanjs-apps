import 'reflect-metadata';
import './container';

import * as React from 'react';
import { render } from 'react-dom';
import { ContextProvider, App, ErrorBoundary } from '../view';
import { translations } from '../i18n';
import registerServiceWorker from './register-service-worker';
import { apolloClient } from './apollo';
import { history } from './history';
import { store } from './store';
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
