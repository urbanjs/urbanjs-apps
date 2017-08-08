import { injectable, inject, track } from '../../decorators';
import { TYPE_SERVICE_LOGGER, ILoggerService } from '../log/types';
import { featureActivityMap } from './feature-activity-map';
import { IAuthorizationService, Feature, Activity } from './types';

@injectable()
export class AuthorizationService implements IAuthorizationService {

  constructor(@inject(TYPE_SERVICE_LOGGER) private loggerService: ILoggerService) {
  }

  @track()
  isActivityAllowed(activity: Activity, features: Feature[]) {
    return features.some(feature => {
      const allowedActivity = featureActivityMap.get(feature);

      if (typeof allowedActivity === 'undefined') {
        this.loggerService.debug('unknown feature', feature);
        return false;
      }

      return allowedActivity.indexOf(activity) !== -1;
    });
  }
}
