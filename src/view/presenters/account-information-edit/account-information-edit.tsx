import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from './messages';
import './account-information-edit.css';

export type OwnProps = {
  user: {};
  onSave: (data: { changes: object }) => void
  onCancel: () => void
};

export type State = {
  changes: {}
};

export type AccountInformationProps = OwnProps;

export class AccountInformationEdit extends React.Component<AccountInformationProps, State> {
  props: AccountInformationProps;
  state: State = {
    changes: {firstName: 'asd'}
  };

  render() {
    return (
      <div className="zv-account-information-edit bg-faded p-4">
        <div className="p-4">
          <i className="fa fa-3x fa-info align-bottom text-primary"/>
          <h3 className="d-inline-block ml-4 text-muted">
            <FormattedMessage id={messages.title}/>
          </h3>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.props.onSave({changes: this.state.changes});
          }}
        >
          <table className="table">
            <tbody>
              <tr className="zv-group">
                <td className="text-muted p-4">
                  <pre>{JSON.stringify(this.props.user, null, ' ')}</pre>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="row">
            <div className="col-6">
              <a
                className="btn btn-secondary btn-block"
                onClick={this.props.onCancel}
              >
                <FormattedMessage id={messages.cancel}/>
              </a>
            </div>
            <div className="col-6">
              <button
                type="submit"
                className="btn btn-primary btn-block text-white"
                disabled={!Object.keys(this.state.changes).length}
              >
                <FormattedMessage id={messages.save}/>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
