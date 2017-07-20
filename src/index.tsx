import * as React from 'react';
import {render} from 'react-dom';
import {createBrowserHistory} from 'history';
import {DEV_MODE} from './constants';
import {createStore} from './store';
import {ContextProvider, App} from './containers';
import {translations} from './i18n';
import {createApolloClient} from './graphql/client';
import registerServiceWorker from './register-service-worker';
import './index.css';

const history = createBrowserHistory();

const store = createStore({}, {
  devMode: DEV_MODE,
  platform: 'browser'
});

const apolloClient = createApolloClient({
  uri: DEV_MODE
    ? 'http://localhost:3001/graphql'
    : '/graphql',
  devMode: DEV_MODE
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
