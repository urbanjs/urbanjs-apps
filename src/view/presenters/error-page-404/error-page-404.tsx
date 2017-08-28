import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from './messages';
import './error-page-404.css';

export function ErrorPage404() {
  return (
    <div className="zv-error-page-404">
      <div className="cover">
        <FormattedMessage tagName="h1" id={messages.error}/>
        <div className="lead">
          <FormattedMessage id={messages['404']}/>
        </div>
      </div>
    </div>
  );
}
