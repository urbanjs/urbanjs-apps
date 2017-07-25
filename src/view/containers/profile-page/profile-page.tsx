import * as React from 'react';
import { Switch, Route, Redirect, Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { Gallery, UserCard, UserInformation, UserInformationEdit } from '../../components';
import './profile-page.css';

const PATH_GALLERY = 'gallery';
const PATH_ABOUT = 'about';
const SEARCH_ABOUT_EDIT = '?edit';

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
        <div className="m-2">
          <UserCard user={tempUser} avatar="/emily/1.jpg"/>
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
                  {
                    this.props.location.search === SEARCH_ABOUT_EDIT ?
                      <UserInformationEdit
                        user={tempUser}
                        onSave={({user}) => {
                          Object.assign(tempUser, user);
                          this.props.history.push(`${this.props.rootUrl}/${PATH_ABOUT}`);
                        }}
                        onCancel={() =>
                          this.props.history.push(`${this.props.rootUrl}/${PATH_GALLERY}`)}
                      /> :
                      <UserInformation
                        user={tempUser}
                        onEdit={() =>
                          this.props.history.push(`${this.props.rootUrl}/${PATH_ABOUT}${SEARCH_ABOUT_EDIT}`)}
                      />
                  }
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
              <div className="row no-gutters m-2">
                <div className="col-xs-12 col-lg-4">
                  {
                    this.props.location.search === SEARCH_ABOUT_EDIT ?
                      <UserInformationEdit
                        user={tempUser}
                        onSave={({user}) => {
                          Object.assign(tempUser, user);
                          this.props.history.push(`${this.props.rootUrl}/${PATH_ABOUT}`);
                        }}
                        onCancel={() =>
                          this.props.history.push(`${this.props.rootUrl}/${PATH_ABOUT}`)}
                      /> :
                      <UserInformation
                        user={tempUser}
                        onEdit={() =>
                          this.props.history.push(`${this.props.rootUrl}/${PATH_ABOUT}${SEARCH_ABOUT_EDIT}`)}
                      />
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

          <Redirect to="/"/>
        </Switch>
      </div>
    );
  }
}

export const ProfilePageWithState = withRouter<OwnProps>(ProfilePage);
