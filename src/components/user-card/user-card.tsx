import * as React from 'react';
import {FormattedMessage} from 'react-intl';
import {messages} from './messages';
import './user-card.css';

export type OwnProps = {
  avatar: string;
  user: {
    firstName: string;
    lastName: string;
    age: number;
    city: string;
  };
};

export type UserCardProps = OwnProps;

export class UserCard extends React.Component<UserCardProps, {}> {
  props: UserCardProps;

  render() {
    return (
      <div className="zv-user-card p-5 text-center">
        <div className="zv-user-card-top bg-primary"/>

        <div className="zv-user-avatar rounded-circle">
          <img
            className="img-fluid"
            src={this.props.avatar}
            alt="Profile image"
          />
        </div>

        <h1 className="mt-3">
          <FormattedMessage
            id={messages.name}
            values={{
              firstName: this.props.user.firstName,
              lastName: this.props.user.lastName
            }}
          />
        </h1>

        <p className="text-gray-dark m-0">
          {this.props.user.city}
          <br/>
          <FormattedMessage id={messages.age} values={{value: this.props.user.age}}/>
        </p>
      </div>
    );
  }
}
