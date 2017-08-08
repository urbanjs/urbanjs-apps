export const TYPE_AUTHORIZATION_SERVICE = 'TYPE_AUTHORIZATION_SERVICE';

export type Feature =
  'CORE' |
  'BETA';

export type Activity =
  'ACTIVITY_VIEW_PROFILE' |
  'ACTIVITY_VIEW_JOBS' |
  'ACTIVITY_VIEW_MESSAGES' |
  'ACTIVITY_VIEW_CALENDAR' |
  'ACTIVITY_VIEW_NOTIFICATIONS';

export interface IAuthorizationService {
  isActivityAllowed(activity: Activity, availableFeatures: Feature[]): boolean;
}
