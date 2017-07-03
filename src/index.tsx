import * as React from 'react';
import {render} from 'react-dom';
import {createBrowserHistory} from 'history';
import {createStore} from './store';
import {ContextProvider} from './containers';
import {App} from './containers';
import {translations} from './i18n';
import {createApolloClient} from './graphql';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const history = createBrowserHistory();

const store = createStore({}, {
  env: 'dev',
  platform: 'browser'
});

const apolloClient = createApolloClient({
  uri: 'http://localhost:3001/graphql'
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
