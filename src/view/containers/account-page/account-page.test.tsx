import * as React from 'react';
import { DocumentNode } from 'graphql';
import * as renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { MockedProvider as ApolloProvider } from 'react-apollo/test-utils';
import { Store, Provider as StoreProvider } from 'react-redux';
import { PATH_APP_ACCOUNT } from '../../../constants';
import { translations } from '../../../i18n';
import { createStore, RootState } from '../../../state';
import { AccountPageWithHOCs as AccountPage, OwnProps } from './account-page';
import { userQuery } from './graphql';

window.requestAnimationFrame = () => {
  throw new Error('requestAnimationFrame is not supported in Node');
};

describe('Account page', () => {
  let store: Store<RootState>;
  let apolloMocks: { request: { query: DocumentNode }, result: object }[];
  let currentPath: string;
  let i18nMessages: { [key: string]: string };

  beforeEach(() => {
    store = createStore({}, {
      platform: 'browser',
      devMode: false
    });

    apolloMocks = [];

    currentPath = PATH_APP_ACCOUNT;

    i18nMessages = translations.en;
  });

  const renderComponent = (props?: OwnProps) => {
    const component = (
      <MemoryRouter initialEntries={[currentPath]}>
        <StoreProvider store={store}>
          <ApolloProvider mocks={apolloMocks} removeTypename={true}>
            <IntlProvider locale="en" messages={i18nMessages}>
              <AccountPage {...props}/>
            </IntlProvider>
          </ApolloProvider>
        </StoreProvider>
      </MemoryRouter>
    );

    return renderer.create(component);
  };

  describe('if user is not authenticated', () => {
    beforeEach(() => {
      apolloMocks = [
        {
          request: {query: userQuery},
          result: {data: {user: null}}
        }
      ];
    });
    it('renders 401 error page ', async () => {
      const component = renderComponent();

      await new Promise(resolve => setTimeout(resolve, 5));
      expect(component.toJSON()).toMatchSnapshot();
    });
  });

  describe('if user is authenticated', () => {
    beforeEach(() => {
      apolloMocks = [
        {
          request: {query: userQuery},
          result: {
            data: {
              user: {
                id: 'id',
                email: 'email',
                displayName: 'displayName',
                avatar: 'avatar',
                personalInformation: {
                  id: 'id',
                  firstName: 'firstName',
                  lastName: 'lastName',
                  birthDate: 'birthDate',
                  phoneNumber: 'phoneNumber',
                  birthPlace: 'birthPlace',
                  socialSecurityNumber: 'socialSecurityNumber',
                  taxNumber: 'taxNumber',
                  mothersMaidenName: 'mothersMaidenName'
                }
              }
            }
          }
        }
      ];
    });

    it('renders page without error', async () => {
      const component = renderComponent();

      await new Promise(resolve => setTimeout(resolve, 5));
      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});
