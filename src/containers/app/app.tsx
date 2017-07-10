import * as React from 'react';
import {ActionCreator, connect, Dispatch} from 'react-redux';
import {Route, withRouter, RouteComponentProps} from 'react-router-dom';
import './app.css';
import {RootState} from '../../reducers';
import {setLocale} from '../../actions';
import {Sidebar, Navbar, Footer} from '../../components';
import {ProfilePage} from '../profile-page';

type OwnProps = {
  name?: string;
};

interface StateProps {
  currentLocale: string;
  locales: string[];
}

interface DispatchProps {
  setLocale: ActionCreator<object>;
}

export type AppProps = StateProps & DispatchProps & OwnProps & RouteComponentProps<null>;
export type State = { searchValue: string };

export class App extends React.Component<AppProps, State> {
  props: AppProps;
  state: State = {searchValue: ''};

  render() {
    return (
      <div className="zv-app h-100">
        <aside className="zv-sidebar fixed-top h-100">
          <Sidebar/>
        </aside>

        <div className="zv-content-wrapper">
          <Navbar
            searchValue={this.state.searchValue}
            onSearchValueChange={(value: string) => this.setState({searchValue: value})}
            notifications={Array(100)}
            onLogout={() => {
              console.info('logged out');// tslint:disable-line
            }}
          />

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

export const AppWithStore = withRouter<OwnProps>(withState(App));
