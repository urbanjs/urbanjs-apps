import * as React from 'react';
import {ApolloProvider, ApolloClient} from 'react-apollo';
import {connect, Store, Provider as StoreProvider} from 'react-redux';
import {IntlProvider} from 'react-intl';
import {Router} from 'react-router-dom';
import {History} from 'history';
import {RootState} from '../../reducers';

interface OwnProps {
  store: Store<object>;
  apolloClient: ApolloClient;
  routerHistory: History;
  children: React.ReactChild;
  translations: { [key: string]: { [key: string]: string } };
}

interface StateProps {
  locale: string;
}

interface DispatchProps {
}

export type ContextProviderProps = StateProps & DispatchProps & OwnProps;

export class ContextProvider extends React.Component<ContextProviderProps, {}> {
  props: ContextProviderProps;

  render() {
    return (
      <StoreProvider store={this.props.store}>
        <ApolloProvider client={this.props.apolloClient}>
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

export const withState = connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState): StateProps => ({
    locale: state.i18n.locale
  }),
  (): DispatchProps => ({})
);

export const ContextProviderWithState = withState(ContextProvider);
