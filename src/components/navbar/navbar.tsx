import * as React from 'react';
import './navbar.css';
import {injectIntl, InjectedIntlProps, FormattedMessage} from 'react-intl';
import {Link, withRouter, RouteComponentProps} from 'react-router-dom';
import {messages} from './messages';

type OwnProps = {
  notifications: string[];
  onCollapse: () => void;
  onLogout: () => void;
};

type State = {
  profileCardIsOpen: boolean;
};

type NavbarProps = OwnProps & InjectedIntlProps & RouteComponentProps<null>;

export class Navbar extends React.Component<NavbarProps, State> {
  props: NavbarProps;
  state: State = {profileCardIsOpen: false};

  render() {
    const notifications = this.props.notifications;

    return (
      <div
        className={`zv-navbar p-4 d-flex justify-content-end bg-faded dropdown align-items-center ${
          this.state.profileCardIsOpen ? 'show' : ''}`}
      >
        <a
          className="btn btn-link text-muted mr-auto"
          onClick={this.props.onCollapse}
        >
          <i className="fa fa-2x fa-bars"/>
        </a>

        <Link
          to="/notifications"
          className={`btn btn-link text-muted ${
            this.props.location.pathname === '/notifications' ? 'text-primary' : ''}`}
        >
          <i className="fa fa-3x fa-bell"/>
          {
            notifications.length
              ? <span className="badge badge-primary">
                  {notifications.length > 99 ? '99+' : notifications.length}</span>
              : ''
          }
        </Link>

        <a
          className="btn btn-link text-muted"
          onClick={() => this.setState({profileCardIsOpen: !this.state.profileCardIsOpen})}
        >
          <i className="fa fa-3x fa-user-circle-o"/>
        </a>

        <div className="dropdown-menu dropdown-menu-right p-4 mt-0 mr-4">
          <div className="d-inline-block">
            <img
              className="mr-3 rounded-circle"
              src="http://bulma.io/images/placeholders/96x96.png"
              alt="Generic placeholder image"
            />
            <div className="d-inline-block align-middle">
              <h4>
                John Smith
                <br/>
                <small>john.smith@gmail.com</small>
              </h4>

              <Link
                to="/"
                className="btn btn-link p-0"
              >
                <FormattedMessage id={messages['button.logout']}/>
              </Link>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export const NavbarWithIntl = injectIntl<OwnProps>(withRouter(Navbar));
