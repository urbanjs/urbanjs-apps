import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from './messages';
import './error-page-401.css';

export type OwnProps = {};

export type ErrorPage401Props = OwnProps;

export class ErrorPage401 extends React.Component<ErrorPage401Props> {
  props: ErrorPage401Props;

  render() {
    return (
      <div className="zv-error-page-401">
        <div className="cover">
          <FormattedMessage tagName="h1" id={messages.error}/>
          <div className="lead">
            <FormattedMessage id={messages['401']}/>
          </div>
        </div>
      </div>
    );
  }
}

export const ErrorPage401WithHOCs = ErrorPage401;
