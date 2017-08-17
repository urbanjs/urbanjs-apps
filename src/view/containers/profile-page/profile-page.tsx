import * as React from 'react';
import { Switch, Route, Redirect, Link, withRouter, RouteComponentProps } from 'react-router-dom';
import {
  PATH_APP,
  PATH_APP_PROFILE_INFORMATION_EDIT,
  PATH_APP_PROFILE_GALLERY,
  PATH_APP_PROFILE_INFORMATION, PATH_APP_PROFILE
} from '../../../constants';
import { Gallery, UserCard, UserInformation, UserInformationEdit } from '../../presenters';
import './profile-page.css';

const tempUser = {
  firstName: 'Emily',
  lastName: 'Ratajkowski',
  age: 26,
  city: 'Budapest',
  height: 168,
  chest: 90,
  waist: 60,
  hip: 90,
  foot: 25,
  eye: 'BROWN',
  hair: 'BLACK',
  hasDrivingLicense: true,
  isStudent: true,
  highestQualificationLevel: 'UNIVERSITY',
  languages: [
    {
      language: 'ENGLISH',
      level: 'INTERMEDIATE'
    },
    {
      language: 'HUNGARIAN',
      level: 'NATIVE'
    },
    {
      language: 'GERMAN',
      level: 'BASIC'
    }
  ]
};

export type OwnProps = {};

export type ProfilePageProps = OwnProps & RouteComponentProps<{}>;
export type State = {};

export class ProfilePage extends React.Component<ProfilePageProps, State> {
  props: ProfilePageProps;
  state: State = {};

  render() {
    return (
      <div className="zv-profile-page">
        <div className="m-2">
          <UserCard user={tempUser} avatar="/emily/1.jpg"/>
        </div>

        <ul className="zv-profile-nav nav justify-content-center m-2 bg-faded hidden-lg-up">
          <li className="nav-item text-center">
            <Link
              className={`nav-link p-4 ${
                this.props.location.pathname === PATH_APP_PROFILE_GALLERY
                  ? 'active' : ''}`}
              to={PATH_APP_PROFILE_GALLERY}
            >
              <i className="fa fa-picture-o fa-2x"/>
            </Link>
          </li>
          <li className="nav-item text-center">
            <Link
              className={`nav-link p-4 ${
                this.props.location.pathname === PATH_APP_PROFILE_INFORMATION
                  ? 'active' : ''}`}
              to={PATH_APP_PROFILE_INFORMATION}
            >
              <i className="fa fa-info fa-2x"/>
            </Link>
          </li>
        </ul>

        <Switch>
          <Redirect
            exact={true}
            path={PATH_APP_PROFILE}
            to={PATH_APP_PROFILE_GALLERY}
          />

          <Route
            exact={true}
            path={PATH_APP_PROFILE_GALLERY}
            render={() =>
              <div className="row no-gutters m-2">
                <div className="hidden-md-down col-lg-4">
                  <UserInformation
                    user={tempUser}
                    onEdit={() =>
                      this.props.history.push(PATH_APP_PROFILE_INFORMATION_EDIT)}
                  />
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
            path={PATH_APP_PROFILE_INFORMATION}
            render={() =>
              <div className="row no-gutters m-2">
                <div className="col-xs-12 col-lg-4">
                  {
                    this.props.location.pathname === PATH_APP_PROFILE_INFORMATION_EDIT ? (
                      <UserInformationEdit
                        user={tempUser}
                        onSave={({user}) => {
                          Object.assign(tempUser, user);
                          this.props.history.push(PATH_APP_PROFILE_INFORMATION);
                        }}
                        onCancel={() =>
                          this.props.history.goBack()}
                      />)
                      : (
                      <UserInformation
                        user={tempUser}
                        onEdit={() =>
                          this.props.history.push(PATH_APP_PROFILE_INFORMATION_EDIT)}
                      />)
                  }
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

          <Redirect to={PATH_APP}/>
        </Switch>
      </div>
    );
  }
}

export const ProfilePageWithState = withRouter<OwnProps>(ProfilePage);
