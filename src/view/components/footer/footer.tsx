import * as React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { messages } from './messages';
import './footer.css';

type OwnProps = {
  currentLocale: string;
  locales: string[];
  onLocaleChange: (locale: string) => void;
};

export class Footer extends React.Component<OwnProps, {}> {
  props: OwnProps;

  render() {
    return (
      <div className="zv-footer bg-faded text-primary text-center p-4">
        <Link
          className="zv-logo-link btn btn-link active"
          to="/"
        >
          <i className="fa fa-3x"/>
        </Link>

        <br/>

        <FormattedMessage id={messages.copyright}/>
        &nbsp;©
        &nbsp;{new Date().getFullYear()}
        &nbsp;<strong>Zingvo</strong>

        <br/>

        <select
          className="custom-select mb-2 mr-sm-2 mb-sm-0 mt-3"
          value={this.props.currentLocale}
          onChange={(e) => this.props.onLocaleChange(e.target.value)}
        >
          {...this.props.locales.map((locale, index) => <option key={index}>{locale}</option>)}
        </select>
      </div>
    );
  }
}
