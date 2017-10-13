import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from './messages';
import './footer.css';

type OwnProps = {
  currentLocale: string;
  locales: string[];
  onLocaleChange: (locale: string) => void;
};

export class Footer extends React.Component<OwnProps> {
  props: OwnProps;

  render() {
    return (
      <div className="zv-footer bg-faded d-flex justify-content-between">
        <div className="p-4 text-muted">
          &nbsp;
          ©
          &nbsp;
          <FormattedMessage id={messages.copyright}/>
          &nbsp;
          {new Date().getFullYear()}
        </div>

        <div className="p-2">
          <select
            className="form-control"
            value={this.props.currentLocale}
            onChange={(e) => this.props.onLocaleChange(e.target.value)}
          >
            {...this.props.locales.map((locale, index) => <option key={index}>{locale}</option>)}
          </select>
        </div>
      </div>
    );
  }
}
