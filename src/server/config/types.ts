export type Configuration = {
  port: number;
  hostOrigin: string;
  corsAllowedOrigins: string;
  devMode: boolean;
  absolutePublicPath: string;
  facebookAppId: string;
  facebookAppSecret: string;
  sessionSecret: string;
};
