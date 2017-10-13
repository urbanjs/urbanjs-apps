import * as React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
import { QueryProps as ApolloQueryProps, graphql } from 'react-apollo';
import {
  PATH_APP_404,
  PATH_APP_ACCOUNT,
  PATH_APP_ACCOUNT_EDIT
} from '../../../constants';
import { AccountInformation, AccountInformationEdit, ErrorPage401 } from '../../presenters';
import { RootState } from '../../../state/reducers';
import { updateUserMutation, userQuery } from './graphql';
import './account-page.css';

export type OwnProps = {};

export type StateProps = {
  serverOrigin: string;
};

export type User = {
  id: string;
  personalInformation: {}
};

export type UserQueryProps = {
  data: ApolloQueryProps & {
    user?: User
  }
};

export type UpdateUserMutationProps = {
  submit: (userId: string, data: object) => Promise<void>;
};

export type AccountPageProps =
  OwnProps
  & UserQueryProps
  & UpdateUserMutationProps
  & StateProps
  & RouteComponentProps<null>;

export class AccountPage extends React.Component<AccountPageProps> {
  props: AccountPageProps;

  render() {
    if (!this.props.data.loading && !this.props.data.user) {
      return <ErrorPage401/>;
    }

    const user = this.props.data.user as User;
    return (
      <div className="zv-account-page">
        <Switch>
          <Route
            path={PATH_APP_ACCOUNT_EDIT}
            exact={true}
            render={() => (
              <div className="m-2">
                <AccountInformationEdit
                  accountInformation={user.personalInformation}
                  onSave={async (data) => {
                    this.props.history.push(PATH_APP_ACCOUNT);
                    await this.props.submit(user.id, data.changes);
                  }}
                  onCancel={() =>
                    this.props.history.goBack()}
                />
              </div>
            )}
          />

          <Route
            path={PATH_APP_ACCOUNT}
            exact={true}
            render={() => (
              <div className="m-2">
                <AccountInformation
                  user={user}
                  onEdit={() =>
                    this.props.history.push(PATH_APP_ACCOUNT_EDIT)}
                />
              </div>
            )}
          />

          <Redirect to={PATH_APP_404}/>
        </Switch>
      </div>
    );
  }
}

export const AccountPageWithHOCs =
  graphql<UpdateUserMutationProps, OwnProps>(updateUserMutation, {
    props: ({mutate}) => ({
      submit: (userId: string, data: object) => {
        if (!mutate) {
          throw new Error('mutate does not exist');
        }

        return mutate({variables: {userId, data}});
      }
    }),
  })(
    graphql<UserQueryProps, OwnProps>(userQuery)(
      withRouter<OwnProps>(
        connect<StateProps>(
          (state: RootState): StateProps => ({
            serverOrigin: state.runtime.variables.serverOrigin
          })
        )(AccountPage))));
