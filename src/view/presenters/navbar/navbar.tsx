import * as React from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import * as classnames from 'classnames';
import { inject } from '../../../decorators';
import {
  ACTIVITY_VIEW_NOTIFICATIONS,
  PATH_AUTH_FACEBOOK,
  PATH_AUTH_LOGOUT,
  PATH_APP_NOTIFICATIONS,
  PATH_APP_ACCOUNT, PATH_APP
} from '../../../constants';
import {
  TYPE_ROUTE_SERVICE,
  IRouteService
} from '../../../modules/route/types';
import {
  TYPE_AUTHORIZATION_SERVICE,
  IAuthorizationService,
  Feature
} from '../../../modules/authorization/types';
import messages from './i18n';
import './navbar.css';

type OwnProps = {
  appOrigin: string;
  serverOrigin: string;
  user?: {
    displayName: string;
    email: string;
    avatar: string;
  };
  allowedFeatures: Feature[];
  notifications: string[];
  onCollapse: () => void;
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
  @inject(TYPE_ROUTE_SERVICE)
  private routeService: IRouteService;

  render() {
    const loginReturnPath = this.routeService.isPathKnown(this.props.location.pathname)
      ? this.props.location.pathname
      : PATH_APP;

    let loginUri = `${this.props.serverOrigin}${PATH_AUTH_FACEBOOK}`;
    loginUri += '?redirect_uri=';
    loginUri += encodeURIComponent(`${this.props.appOrigin}${loginReturnPath}`);

    let logoutUri = `${this.props.serverOrigin}${PATH_AUTH_LOGOUT}`;
    logoutUri += '?redirect_uri=';
    logoutUri += encodeURIComponent(`${this.props.appOrigin}${PATH_APP}`);

    let notificationLink;
    if (this.authorizationService.isActivityAllowed(ACTIVITY_VIEW_NOTIFICATIONS, this.props.allowedFeatures)) {
      const notifications = this.props.notifications;

      notificationLink = (
        <Link
          to={PATH_APP_NOTIFICATIONS}
          className={`btn btn-link text-muted ${
            this.props.location.pathname === PATH_APP_NOTIFICATIONS ? 'text-primary' : ''}`}
        >
          <i className="fa fa-2x fa-bell"/>
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
          <i className="fa fa-bars"/>
        </a>

        {notificationLink}

        <a
          className="btn btn-link text-muted"
          onClick={() => this.setState({profileCardIsOpen: !this.state.profileCardIsOpen})}
        >
          <i
            className={classnames('fa', 'fa-2x', {
              'fa-user-circle-o': !!this.props.user,
              'fa-sign-in': !this.props.user
            })}
          />
        </a>

        <div
          className="dropdown-menu dropdown-menu-right p-4 mt-0"
          onClick={() => this.setState({profileCardIsOpen: false})}
        >
          {
            this.props.user ? (
              <div className="d-flex flex-row justify-content-start align-items-center">
                <div className="p-2">
                  <img
                    className="mr-3 rounded-circle img-fluid"
                    src={this.props.user.avatar}
                    alt="Generic placeholder image"
                  />
                </div>

                <div className="p-2">
                  <h6>
                    {this.props.user.displayName}

                    <br/>
                    <small className="text-muted">{this.props.user.email}</small>

                    <br/>
                    <Link
                      className="btn btn-link p-0"
                      to={PATH_APP_ACCOUNT}
                    >
                      <FormattedMessage id={messages['link.account']}/>
                    </Link>
                  </h6>
                </div>

                <div className="ml-auto p-2">
                  <a
                    href={logoutUri}
                    className="btn btn-link p-0 text-muted ml-4"
                  >
                    <i
                      className={classnames('fa', 'fa-2x', 'fa-sign-out')}
                    />
                  </a>
                </div>
              </div>) : (
              <a
                className="btn btn-primary w-100"
                href={loginUri}
              >
                <FormattedMessage id={messages['link.login']}/>
              </a>
            )
          }
        </div>

      </div>
    );
  }
}

export const NavbarWithHOCs =
  injectIntl<OwnProps>(
    withRouter<OwnProps & InjectedIntlProps>(Navbar));
