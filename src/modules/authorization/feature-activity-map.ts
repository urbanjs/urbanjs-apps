import { Activity, Feature } from './types';

import {
  ACTIVITY_VIEW_CALENDAR,
  ACTIVITY_VIEW_MESSAGES,
  ACTIVITY_VIEW_PROFILE,
  ACTIVITY_VIEW_JOBS,
  FEATURE_CORE,
  FEATURE_BETA
} from '../../constants';

export const featureActivityMap = new Map<Feature, Activity[]>([
  [FEATURE_CORE, [
    ACTIVITY_VIEW_PROFILE
  ]],

  [FEATURE_BETA, [
    ACTIVITY_VIEW_MESSAGES,
    ACTIVITY_VIEW_JOBS,
    ACTIVITY_VIEW_CALENDAR
  ]]
]);
