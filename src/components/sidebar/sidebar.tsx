import * as React from 'react';
import {Link, withRouter, RouteComponentProps} from 'react-router-dom';
import './sidebar.css';

export type OwnProps = {};

export type SidebarProps = OwnProps & RouteComponentProps<null>;

export class Sidebar extends React.Component<SidebarProps, {}> {
  props: SidebarProps;

  render() {
    const itemClasses = 'btn btn-link text-muted d-block mx-auto mt-4 mb-4';
    const items = [
      {icon: 'user-o', path: '/portfolio'},
      {icon: 'tasks', path: '/projects'},
      {icon: 'comments', path: '/messages'},
      {icon: 'calendar-check-o', path: '/calendar'}
    ];

    return (
      <div className="zv-sidebar bg-faded h-100">
        <Link
          className={`zv-logo-link ${itemClasses} ${
            this.props.location.pathname === '/' ? 'active' : ''}`}
          to="/"
        >
          <i className="fa fa-3x"/>
        </Link>
        {
          ...items.map((item, index) => (
            <Link
              key={index}
              className={`${itemClasses} ${
                item.path === this.props.location.pathname ? 'text-primary' : ''}`}
              to={item.path}
            >
              <i className={`fa fa-${item.icon} fa-3x`}/>
            </Link>
          ))
        }
      </div>
    );
  }
}

export const SidebarWithRouter = withRouter<OwnProps>(Sidebar);
