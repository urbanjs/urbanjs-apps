import * as React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { inject } from '../../../decorators';
import {
  TYPE_AUTHORIZATION_SERVICE,
  IAuthorizationService,
  Activity,
  Feature
} from '../../../modules/authorization/types';
import {
  PATH_APP,
  PATH_APP_CALENDAR,
  ACTIVITY_VIEW_CALENDAR
} from '../../../constants';
import './sidebar.css';

export type OwnProps = {
  allowedFeatures: Feature[];
};

export type SidebarProps = OwnProps & RouteComponentProps<null>;

export class Sidebar extends React.Component<SidebarProps, {}> {
  props: SidebarProps;

  @inject(TYPE_AUTHORIZATION_SERVICE)
  private authorizationService: IAuthorizationService;

  render() {
    const itemClasses = 'btn btn-link text-muted d-block mx-auto mt-4 mb-4';
    const items: { icon: string, path: string, activity: Activity }[] = [
      {
        icon: 'calendar-check-o',
        path: PATH_APP_CALENDAR,
        activity: ACTIVITY_VIEW_CALENDAR
      }
    ];

    return (
      <div className="zv-sidebar bg-faded h-100">
        <Link
          className={`zv-logo-link ${itemClasses} ${
            this.props.location.pathname === PATH_APP ? 'active' : ''}`}
          to={PATH_APP}
        >
          <i className="fa fa-2x"/>
        </Link>
        {
          ...items
            .filter(item =>
              this.authorizationService.isActivityAllowed(item.activity, this.props.allowedFeatures))
            .map((item, index) => (
              <Link
                key={item.path}
                className={`${itemClasses} ${
                  item.path === this.props.location.pathname ? 'text-primary' : ''}`}
                to={item.path}
              >
                <i className={`fa fa-${item.icon} fa-2x`}/>
              </Link>
            ))
        }
      </div>
    );
  }
}

export const SidebarWithRouter = withRouter<OwnProps>(Sidebar);
