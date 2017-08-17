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
  PATH_APP
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
import { messages } from './messages';
import './navbar.css';

type OwnProps = {
  user?: {
    displayName: string;
    email: string;
    avatar: string;
  };
  serverOrigin: string;
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
    const rootUrl = this.routeService.format(PATH_APP, {prefixWithOrigin: true});
    const redirectUriQueryParam = `?redirect_uri=${encodeURIComponent(rootUrl)}`;

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

        <div className="dropdown-menu dropdown-menu-right p-4 mt-0">
          {
            this.props.user ? (
              <div className="row align-items-center no-gutters">
                <div className="col-3">
                  <img
                    className="mr-3 rounded-circle img-fluid"
                    src={this.props.user.avatar}
                    alt="Generic placeholder image"
                  />
                </div>

                <div className="col-7 align-middle">
                  <h6 className="ml-4">
                    {this.props.user.displayName}
                    <br/>
                    <small className="text-muted">{this.props.user.email}</small>
                  </h6>
                </div>

                <div className="col-2">
                  <a
                    href={`${this.props.serverOrigin}${PATH_AUTH_LOGOUT}${redirectUriQueryParam}`}
                    className="btn btn-link p-0 text-muted mr-4"
                  >
                    <i
                      className={classnames('fa', 'fa-2x', 'fa-sign-out')}
                    />
                  </a>
                </div>
              </div>) : (
              <a
                className="btn btn-primary w-100"
                href={`${this.props.serverOrigin}${PATH_AUTH_FACEBOOK}${redirectUriQueryParam}`}
              >
                <FormattedMessage id={messages['button.login']}/>
              </a>
            )
          }
        </div>

      </div>
    );
  }
}

export const NavbarWithIntl = injectIntl<OwnProps>(withRouter<OwnProps & InjectedIntlProps>(Navbar));
