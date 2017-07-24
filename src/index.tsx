import * as React from 'react';
import {render} from 'react-dom';
import {ApolloClient, createNetworkInterface} from 'react-apollo';
import {createBrowserHistory} from 'history';
import {DEV_MODE, SERVER_PORT} from './constants';
import {createStore} from './store';
import {ContextProvider, App} from './containers';
import {translations} from './i18n';
import registerServiceWorker from './register-service-worker';
import './index.css';

const history = createBrowserHistory();

const store = createStore({}, {
  devMode: DEV_MODE,
  platform: 'browser'
});

const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: DEV_MODE
      ? `http://localhost:${SERVER_PORT}/graphql`
      : '/graphql'
  }),
  connectToDevTools: DEV_MODE
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
