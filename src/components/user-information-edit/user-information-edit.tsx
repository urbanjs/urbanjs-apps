import * as React from 'react';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {messages} from './messages';
import './user-information-edit.css';

export type UserInformationEditPopover = 'none' | 'height' | 'chest' | 'waist' | 'hip' | 'foot';
export type UserLanguageItem = { language: string, level: string };

export type User = {
  firstName?: string;
  lastName?: string;
  age?: number;
  city?: string;
  height?: number;
  chest?: number;
  waist?: number;
  hip?: number;
  foot?: number;
  hasDrivingLicense?: boolean;
  isStudent?: boolean;
  highestQualificationLevel?: string;
  languages?: UserLanguageItem[]
};

export type OwnProps = {
  user: User;
  onSave: (data: { changes: User, user: User }) => void;
  onCancel: () => void;
};
export type State = {
  activePopover: UserInformationEditPopover;
  changes: User;
};

export type UserInformationEditProps = OwnProps;

export class UserInformationEdit extends React.Component<UserInformationEditProps, State> {
  props: UserInformationEditProps;
  state: State = {
    activePopover: 'none',
    changes: {}
  };

  render() {
    const createPopover = (id: UserInformationEditPopover) => (
      <i
        className="zv-help text-primary fa fa fa-question-circle"
        onClick={() => this.setState({
          activePopover: this.state.activePopover === id
            ? 'none' : id
        })}
      >
        <div className={`popover popover-top ${this.state.activePopover === id ? '' : 'd-none'}`}>
          <div className="popover-title">
            <FormattedMessage id={messages.help}/>
          </div>
          <div className="popover-content">
            <p>
              <FormattedMessage id={messages.hint[id]}/>
            </p>
          </div>
        </div>
      </i>
    );

    const createNumberInput = (id: UserInformationEditPopover) => {
      const isDirty = this.state.changes.hasOwnProperty(id);
      const isValid = isDirty ? this.state.changes[id] > 0 : this.props.user[id] > 0;
      const isSuccess = isDirty && isValid;
      const isWarning = !isValid;

      return (
        <div className={`form-group ${isSuccess ? 'has-success' : (isWarning ? 'has-warning' : '')}`}>
          <div className="input-group">
            <input
              type="number"
              defaultValue={this.props.user[id]}
              onChange={this.onPrimitiveValueChange.bind(this, id, 'number')}
              className={`form-control text-right ${
                isSuccess ? 'form-control-success' : (isWarning ? 'form-control-warning' : '')}`}
            />
            <div className="input-group-addon">cm</div>
          </div>
        </div>
      );
    };

    return (
      <div className="zv-user-information-edit bg-faded p-4">
        <div className="p-4">
          <i className="fa fa-3x fa-info align-bottom text-primary"/>
          <h3 className="d-inline-block ml-4 text-muted">
            <FormattedMessage id={messages.title}/>
          </h3>
        </div>

        <form
          onSubmit={() => this.props.onSave({
            changes: this.state.changes,
            user: {
              ...this.props.user,
              ...this.state.changes,
              languages: ([] as UserLanguageItem[])
                .concat(this.state.changes.languages || [])
                .concat(this.props.user.languages || [])
                .filter((item, index, languages) =>
                  (index <= languages.findIndex(innerItem => innerItem.language === item.language)))
                .filter(item => item.level !== 'NONE')
            }
          })}
        >
          <table className="table">
            <tbody>
              <tr className="zv-group">
                <td className="text-muted p-4" colSpan={2}>
                  <Link
                    className="btn btn-link"
                    to="/"
                  >
                    <FormattedMessage id={messages.editPersonalInformation}/>
                  </Link>
                </td>
              </tr>
              <tr className="zv-group">
                <td className="text-muted p-4">
                  <FormattedMessage id={messages.field.height}/>
                  &nbsp;
                  {createPopover('height')}
                </td>
                <td className="text-right font-weight-bold p-4">
                  {createNumberInput('height')}
                </td>
              </tr>
              <tr>
                <td className="text-muted p-4">
                  <FormattedMessage id={messages.field.chest}/>
                  &nbsp;
                  {createPopover('chest')}
                </td>
                <td className="text-right font-weight-bold p-4">
                  {createNumberInput('chest')}
                </td>
              </tr>
              <tr>
                <td className="text-muted p-4">
                  <FormattedMessage id={messages.field.waist}/>
                  &nbsp;
                  {createPopover('waist')}
                </td>
                <td className="text-right font-weight-bold p-4">
                  {createNumberInput('waist')}
                </td>
              </tr>
              <tr>
                <td className="text-muted p-4">
                  <FormattedMessage id={messages.field.hip}/>
                  &nbsp;
                  {createPopover('hip')}
                </td>
                <td className="text-right font-weight-bold p-4">
                  {createNumberInput('hip')}
                </td>
              </tr>
              <tr>
                <td className="text-muted p-4">
                  <FormattedMessage id={messages.field.foot}/>
                  &nbsp;
                  {createPopover('foot')}
                </td>
                <td className="text-right font-weight-bold p-4">
                  {createNumberInput('foot')}
                </td>
              </tr>
              <tr className="zv-group">
                <td className="text-muted p-4">
                  <FormattedMessage id={messages.field.highestQualificationLevel}/>
                </td>
                <td className="text-right font-weight-bold p-4">
                  <select
                    className="form-control"
                    defaultValue={this.props.user.highestQualificationLevel}
                    onChange={this.onPrimitiveValueChange.bind(this, 'highestQualificationLevel', 'string')}
                  >
                    {
                      Object.keys(messages.qualificationLevel).map((qualificationLevelKey: string) =>
                        <option value={qualificationLevelKey} key={qualificationLevelKey}>
                          <FormattedMessage id={messages.qualificationLevel[qualificationLevelKey]}/>
                        </option>
                      )
                    }
                  </select>
                </td>
              </tr>
              <tr>
                <td className="text-muted p-4">
                  <FormattedMessage id={messages.field.isStudent}/>
                </td>
                <td className="text-right font-weight-bold p-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    defaultChecked={this.props.user.isStudent}
                    onChange={this.onPrimitiveValueChange.bind(this, 'isStudent', 'boolean')}
                  />
                </td>
              </tr>
              <tr>
                <td className="text-muted p-4">
                  <FormattedMessage id={messages.field.drivingLicense}/>
                </td>
                <td className="text-right font-weight-bold p-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    defaultChecked={this.props.user.hasDrivingLicense}
                    onChange={this.onPrimitiveValueChange.bind(this, 'hasDrivingLicense', 'boolean')}
                  />
                </td>
              </tr>
              {
                Object.keys(messages.language).map((languageKey) =>
                  <tr key={languageKey}>
                    <td className="text-muted p-4">
                      <FormattedMessage id={messages.language[languageKey]}/>
                    </td>
                    <td className="text-right font-weight-bold p-4">
                      <select
                        className="form-control"
                        defaultValue={
                          (
                            (this.props.user.languages || []).find(language => language.language === languageKey) ||
                            {level: 'NONE'}
                          ).level
                        }
                        onChange={this.onLanguageValueChange.bind(this, languageKey)}
                      >
                        {
                          Object.keys(messages.languageLevel).map((languageLevelKey: string) =>
                            <option value={languageLevelKey} key={languageLevelKey}>
                              <FormattedMessage id={messages.languageLevel[languageLevelKey]}/>
                            </option>
                          )
                        }
                      </select>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
          <div className="row">
            <div className="col-6">
              <a
                className="btn btn-secondary btn-lg btn-block"
                onClick={this.props.onCancel}
              >
                <FormattedMessage id={messages.cancel}/>
              </a>
            </div>
            <div className="col-6">
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block text-white"
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

  private onPrimitiveValueChange(id: string,
                                 valueType: 'string' | 'boolean' | 'number',
                                 e: React.ChangeEvent<{ value: string, checked: boolean }>) {
    let value: string | number | boolean;

    if (valueType === 'string') {
      value = e.target.value;
    } else if (valueType === 'number') {
      value = parseInt(e.target.value, 10);
    } else if (valueType === 'boolean') {
      value = e.target.checked;
    } else {
      throw new Error('Invalid value type is given');
    }

    const changes = {...this.state.changes};
    if (value === this.props.user[id]) {
      delete changes[id];
    } else {
      changes[id] = value;
    }

    this.setState({changes});
  }

  private onLanguageValueChange(languageKey: string, e: React.ChangeEvent<{ value: string }>) {
    const languages = (this.state.changes.languages || []).slice();

    const newLevel = e.target.value;
    const currentValue = (this.props.user.languages || []).find(item => item.language === languageKey);

    let changeIndex = languages.findIndex(item => item.language === languageKey);
    changeIndex = changeIndex === -1 ? languages.length : changeIndex;
    if (!currentValue || currentValue.level !== newLevel) {
      languages[changeIndex] = {language: languageKey, level: newLevel};
    } else {
      languages.splice(changeIndex, 1);
    }

    const changes: User = {...this.state.changes};
    if (languages.length) {
      changes.languages = languages;
    } else {
      delete changes.languages;
    }

    this.setState({changes});
  }
}
