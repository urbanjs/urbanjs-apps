import * as React from 'react';
import {Switch, Route, Redirect, Link, withRouter, RouteComponentProps} from 'react-router-dom';
import {Gallery, UserInformation} from '../../components';
import './profile-page.css';

const PATH_GALLERY = 'gallery';
const PATH_ABOUT = 'about';

export type OwnProps = {
  rootUrl: string;
};

export type ProfilePageProps = OwnProps & RouteComponentProps<null>;
export type State = {};

export class ProfilePage extends React.Component<ProfilePageProps, State> {
  props: ProfilePageProps;
  state: State = {};

  render() {
    return (
      <div className="zv-profile-page">
        <div className="zv-profile-information m-2 mb-4 p-5 text-center">
          <div className="zv-profile-top bg-primary"/>

          <div className="zv-avatar-container rounded-circle">
            <img
              className="img-fluid"
              src="/emily/1.jpg"
              alt="Profile image"
            />
          </div>

          <h1 className="mt-3">Emily Ratajkowski</h1>
          <p className="text-gray-dark m-0">
            Budapest, Magyarország
            <br/>
            26 éves
          </p>
        </div>

        <ul className="zv-profile-nav nav justify-content-center m-2 bg-faded hidden-lg-up">
          <li className="nav-item text-center">
            <Link
              className={`nav-link p-4 ${
                this.props.location.pathname === `${this.props.rootUrl}/${PATH_GALLERY}`
                  ? 'active' : ''}`}
              to={`${this.props.rootUrl}/${PATH_GALLERY}`}
            >
              <i className="fa fa-picture-o fa-2x"/>
            </Link>
          </li>
          <li className="nav-item text-center">
            <Link
              className={`nav-link p-4 ${
                this.props.location.pathname === `${this.props.rootUrl}/${PATH_ABOUT}`
                  ? 'active' : ''}`}
              to={`${this.props.rootUrl}/${PATH_ABOUT}`}
            >
              <i className="fa fa-info fa-2x"/>
            </Link>
          </li>
        </ul>

        <Switch>
          <Redirect
            exact={true}
            path={this.props.rootUrl}
            to={`${this.props.rootUrl}/${PATH_GALLERY}`}
          />

          <Route
            exact={true}
            path={`${this.props.rootUrl}/${PATH_GALLERY}`}
            render={() =>
              <div className="row no-gutters">
                <div className="hidden-md-down col-lg-4">
                  <UserInformation/>
                </div>
                <div className="col-xs-12 col-lg-8">
                  <Gallery
                    images={
                      Array(14).fill(null)
                        .map((a, index) => `/emily/${index + 1}.jpg`)
                        .sort(() => 0.5 - Math.random())
                    }
                  />
                </div>
              </div>
            }
          />

          <Route
            exact={true}
            path={`${this.props.rootUrl}/${PATH_ABOUT}`}
            render={() =>
              <div className="row no-gutters">
                <div className="col-xs-12 col-lg-4">
                  <UserInformation/>
                </div>
                <div className="hidden-md-down col-lg-8">
                  <Gallery
                    images={
                      Array(14).fill(null)
                        .map((a, index) => `/emily/${index + 1}.jpg`)
                        .sort(() => 0.5 - Math.random())
                    }
                  />
                </div>
              </div>
            }
          />

          <Redirect to="/"/>
        </Switch>
      </div>
    );
  }
}

export const ProfilePageWithState = withRouter<OwnProps>(ProfilePage);
