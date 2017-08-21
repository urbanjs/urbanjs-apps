import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from './messages';
import './account-information-edit.css';

export type AccountInformation = {
  firstName?: string;
  lastName?: string;
  birthDate?: Date;
  phoneNumber?: string;
  birthPlace?: string;
  socialSecurityNumber?: string;
  taxNumber?: string;
  mothersMaidenName?: string;
};

export type OwnProps = {
  accountInformation: AccountInformation;
  onSave: (data: { changes: AccountInformation, accountInformation: AccountInformation }) => void;
  onCancel: () => void
};

export type State = {
  changes: AccountInformation;
};

export type AccountInformationProps = OwnProps;

export class AccountInformationEdit extends React.Component<AccountInformationProps, State> {
  props: AccountInformationProps;
  state: State = {
    changes: {}
  };

  render() {
    const createStringInput = (id: string) => {
      const isDirty = this.state.changes.hasOwnProperty(id);
      const isValid = isDirty
        ? this.state.changes[id].length > 0
        : this.props.accountInformation[id] && this.props.accountInformation[id].length > 0;
      const isSuccess = isDirty && isValid;
      const isWarning = !isValid;

      return (
        <div className={`form-group ${isSuccess ? 'has-success' : (isWarning ? 'has-warning' : '')}`}>
          <input
            type="text"
            defaultValue={this.props.accountInformation[id]}
            onChange={(e) => {
              const changes = {...this.state.changes};
              const value = e.target.value;
              if (value === this.props.accountInformation[id]) {
                delete changes[id];
              } else {
                changes[id] = value;
              }

              this.setState({changes});
            }}
            className={`form-control text-right ${
              isSuccess ? 'form-control-success' : (isWarning ? 'form-control-warning' : '')}`}
          />
        </div>
      );
    };

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
            this.props.onSave({
              changes: this.state.changes,
              accountInformation: {
                ...this.props.accountInformation,
                ...this.state.changes,
              }
            });
          }}
        >
          <table className="table">
            <tbody>
              {
                [
                  'firstName',
                  'lastName',
                  'phoneNumber',
                  'birthDate',
                  'birthPlace',
                  'taxNumber',
                  'socialSecurityNumber',
                  'mothersMaidenName'
                ].map((fieldName) => (
                  <tr key={fieldName} className="zv-group">
                    <td className="text-muted p-4">
                      <FormattedMessage id={messages.field[fieldName]}/>
                    </td>
                    <td className="text-right font-weight-bold p-4">
                      {createStringInput(fieldName)}
                    </td>
                  </tr>
                ))
              }
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
