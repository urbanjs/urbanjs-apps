import * as React from 'react';
import { ActionCreator, connect, Dispatch } from 'react-redux';
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';
import { QueryProps as ApolloQueryProps, graphql, gql } from 'react-apollo';
import { track } from '../../../decorators';
import './app.css';
import { RootState } from '../../../reducers';
import { setLocale } from '../../../actions';
import { Sidebar, Navbar, Footer } from '../../components';
import { ProfilePage } from '../profile-page';

type OwnProps = {
  name?: string;
  data: ApolloQueryProps & { user?: { id: string } }
};

type StateProps = {
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
    return (
      <div className={`zv-app h-100 ${this.state.isSidebarCollapsed ? 'zv-sidebar-hidden' : ''}`}>
        <aside className="zv-sidebar fixed-top h-100">
          <Sidebar/>
        </aside>

        <div className="zv-content-wrapper">
          <Navbar
            notifications={Array(100)}
            onCollapse={() => this.setState({isSidebarCollapsed: !this.state.isSidebarCollapsed})}
            onLogout={() => {
              console.info('logged out');// tslint:disable-line
            }}
          />

          <pre>
            {JSON.stringify(this.props.data.user, null, '  ')}
          </pre>

          <Route
            path="/user/:id"
            render={(routeProps: RouteComponentProps<null>) =>
              <ProfilePage rootUrl={routeProps.match.url}/>
            }
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
    locales: state.i18n.availableLocales
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
        displayName
      }
    }
  `,
  {}
);

export const AppWithStore = withQuery(withRouter<OwnProps>(withState(App)));
