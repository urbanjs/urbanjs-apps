import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { PATH_AUTH_FACEBOOK } from '../../../constants';
import { inject } from '../../../decorators';
import { TYPE_ROUTE_SERVICE, IRouteService } from '../../../modules/route/types';
import { messages } from './messages';
import './four01.css';

export type OwnProps = {
  unauthenticated?: boolean
};

export type Four01Props = OwnProps & RouteComponentProps<null>;

export class Four01 extends React.Component<Four01Props, {}> {
  props: Four01Props;

  @inject(TYPE_ROUTE_SERVICE)
  private routeService: IRouteService;

  render() {
    const loginUrl = this.routeService.format(PATH_AUTH_FACEBOOK, {prefixWithOrigin: true});
    const redirectUri = this.routeService.format(this.props.location.pathname, {prefixWithOrigin: true});
    const redirectUriQueryParam = `?redirect_uri=${encodeURIComponent(redirectUri)}`;

    return (
      <div className="zv-four01">
        <div className="cover">
          <FormattedMessage tagName="h1" id={messages.error}/>
          <div className="lead">
            <FormattedMessage id={messages.four01}/>
            <br/>
            {this.props.unauthenticated
              ? (
                <div>
                  <FormattedMessage id={messages.authenticate}/>
                  <a
                    className="btn btn-primary w-100"
                    href={`${loginUrl}${redirectUriQueryParam}`}
                  >
                    <FormattedMessage id={messages.login}/>
                  </a>
                </div>)
              : ''
            }
          </div>
        </div>
      </div>
    );
  }
}

export const Four01WithRouter = withRouter<OwnProps>(Four01);
