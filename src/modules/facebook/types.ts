export const TYPE_FACEBOOK_API_SERVICE = 'TYPE_FACEBOOK_API_SERVICE';
export const TYPE_FACEBOOK_API_SERVICE_CONFIG = 'TYPE_FACEBOOK_API_SERVICE_CONFIG';

export type FacebookApiServiceConfig = {
  appId: string;
  appSecret: string;
};

export type FacebookAccessToken = {
  token: string;
  expiresAt: Date;
};

export type FacebookPermission = {
  id: string;
  granted: boolean;
};

export type FacebookPhoto = {
  id: string;
  uri: string;
};

export interface IFacebookApiService {
  getLongLivedToken(accessToken: string): Promise<FacebookAccessToken>;
  getPermissions(facebookUserId: string, accessToken: string): Promise<FacebookPermission[]>;
  getPhotos(facebookUserId: string, accessToken: string): Promise<FacebookPhoto[]>;
}
