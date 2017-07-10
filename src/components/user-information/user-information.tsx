import * as React from 'react';
import './user-information.css';

const user = {
  firstName: 'Emily',
  lastName: 'Ratajkowski',
  birthDate: new Date('1990-01-30'),
  height: 168,
  chest: 90,
  waist: 60,
  hip: 90,
  foot: 25,
  eye: 'BROWN',
  hair: 'BLACK',
  hasDrivingLicense: true,
  isStudent: true,
  highestQualificationLevel: 'university',
  languages: [
    {
      language: 'ENGLISH',
      level: 'INTERMEDIATE'
    },
    {
      language: 'HUNGARIAN',
      level: 'NATIVE'
    }
  ]
};

export type OwnProps = {};

export type State = {
  activePopover: 'none' | 'height' | 'chest' | 'waist' | 'hip' | 'foot';
};

export type UserInformationProps = OwnProps;

export class UserInformation extends React.Component<UserInformationProps, State> {
  props: UserInformationProps;
  state: State = {
    activePopover: 'none'
  };

  render() {
    return (
      <div className="zv-user-information bg-faded m-2 p-4">
        <a className="text-primary float-right btn btn-link m-3">
          <i className="fa fa-2x fa-pencil-square-o align-middle"/>
          <br/>
          Szerkesztés
        </a>

        <div className="p-4">
          <i className="fa fa-3x fa-info align-bottom text-primary"/>
          <h3 className="d-inline-block ml-4 text-muted">Adatok</h3>
        </div>

        <table className="table">
          <tbody>
            <tr className="zv-group">
              <td className="text-muted p-4">
                Név
              </td>
              <td className="text-right font-weight-bold p-4">
                {user.firstName} {user.lastName}
              </td>
            </tr>
            <tr>
              <td className="text-muted p-4">Kor</td>
              <td className="text-right font-weight-bold p-4">
                26 éves
              </td>
            </tr>
            <tr>
              <td className="text-muted p-4">Lakhely</td>
              <td className="text-right font-weight-bold p-4">
                Budapest
              </td>
            </tr>
            <tr className="zv-group">
              <td className="text-muted p-4">
                Magasság
                &nbsp;
                <i
                  className="zv-help text-primary fa fa fa-question-circle"
                  onClick={() => this.setState({
                    activePopover: this.state.activePopover === 'height'
                      ? 'none' : 'height'
                  })}
                >
                  <div className={`popover popover-top ${this.state.activePopover === 'height' ? '' : 'd-none'}`}>
                    <div className="popover-title">Segítség</div>
                    <div className="popover-content">
                      <p>
                        Fejtetőtől talpig mérjük, cipő nélkül, összezárt lábbal
                      </p>
                    </div>
                  </div>
                </i>
              </td>
              <td className="text-right font-weight-bold p-4">
                {user.height} cm
              </td>
            </tr>
            <tr>
              <td className="text-muted p-4">
                Mellbőség
                &nbsp;
                <i
                  className="zv-help text-primary fa fa fa-question-circle"
                  onClick={() => this.setState({
                    activePopover: this.state.activePopover === 'chest'
                      ? 'none' : 'chest'
                  })}
                >
                  <div className={`popover popover-top ${this.state.activePopover === 'chest' ? '' : 'd-none'}`}>
                    <div className="popover-title">Segítség</div>
                    <div className="popover-content">
                      <p>
                        A mell legerősebb részén vízszintesen körbemérjük.
                      </p>
                    </div>
                  </div>
                </i>
              </td>
              <td className="text-right font-weight-bold p-4">
                {user.chest} cm
              </td>
            </tr>
            <tr>
              <td className="text-muted p-4">
                Derék
                &nbsp;
                <i
                  className="zv-help text-primary fa fa fa-question-circle"
                  onClick={() => this.setState({
                    activePopover: this.state.activePopover === 'waist'
                      ? 'none' : 'waist'
                  })}
                >
                  <div className={`popover popover-top ${this.state.activePopover === 'waist' ? '' : 'd-none'}`}>
                    <div className="popover-title">Segítség</div>
                    <div className="popover-content">
                      <p>A törzs legkeskenyebb részén vízszintesen körbemérjük.</p>
                    </div>
                  </div>
                </i>
              </td>
              <td className="text-right font-weight-bold p-4">
                {user.waist} cm
              </td>
            </tr>
            <tr>
              <td className="text-muted p-4">
                Csípő
                &nbsp;
                <i
                  className="zv-help text-primary fa fa fa-question-circle"
                  onClick={() => this.setState({
                    activePopover: this.state.activePopover === 'hip'
                      ? 'none' : 'hip'
                  })}
                >
                  <div className={`popover popover-top ${this.state.activePopover === 'hip' ? '' : 'd-none'}`}>
                    <div className="popover-title">Segítség</div>
                    <div className="popover-content">
                      <p>A csípő legerősebb részén vízszintesen körbemérjük</p>
                    </div>
                  </div>
                </i>
              </td>
              <td className="text-right font-weight-bold p-4">
                {user.hip} cm
              </td>
            </tr>
            <tr>
              <td className="text-muted p-4">
                Láb
                &nbsp;
                <i
                  className="zv-help text-primary fa fa fa-question-circle"
                  onClick={() => this.setState({
                    activePopover: this.state.activePopover === 'foot'
                      ? 'none' : 'foot'
                  })}
                >
                  <div className={`popover popover-top ${this.state.activePopover === 'foot' ? '' : 'd-none'}`}>
                    <div className="popover-title">Segítség</div>
                    <div className="popover-content">
                      <p>A talk belső felén, a nagylábujj elejétől a sarok végéig mérjük.</p>
                    </div>
                  </div>
                </i>
              </td>
              <td className="text-right font-weight-bold p-4">
                {user.foot} cm
              </td>
            </tr>
            <tr className="zv-group">
              <td className="text-muted p-4">Legmagasabb iskolai végzettség</td>
              <td className="text-right font-weight-bold p-4">
                {user.highestQualificationLevel === 'university' ? 'Egyetem' : '-'}
              </td>
            </tr>
            <tr>
              <td className="text-muted p-4">Aktív hallgatói jogviszony</td>
              <td className="text-right font-weight-bold p-4">
                {user.isStudent ? 'van' : 'nincs'}
              </td>
            </tr>
            <tr>
              <td className="text-muted p-4">Jogosítvány</td>
              <td className="text-right font-weight-bold p-4">
                {user.hasDrivingLicense ? 'van' : 'nincs'}
              </td>
            </tr>
            <tr className="zv-group">
              <td className="text-muted p-4">Angol</td>
              <td className="text-right font-weight-bold p-4">
                felsőfok
              </td>
            </tr>
            <tr>
              <td className="text-muted p-4">Német</td>
              <td className="text-right font-weight-bold p-4">
                középfok
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
