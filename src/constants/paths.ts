export function toPath(strings: TemplateStringsArray, ...args: string[]) {
  const trim = (str?: string) => (str || '').replace(/^\/?(.*?)\/?$/, '$1');

  const parts = strings.reduce(
    (acc, value, index) =>
      [acc, trim(value), trim(args[index])].filter(item => !!item).join('/'),
    ''
  );

  return `/${parts}`;
}

export const PATH_GRAPHQL = toPath`/graphql`;
export const PATH_GRAPHQL_PLAYGROUND = toPath`${PATH_GRAPHQL}/playground`;

export const PATH_API = toPath`/api`;
export const PATH_API_HEALTH = toPath`${PATH_API}/health`;
export const PATH_API_REPORT_ERROR = toPath`${PATH_API}/v1/report/error`;

export const PATH_AUTH = toPath`/auth`;
export const PATH_AUTH_LOGOUT = toPath`${PATH_AUTH}/logout`;
export const PATH_AUTH_FACEBOOK = toPath`${PATH_AUTH}/facebook`;
export const PATH_AUTH_FACEBOOK_RESTART = toPath`${PATH_AUTH}/facebook/restart`;
export const PATH_AUTH_FACEBOOK_CALLBACK = toPath`${PATH_AUTH_FACEBOOK}/callback`;

export const PATH_APP = toPath`/`;
export const PATH_APP_404 = toPath`/404`;
export const PATH_APP_ACCOUNT = toPath`${PATH_APP}/account`;
export const PATH_APP_ACCOUNT_EDIT = toPath`${PATH_APP_ACCOUNT}/edit`;
export const PATH_APP_CALENDAR = toPath`${PATH_APP}/calendar`;
export const PATH_APP_NOTIFICATIONS = toPath`${PATH_APP}/notifications`;
