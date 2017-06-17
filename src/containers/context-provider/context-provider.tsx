import * as React from 'react';
import {connect, Store, Provider as StoreProvider} from 'react-redux';
import {IntlProvider} from 'react-intl';
import {Router} from 'react-router-dom';
import {History} from 'history';
import {RootState} from '../../reducers';

interface OwnProps {
  store: Store<object>;
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

const mapStateToProps = (state: RootState): StateProps => ({
  locale: state.i18n.locale
});

const mapDispatchToProps = (): DispatchProps => ({});

export class ContextProvider extends React.Component<ContextProviderProps, {}> {
  props: ContextProviderProps;

  render() {
    return (
      <StoreProvider store={this.props.store}>
        <IntlProvider
          messages={this.props.translations[this.props.locale]}
          locale={this.props.locale}
          key={this.props.locale}
        >
          <Router history={this.props.routerHistory}>
            {this.props.children}
          </Router>
        </IntlProvider>
      </StoreProvider>
    );
  }
}

export const ContextProviderWithState = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(ContextProvider);
