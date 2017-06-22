import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {createMemoryHistory} from 'history';
import {IntlProvider} from 'react-intl';
import {Router} from 'react-router-dom';
import {App} from './app';

const history = createMemoryHistory();

storiesOf('App', module)
  .add('with defaults', () => (
    <IntlProvider>
      <Router history={history}>
        <App
          currentLocale="hu"
          locales={['hu', 'en']}
          isPinging={false}
          setLocale={() => ({})}
          sendPing={() => ({})}
          match={{
            params: {},
            isExact: true,
            path: '/',
            url: '/'
          }}
          location={history.location}
          history={history}
        />
      </Router>
    </IntlProvider>
  ));
