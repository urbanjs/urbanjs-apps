import { format } from 'url';
import { injectable, inject, track } from '../../decorators';
import { IHttpService, TYPE_HTTP_SERVICE } from '../http/types';
import {
  TYPE_FACEBOOK_API_SERVICE_CONFIG,
  FacebookApiServiceConfig,
  IFacebookApiService
} from './types';

const GRAPH_API_URL = 'https://graph.facebook.com';

export type PermissionsResponse = {
  data: {
    permission: string;
    status: 'granted' | 'declined'
  }[];
};

@injectable()
export class FacebookApiService implements IFacebookApiService {

  constructor(@inject(TYPE_FACEBOOK_API_SERVICE_CONFIG) private config: FacebookApiServiceConfig,
              @inject(TYPE_HTTP_SERVICE) private httpService: IHttpService) {
  }

  @track()
  async getLongLivedToken(accessToken: string) {
    const result = await this.httpService.request<{ access_token: string, expires_in: number }>({
      uri: format({
        host: GRAPH_API_URL,
        pathname: '/oauth/access_token',
        query: {
          grant_type: 'fb_exchange_token',
          client_id: this.config.appId,
          client_secret: this.config.appSecret,
          fb_exchange_token: accessToken
        }
      }),
      method: 'GET'
    });

    return {
      token: result.access_token,
      expiresAt: new Date(new Date().getTime() + result.expires_in * 1000)
    };
  }

  @track()
  async getPermissions(facebookUserId: string, accessToken: string) {
    const result = await this.httpService.request<PermissionsResponse>({
      uri: format({
        host: GRAPH_API_URL,
        pathname: `/${facebookUserId}/permissions`
      }),
      headers: {
        authorization: `OAuth ${accessToken}`
      },
      method: 'GET'
    });

    return result.data.map(item => ({
      id: item.permission,
      granted: item.status === 'granted'
    }));
  }
}
