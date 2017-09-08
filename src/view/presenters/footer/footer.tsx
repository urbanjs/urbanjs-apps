import * as React from 'react';
import { Link } from 'react-router-dom';
import { PATH_APP } from '../../../constants';
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
      <div className="zv-footer bg-faded text-muted text-center p-4">
        <small>
          <Link to={PATH_APP}>Zingvo</Link>
          &nbsp;
          ©
          &nbsp;
          {new Date().getFullYear()}
        </small>

        {/*<select*/}
          {/*className="custom-select mb-2 mr-sm-2 mb-sm-0 mt-3"*/}
          {/*value={this.props.currentLocale}*/}
          {/*onChange={(e) => this.props.onLocaleChange(e.target.value)}*/}
        {/*>*/}
          {/*{...this.props.locales.map((locale, index) => <option key={index}>{locale}</option>)}*/}
        {/*</select>*/}
      </div>
    );
  }
}
