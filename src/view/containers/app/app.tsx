import * as React from 'react';
import { ActionCreator, connect, Dispatch } from 'react-redux';
import { Route, withRouter, RouteComponentProps, Switch } from 'react-router-dom';
import { QueryProps as ApolloQueryProps, graphql } from 'react-apollo';
import { PATH_APP, PATH_APP_ACCOUNT } from '../../../constants';
import { track } from '../../../decorators';
import { RootState } from '../../../state/reducers';
import { setLocale } from '../../../state/actions';
import { Sidebar, Navbar, Footer, Loader, ErrorPage404 } from '../../presenters';
import { AccountPage } from '../account-page';
import { Feature } from '../../../modules/authorization/types';
import { userQuery } from './graphql';
import './app.css';

export type OwnProps = {};

export type UserQueryProps = {
  data: ApolloQueryProps & {
    user?: {
      id: string;
      email: string;
      displayName: string;
      avatar: string;
      subscription: {
        features: Feature[]
      }
    }
  }
};

export type StateProps = {
  isLoading: boolean;
  currentLocale: string;
  locales: string[];
  serverOrigin: string;
  appOrigin: string;
};

export type DispatchProps = {
  setLocale: ActionCreator<object>;
};

export type AppProps =
  StateProps
  & DispatchProps
  & OwnProps
  & RouteComponentProps<null>
  & UserQueryProps;

export type State = { isSidebarCollapsed: boolean };

export class App extends React.Component<AppProps, State> {
  props: AppProps;
  state: State = {isSidebarCollapsed: false};

  @track()
  render() {
    if (this.props.isLoading) {
      return <Loader/>;
    }

    const allowedFeatures: Feature[] = this.props.data.user
      ? this.props.data.user.subscription.features
      : [];

    return (
      <div className={`zv-app h-100 ${this.state.isSidebarCollapsed ? 'zv-sidebar-hidden' : ''}`}>
        <aside className="zv-sidebar fixed-top h-100">
          <Sidebar allowedFeatures={allowedFeatures}/>
        </aside>

        <div className="zv-content-wrapper">
          <Navbar
            appOrigin={this.props.appOrigin}
            serverOrigin={this.props.serverOrigin}
            allowedFeatures={allowedFeatures}
            notifications={Array(100)}
            onCollapse={() => this.setState({isSidebarCollapsed: !this.state.isSidebarCollapsed})}
            user={this.props.data.user && {
              displayName: this.props.data.user.displayName,
              avatar: this.props.data.user.avatar,
              email: this.props.data.user.email
            }}
          />

          <Switch>
            <Route
              path={PATH_APP_ACCOUNT}
              render={() => <AccountPage/>}
            />

            <Route
              path={PATH_APP}
              exact={true}
            />

            <Route
              path="**"
              render={() => <ErrorPage404/>}
            />
          </Switch>
        </div>

        <footer className="zv-footer-wrapper">
          <Footer
            currentLocale={this.props.currentLocale}
            locales={this.props.locales}
            onLocaleChange={(locale: string) => this.props.setLocale(locale)}
          />
        </footer>
      </div>
    );
  }
}

export const AppWitHOCs =
  graphql<UserQueryProps, OwnProps>(userQuery)(
    withRouter<OwnProps>(
      connect<StateProps, DispatchProps>(
        (state: RootState): StateProps => ({
          currentLocale: state.i18n.locale,
          locales: state.i18n.availableLocales,
          isLoading: state.loader.isLoading,
          serverOrigin: state.runtime.variables.serverOrigin,
          appOrigin: state.runtime.variables.appOrigin
        }),
        (dispatch: Dispatch<RootState>): DispatchProps => ({
          setLocale: (locale: string) => dispatch(setLocale({locale}))
        })
      )(App)));
