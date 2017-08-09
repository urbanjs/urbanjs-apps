import * as React from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { inject } from '../../../decorators';
import {
  ACTIVITY_VIEW_NOTIFICATIONS,
  PATH_APP,
  PATH_APP_NOTIFICATIONS
} from '../../../constants';
import {
  TYPE_AUTHORIZATION_SERVICE,
  IAuthorizationService,
  Feature
} from '../../../modules/authorization/types';
import { messages } from './messages';
import './navbar.css';

type OwnProps = {
  allowedFeatures: Feature[];
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

  @inject(TYPE_AUTHORIZATION_SERVICE)
  private authorizationService: IAuthorizationService;

  render() {
    let notificationLink;
    if (this.authorizationService.isActivityAllowed(ACTIVITY_VIEW_NOTIFICATIONS, this.props.allowedFeatures)) {
      const notifications = this.props.notifications;

      notificationLink = (
        <Link
          to={PATH_APP_NOTIFICATIONS}
          className={`btn btn-link text-muted ${
            this.props.location.pathname === PATH_APP_NOTIFICATIONS ? 'text-primary' : ''}`}
        >
          <i className="fa fa-3x fa-bell"/>
          {
            notifications.length
              ? <span className="badge badge-primary">
                  {notifications.length > 99 ? '99+' : notifications.length}</span>
              : ''
          }
        </Link>
      );
    }

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

        {notificationLink}

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
                to={PATH_APP}
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

export const NavbarWithIntl = injectIntl<OwnProps>(withRouter<OwnProps & InjectedIntlProps>(Navbar));
