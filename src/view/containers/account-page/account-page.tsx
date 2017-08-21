import * as React from 'react';
import { Switch, Route, Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
import { QueryProps as ApolloQueryProps, graphql, gql } from 'react-apollo';
import {
  PATH_APP_404,
  PATH_APP_ACCOUNT,
  PATH_APP_ACCOUNT_EDIT
} from '../../../constants';
import { AccountInformation, AccountInformationEdit, Four01 } from '../../presenters';
import './account-page.css';

export type OwnProps = {
  submit: (userId: string, data: object) => Promise<void>;
  data: ApolloQueryProps & {
    user?: {
      id: string;
      email?: string;
      displayName?: string;
      avatar?: string;
      personalInformation?: {
        firstName?: string;
        lastName?: string;
        birthDate?: string;
        phoneNumber?: string;
        birthPlace?: string;
        socialSecurityNumber?: string;
        taxNumber?: string;
        mothersMaidenName?: string;
      }
    }
  }
};

export type AccountPageProps = OwnProps & RouteComponentProps<{}>;
export type State = {};

export class AccountPage extends React.Component<AccountPageProps, State> {
  props: AccountPageProps;
  state: State = {};

  private unauthenticatedUser = {
    id: 'unknown'
  };

  render() {
    const user = this.props.data.user || this.unauthenticatedUser;

    return (
      <div className="zv-account-page">
        <Switch>
          {!this.props.data.loading && user === this.unauthenticatedUser
            ? <Four01 unauthenticated={true}/> : ''}

          <Route
            path={PATH_APP_ACCOUNT_EDIT}
            exact={true}
            render={() => (
              <div className="m-2">
                <AccountInformationEdit
                  user={user}
                  onSave={async (data) => {
                    await this.props.submit(user.id, data.changes);
                    this.props.history.push(PATH_APP_ACCOUNT);

                    await this.props.data.refetch();
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

const withQuery = graphql(
  gql`
    query {
      user {
        id
        email
        displayName
        avatar
        personalInformation {
          id
          firstName
          lastName
          birthDate
          phoneNumber
          birthPlace
          socialSecurityNumber
          taxNumber
          mothersMaidenName
        }
      }
    }
  `,
  {}
);

const withMutation = graphql(
  gql`  
    mutation updateUserPersonalInformation($userId: ID!, $data: UserPersonalInformationInput!) {
      updateUserPersonalInformation(userId:$userId, data: $data) {
        id
        firstName
      }
    }
  `,
  {
    props: ({mutate}) => ({
      submit: (userId: string, data: object) => {
        if (!mutate) {
          throw new Error('mutate does not exist');
        }

        return mutate({variables: {userId, data}});
      }
    }),
  }
);

export const AccountPageWithState = withMutation(withQuery(withRouter<OwnProps>(AccountPage)));
