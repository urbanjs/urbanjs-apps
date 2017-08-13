export function toPath(strings: TemplateStringsArray, ...args: string[]) {
  const trim = (str?: string) => (str || '').replace(/(.+)\/$/, '$1');

  return strings.reduce(
    (acc, value, index) =>
      `${acc}${trim(value)}${trim(args[index])}`,
    ''
  );
}

export const PATH_GRAPHQL = toPath`/graphql`;
export const PATH_GRAPHQL_PLAYGROUND = toPath`${PATH_GRAPHQL}/playground`;

export const PATH_API = toPath`/api`;
export const PATH_API_HEALTH = toPath`${PATH_API}/health`;
export const PATH_API_REPORT_ERROR = toPath`${PATH_API}/v1/report/error`;

export const PATH_AUTH = toPath`/auth`;
export const PATH_AUTH_LOGOUT = toPath`${PATH_AUTH}/logout`;
export const PATH_AUTH_FACEBOOK = toPath`${PATH_AUTH}/facebook`;
export const PATH_AUTH_FACEBOOK_CALLBACK = toPath`${PATH_AUTH_FACEBOOK}/callback`;

export const PATH_APP = toPath`/`;
export const PATH_APP_PROFILE = toPath`${PATH_APP}/profile`;
export const PATH_APP_PROFILE_INFORMATION = toPath`${PATH_APP_PROFILE}/about`;
export const PATH_APP_PROFILE_INFORMATION_EDIT = toPath`${PATH_APP_PROFILE_INFORMATION}/edit`;
export const PATH_APP_PROFILE_GALLERY = toPath`${PATH_APP_PROFILE}/gallery`;
export const PATH_APP_CALENDAR = toPath`${PATH_APP}/calendar`;
export const PATH_APP_MESSAGES = toPath`${PATH_APP}/messages`;
export const PATH_APP_JOBS = toPath`${PATH_APP}/jobs`;
export const PATH_APP_NOTIFICATIONS = toPath`${PATH_APP}/notifications`;
