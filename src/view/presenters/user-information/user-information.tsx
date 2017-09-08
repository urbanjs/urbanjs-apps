import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from './messages';
import './user-information.css';

export type OwnProps = {
  user: {
    firstName: string;
    lastName: string;
    age: number;
    city: string;
    height: number;
    chest: number;
    waist: number;
    hip: number;
    foot: number;
    hasDrivingLicense: boolean;
    isStudent: boolean;
    highestQualificationLevel: string;
    languages: {
      language: string;
      level: string;
    }[]
  };
  onEdit: () => void
};

export type UserInformationPopover = 'none' | 'height' | 'chest' | 'waist' | 'hip' | 'foot';
export type State = {
  activePopover: UserInformationPopover;
};

export type UserInformationProps = OwnProps;

export class UserInformation extends React.Component<UserInformationProps, State> {
  props: UserInformationProps;
  state: State = {
    activePopover: 'none'
  };

  render() {
    const createPopover = (id: UserInformationPopover) => (
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

    return (
      <div className="zv-user-information bg-faded p-4">
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
                <FormattedMessage id={messages.field.name}/>
              </td>
              <td className="text-right font-weight-bold p-4">
                {this.props.user.firstName} {this.props.user.lastName}
              </td>
            </tr>
            <tr>
              <td className="text-muted p-4">
                <FormattedMessage id={messages.field.age}/>
              </td>
              <td className="text-right font-weight-bold p-4">
                <FormattedMessage id={messages.value.age} values={{value: this.props.user.age}}/>
              </td>
            </tr>
            <tr>
              <td className="text-muted p-4">
                <FormattedMessage id={messages.field.city}/>
              </td>
              <td className="text-right font-weight-bold p-4">
                {this.props.user.city}
              </td>
            </tr>
            <tr className="zv-group">
              <td className="text-muted p-4">
                <FormattedMessage id={messages.field.height}/>
                &nbsp;
                {createPopover('height')}
              </td>
              <td className="text-right font-weight-bold p-4">
                {this.props.user.height} cm
              </td>
            </tr>
            <tr>
              <td className="text-muted p-4">
                <FormattedMessage id={messages.field.chest}/>
                &nbsp;
                {createPopover('chest')}
              </td>
              <td className="text-right font-weight-bold p-4">
                {this.props.user.chest} cm
              </td>
            </tr>
            <tr>
              <td className="text-muted p-4">
                <FormattedMessage id={messages.field.waist}/>
                &nbsp;
                {createPopover('waist')}
              </td>
              <td className="text-right font-weight-bold p-4">
                {this.props.user.waist} cm
              </td>
            </tr>
            <tr>
              <td className="text-muted p-4">
                <FormattedMessage id={messages.field.hip}/>
                &nbsp;
                {createPopover('hip')}
              </td>
              <td className="text-right font-weight-bold p-4">
                {this.props.user.hip} cm
              </td>
            </tr>
            <tr>
              <td className="text-muted p-4">
                <FormattedMessage id={messages.field.foot}/>
                &nbsp;
                {createPopover('foot')}
              </td>
              <td className="text-right font-weight-bold p-4">
                {this.props.user.foot} cm
              </td>
            </tr>
            <tr className="zv-group">
              <td className="text-muted p-4">
                <FormattedMessage id={messages.field.highestQualificationLevel}/>
              </td>
              <td className="text-right font-weight-bold p-4">
                <FormattedMessage
                  id={messages.qualificationLevel[this.props.user.highestQualificationLevel]}
                />
              </td>
            </tr>
            <tr>
              <td className="text-muted p-4">
                <FormattedMessage id={messages.field.isStudent}/>
              </td>
              <td className="text-right font-weight-bold p-4">
                {
                  this.props.user.isStudent ?
                    <i className="fa fa-check text-success"/> :
                    <i className="fa fa-ban text-danger"/>
                }
              </td>
            </tr>
            <tr>
              <td className="text-muted p-4">
                <FormattedMessage id={messages.field.drivingLicense}/>
              </td>
              <td className="text-right font-weight-bold p-4">
                {
                  this.props.user.hasDrivingLicense ?
                    <i className="fa fa-check text-success"/> :
                    <i className="fa fa-ban text-danger"/>
                }
              </td>
            </tr>
            {
              this.props.user.languages
                .sort((itemB, itemA) => {
                  if (itemA.level === 'NATIVE') {
                    return 1;
                  } else if (itemB.level === 'NATIVE') {
                    return -1;
                  } else if (itemA.level === 'PROFESSIONAL') {
                    return 1;
                  } else if (itemB.level === 'PROFESSIONAL') {
                    return -1;
                  } else if (itemA.level === 'INTERMEDIATE') {
                    return 1;
                  } else if (itemB.level === 'INTERMEDIATE') {
                    return -1;
                  }

                  return 1;
                })
                .map((item, index) =>
                  <tr className={`${index === 0 ? 'zv-group' : ''}`} key={index}>
                    <td className="text-muted p-4">
                      <FormattedMessage id={messages.language[item.language]}/>
                    </td>
                    <td className="text-right font-weight-bold p-4">
                      <FormattedMessage id={messages.languageLevel[item.level]}/>
                    </td>
                  </tr>
                )
            }
          </tbody>
        </table>
      </div>
    );
  }
}
