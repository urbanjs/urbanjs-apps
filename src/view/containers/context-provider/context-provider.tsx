import * as React from 'react';
import { ApolloProvider, ApolloClient } from 'react-apollo';
import { connect, Store, Provider as StoreProvider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { Router } from 'react-router-dom';
import { History } from 'history';
import { RootState } from '../../../state/reducers';

type OwnProps = {
  store: Store<object>;
  apolloClient: ApolloClient;
  routerHistory: History;
  children: React.ReactChild;
  translations: { [key: string]: { [key: string]: string } };
};

type StateProps = {
  locale: string;
};

export type ContextProviderProps = StateProps & OwnProps;

export class ContextProvider extends React.Component<ContextProviderProps> {
  props: ContextProviderProps;

  render() {
    return (
      <StoreProvider store={this.props.store}>
        <ApolloProvider client={this.props.apolloClient} store={this.props.store}>
          <IntlProvider
            messages={this.props.translations[this.props.locale]}
            locale={this.props.locale}
            key={this.props.locale}
          >
            <Router history={this.props.routerHistory}>
              {this.props.children}
            </Router>
          </IntlProvider>
        </ApolloProvider>
      </StoreProvider>
    );
  }
}

export const ContextProviderWithHOCs =
  connect<StateProps>(
    (state: RootState): StateProps => ({
      locale: state.i18n.locale
    })
  )(ContextProvider);
