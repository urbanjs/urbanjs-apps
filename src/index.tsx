import * as React from 'react';
import {render} from 'react-dom';
import {createBrowserHistory} from 'history';
import {createStore} from './store';
import {ContextProvider} from './containers';
import {App} from './containers';
import {translations} from './i18n';
import {createApolloClient} from './graphql/client';
import registerServiceWorker from './register-service-worker';
import './index.css';

const history = createBrowserHistory();

const store = createStore({}, {
  env: process.env.NODE_ENV,
  platform: 'browser'
});

const apolloClient = createApolloClient({
  uri: process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3001/graphql'
    : '/graphql'
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
