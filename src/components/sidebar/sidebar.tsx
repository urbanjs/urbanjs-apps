import * as React from 'react';
import {Link, withRouter, RouteComponentProps} from 'react-router-dom';
import './sidebar.css';

export type OwnProps = {};

export type SidebarProps = OwnProps & RouteComponentProps<null>;

export class Sidebar extends React.Component<SidebarProps, {}> {
  props: SidebarProps;

  render() {
    const items = [
      {icon: 'user-o', path: '/profile'},
      {icon: 'tasks', path: '/projects'},
      {icon: 'comments', path: '/messages'},
      {icon: 'calendar-check-o', path: '/calendar'}
    ];

    return (
      <div className="zv-sidebar notification">
        <Link className="button is-link" to="/">
          <span className="image is-32x32" href="/">
            <img src={this.props.location.pathname === '/' ? 'logo.svg' : 'logo_grey.svg'} alt="logo"/>
          </span>
        </Link>
        {
          ...items.map((item, index) => (
            <Link
              key={index}
              className={`button is-link ${item.path === this.props.location.pathname ? 'is-active' : ''}`}
              to={item.path}
            >
              <span className="icon is-medium">
                <i className={`fa fa-${item.icon}`}/>
              </span>
            </Link>
          ))
        }
      </div>
    );
  }
}

export const SidebarWithRouter = withRouter<OwnProps>(Sidebar);
