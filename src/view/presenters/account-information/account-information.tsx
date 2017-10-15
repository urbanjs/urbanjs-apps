import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './i18n';
import './account-information.css';

export type OwnProps = {
  user: {};
  onEdit: () => void
};

export type State = {};

export type AccountInformationProps = OwnProps;

export class AccountInformation extends React.Component<AccountInformationProps, State> {
  props: AccountInformationProps;

  render() {
    return (
      <div className="zv-account-information bg-faded p-4">
        <a
          className="text-primary float-right btn btn-link m-3"
          onClick={this.props.onEdit}
        >
          <i className="fa fa-2x fa-pencil-square-o align-middle"/>
          <br/>
          <FormattedMessage id={messages.edit}/>
        </a>

        <div className="p-4">
          <i className="fa fa-3x fa-info align-bottom text-primary"/>
          <h3 className="d-inline-block ml-4 text-muted">
            <FormattedMessage id={messages.title}/>
          </h3>
        </div>

        <table className="table">
          <tbody>
            <tr className="zv-group">
              <td className="text-muted p-4">
                <pre>{JSON.stringify(this.props.user, null, ' ')}</pre>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
