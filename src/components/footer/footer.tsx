import * as React from 'react';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {messages} from './messages';
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
      <div className="zv-footer ">
        <footer className="footer">
          <div className="container content has-text-centered">
            <p>
              <Link className="icon" to="/">
                  <span className="image is-32x32" href="/">
                    <img src="/logo.svg" alt="logo"/>
                  </span>
              </Link>
              <br/>
              <FormattedMessage id={messages.copyright}/> © {new Date().getFullYear()} <strong>Zingvo</strong>
            </p>
            <div className="field has-addons has-addons-centered">
              <p className="control">
                <span className="select">
                  <select
                    value={this.props.currentLocale}
                    onChange={(e) => this.props.onLocaleChange(e.target.value)}
                  >
                    {...this.props.locales.map((locale, index) => <option key={index}>{locale}</option>)}
                  </select>
                </span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
