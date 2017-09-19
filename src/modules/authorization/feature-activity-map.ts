import { Activity, Feature } from './types';

import {
  ACTIVITY_SEND_PING,
  ACTIVITY_VIEW_NOTIFICATIONS,
  FEATURE_CORE,
  FEATURE_BETA
} from '../../constants';

export const featureActivityMap = new Map<Feature, Activity[]>([
  [FEATURE_CORE, [
    ACTIVITY_VIEW_NOTIFICATIONS,
    ACTIVITY_SEND_PING
  ]],

  [FEATURE_BETA, []]
]);
