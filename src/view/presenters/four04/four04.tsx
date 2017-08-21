import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from './messages';
import './four04.css';

export function Four04() {
  return (
    <div className="zv-four04">
      <div className="cover">
        <FormattedMessage tagName="h1" id={messages.error}/>
        <p className="lead">
          <FormattedMessage id={messages.four04}/>
        </p>
      </div>
    </div>
  );
}
