import * as React from 'react';
import {render} from 'react-dom';
import {createBrowserHistory} from 'history';
import {createStore} from './store';
import {ContextProvider} from './containers';
import {App} from './components';
import {translations} from './i18n';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const history = createBrowserHistory();
const store = createStore({}, {
  env: 'dev',
  platform: 'browser',
  routerHistory: history
});

render(
  <ContextProvider
    store={store}
    routerHistory={history}
    translations={translations}
  >
    <App/>
  </ContextProvider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
