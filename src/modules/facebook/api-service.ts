import { format } from 'url';
import { injectable, inject, track } from '../../decorators';
import { IHttpService, TYPE_HTTP_SERVICE } from '../http/types';
import { ILoggerService, TYPE_SERVICE_LOGGER } from '../log/types';
import { NotFoundError } from '../error/errors';
import {
  TYPE_FACEBOOK_API_SERVICE_CONFIG,
  FacebookApiServiceConfig,
  IFacebookApiService
} from './types';

const GRAPH_API_URL = 'https://graph.facebook.com';
const ALBUM_NAME = 'zingvo';

export type PermissionsResponse = {
  data: {
    permission: string;
    status: 'granted' | 'declined'
  }[];
};

export type AlbumsResponse = {
  data: {
    id: string;
    name: string;
  }[];
};

export type PhotosResponse = {
  data: {
    id: string;
    images: { width: number, height: number, source: string }[];
  }[];
};

@injectable()
export class FacebookApiService implements IFacebookApiService {

  constructor(@inject(TYPE_FACEBOOK_API_SERVICE_CONFIG) private config: FacebookApiServiceConfig,
              @inject(TYPE_HTTP_SERVICE) private httpService: IHttpService,
              @inject(TYPE_SERVICE_LOGGER) private loggerService: ILoggerService) {
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

  @track()
  async getPhotos(facebookUserId: string, accessToken: string) {
    const albums = await this.httpService.request<AlbumsResponse>({
      uri: format({
        host: GRAPH_API_URL,
        pathname: `/${facebookUserId}/albums`,
        query: {
          limit: 25
        }
      }),
      headers: {
        authorization: `OAuth ${accessToken}`
      },
      method: 'GET'
    });

    // TODO: add pagination support
    if (albums.data.length > 25) {
      this.loggerService.warn('pagination would have been useful');
    }

    let zingvoAlbumId;
    for (const album of albums.data) {
      if (album.name === ALBUM_NAME) {
        zingvoAlbumId = album.id;
        break;
      }
    }

    if (!zingvoAlbumId) {
      throw new NotFoundError(`album with the name ${ALBUM_NAME} not found`);
    }

    const photos = await this.httpService.request<PhotosResponse>({
      uri: format({
        host: GRAPH_API_URL,
        pathname: `/${zingvoAlbumId}/photos`,
        query: {
          fields: 'id,images'
        }
      }),
      headers: {
        authorization: `OAuth ${accessToken}`
      },
      method: 'GET'
    });

    return photos.data.map(item => ({
      id: item.id,
      uri: item.images[0].source
    }));
  }
}
