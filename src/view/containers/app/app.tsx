import * as React from 'react';
import { ActionCreator, connect, Dispatch } from 'react-redux';
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';
import { QueryProps as ApolloQueryProps, graphql, gql } from 'react-apollo';
import { PATH_APP_ACCOUNT, PATH_APP_PROFILE } from '../../../constants';
import { track } from '../../../decorators';
import { RootState } from '../../../reducers';
import { setLocale } from '../../../actions';
import { Sidebar, Navbar, Footer, Loader } from '../../presenters';
import { ProfilePage } from '../profile-page';
import { AccountPage } from '../account-page';
import { Feature } from '../../../modules/authorization/types';
import './app.css';

type OwnProps = {
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

type StateProps = {
  isLoading: boolean;
  currentLocale: string;
  locales: string[];
};

type DispatchProps = {
  setLocale: ActionCreator<object>;
};

export type AppProps = StateProps & DispatchProps & OwnProps & RouteComponentProps<null>;
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
            allowedFeatures={allowedFeatures}
            notifications={Array(100)}
            onCollapse={() => this.setState({isSidebarCollapsed: !this.state.isSidebarCollapsed})}
            user={this.props.data.user && {
              displayName: this.props.data.user.displayName,
              avatar: this.props.data.user.avatar,
              email: this.props.data.user.email
            }}
          />

          <Route
            path={PATH_APP_PROFILE}
            render={() => <ProfilePage/>}
          />

          <Route
            path={PATH_APP_ACCOUNT}
            render={() => <AccountPage/>}
          />
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

const withState = connect<StateProps, DispatchProps, OwnProps & RouteComponentProps<null>>(
  (state: RootState): StateProps => ({
    currentLocale: state.i18n.locale,
    locales: state.i18n.availableLocales,
    isLoading: state.loader.isLoading
  }),
  (dispatch: Dispatch<RootState>): DispatchProps => ({
    setLocale: (locale: string) => dispatch(setLocale({locale}))
  })
);

const withQuery = graphql(
  gql`
    query {
      user {
        id
        email
        displayName
        avatar
        subscription {
          features
        }
      }
    }
  `,
  {}
);

export const AppWithStore = withQuery(withRouter<OwnProps>(withState(App)));
