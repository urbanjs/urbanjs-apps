import * as React from 'react';
import './navbar.css';
import {injectIntl, InjectedIntlProps, FormattedMessage} from 'react-intl';
import {Link} from 'react-router-dom';
import {messages} from './messages';

type OwnProps = {
  notifications: string[];
  searchValue: string;
  onSearchValueChange: (value: string) => void;
  onLogout: () => void;
};

type State = {
  profileCardIsOpen: boolean;
};

type NavbarProps = OwnProps & InjectedIntlProps;

export class Navbar extends React.Component<NavbarProps, State> {
  props: NavbarProps;
  state: State = {profileCardIsOpen: false};

  render() {
    const notifications = this.props.notifications;

    return (
      <div className="zv-navbar notification is-paddingless">
        <nav className="level">
          <div className="level-left"/>

          <div className="level-right">
            <div className="level-item">
              <Link
                className="button is-link notification has-no-border has-no-shadow"
                to="/notifications"
                disabled={!notifications.length}
              >
                <span className="icon is-medium">
                  <i className="fa fa-bell"/>
                </span>
                {
                  notifications.length
                    ? <span className="tag is-primary">{notifications.length > 99 ? '99+' : notifications.length}</span>
                    : ''
                }
              </Link>
            </div>
            <div className="level-item">
              <span
                className="button is-link sign-out"
                onClick={() => this.setState({profileCardIsOpen: !this.state.profileCardIsOpen})}
              >
                <span className="icon is-medium">
                  <i className="fa fa-user-circle-o"/>
                </span>
              </span>
            </div>
          </div>

          <div className={`card profile-card ${this.state.profileCardIsOpen ? 'active' : ''}`}>
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <figure className="image is-48x48">
                    <img src="http://bulma.io/images/placeholders/96x96.png" alt="Image"/>
                  </figure>
                </div>
                <div className="media-content">
                  <p className="title is-4">John Smith</p>
                </div>
              </div>
            </div>

            <footer className="card-footer">
              <Link
                className="card-footer-item"
                to="/settings"
              >
                <FormattedMessage id={messages['button.settings']}/>
              </Link>
              <Link
                className="card-footer-item"
                to="/"
                onClick={this.props.onLogout}
              >
                <FormattedMessage id={messages['button.logout']}/>
              </Link>
            </footer>
          </div>
        </nav>
      </div>
    );
  }
}

export const NavbarWithIntl = injectIntl<OwnProps>(Navbar);
