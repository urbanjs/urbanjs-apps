import * as React from 'react';
import {ActionCreator, connect, Dispatch} from 'react-redux';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import './app.css';
import {RootState} from '../../reducers';
import {setLocale} from '../../actions';
import {Sidebar, Navbar, Footer} from '../../components';

type OwnProps = {
  name?: string;
} & RouteComponentProps<any>; // tslint:disable-line no-any

interface StateProps {
  currentLocale: string;
  locales: string[];
}

interface DispatchProps {
  setLocale: ActionCreator<object>;
}

export type AppProps = StateProps & DispatchProps & OwnProps;
export type State = { searchValue: string };

export class App extends React.Component<AppProps, State> {
  props: AppProps;
  state: State = {searchValue: ''};

  render() {
    return (
      <div className="zv-app">
        <Navbar
          searchValue={this.state.searchValue}
          onSearchValueChange={(value: string) => this.setState({searchValue: value})}
          notifications={Array(100)}
          onLogout={() => {
            console.info('logged out');// tslint:disable-line
          }}
        />

        <Sidebar/>

        <Footer
          currentLocale={this.props.currentLocale}
          locales={this.props.locales}
          onLocaleChange={(locale: string) => this.props.setLocale(locale)}
        />
      </div>
    );
  }
}

const withState = connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState): StateProps => ({
    currentLocale: state.i18n.locale,
    locales: state.i18n.availableLocales
  }),
  (dispatch: Dispatch<RootState>): DispatchProps => ({
    setLocale: (locale: string) => dispatch(setLocale({locale}))
  })
);

export const AppWithStore = withRouter(withState(App));
