import * as React from 'react';
import {FormattedMessage} from 'react-intl';
import {ActionCreator, connect, Dispatch} from 'react-redux';
import {Link, Route, withRouter, RouteComponentProps} from 'react-router-dom';
import messages from './messages';
import './app.css';
import {RootState} from '../../reducers';
import {setLocale, ping} from '../../actions';

const logo = require('./logo.svg');

type OwnProps = {
  name?: string;
} & RouteComponentProps<any>; // tslint:disable-line no-any

interface StateProps {
  currentLocale: string;
  locales: string[];
  isPinging: boolean;
}

interface DispatchProps {
  setLocale: ActionCreator<object>;
  sendPing: ActionCreator<object>;
}

export type AppProps = StateProps & DispatchProps & OwnProps;

const mapStateToProps = (state: RootState): StateProps => ({
  currentLocale: state.i18n.locale,
  locales: state.i18n.availableLocales,
  isPinging: state.ping.isPinging
});

const mapDispatchToProps = (dispatch: Dispatch<RootState>): DispatchProps => ({
  setLocale: (locale: string) => dispatch(setLocale({locale})),
  sendPing: () => dispatch(ping())
});

export class App extends React.Component<AppProps, {}> {
  props: AppProps;

  render() {
    const unreadCount = 5;
    const localeOptions = this.props.locales.map((locale, index) => <option key={index}>{locale}</option>);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Welcome to React</h2>
        </div>
        <hr/>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>

        <hr/>
        <span className="select">
            <select
              value={this.props.currentLocale}
              onChange={(e) => this.props.setLocale(e.target.value)}
            >
              {localeOptions}
            </select>
          </span>

        <div>
          <FormattedMessage
            id={messages.welcome}
            values={{name: <b>{this.props.name || 'Guest'}</b>, unreadCount, gender: 'male'}}
          />
        </div>

        <hr/>
        Navigate to:

        <div>
          <Link className="button" disabled={this.props.location.pathname === '/'} to="/">home</Link>
          <Link className="button" disabled={this.props.location.pathname === '/page'} to="/page">page</Link>
        </div>

        This is the content of&nbsp;
        <Route exact={true} path="/" render={() => <span>home</span>}/>
        <Route exact={true} path="/page" render={() => <span>page</span>}/>

        <hr/>
        Let's ping:

        <div>
          <a className="button" disabled={this.props.isPinging} onClick={this.props.sendPing}>ping</a>
          <a className="button" disabled={!this.props.isPinging}>pong</a>
        </div>
      </div>
    );
  }
}

const withStore = connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps);
export const AppWithStore = withRouter(withStore(App));
