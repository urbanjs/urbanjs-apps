import { injectable, inject, track } from '../../decorators';
import { ImplementationError } from '../error/errors';
import * as knownPaths from '../../constants/paths';
import { ILoggerService, TYPE_SERVICE_LOGGER } from '../log/types';
import {
  TYPE_ROUTE_SERVICE_CONFIG,
  RouterServiceConfig,
  IRouteService,
  FormatOptions
} from './types';

@injectable()
export class RouteService implements IRouteService {
  constructor(@inject(TYPE_ROUTE_SERVICE_CONFIG) private config: RouterServiceConfig,
              @inject(TYPE_SERVICE_LOGGER) private loggerService: ILoggerService) {
  }

  @track()
  format(rawPath: string, options: FormatOptions) {
    let origin = '';

    if (options && options.prefixWithOrigin) {
      if (!Object.keys(knownPaths).some(knownPathName => {
          if (knownPaths[knownPathName] === rawPath) {
            origin = knownPathName.indexOf('PATH_APP') === 0
              ? this.config.appOrigin
              : this.config.serverOrigin;

            return true;
          }

          return false;
        })) {
        this.loggerService.error('Unknown path', rawPath);
        throw new ImplementationError('unknown path');
      }
    }

    const params = options && options.params || {};
    const resolvedPath = rawPath.replace(/:([^\/]+)/g, (match, key) => {
      if (!params.hasOwnProperty(key)) {
        this.loggerService.error('Missing route parameter', rawPath, key);
        throw new ImplementationError('missing route parameter');
      }

      return params[key];
    });

    return `${origin}${resolvedPath}`;
  }

  @track()
  isPathKnown(rawPath: string) {
    return Object.keys(knownPaths).some(knownPathName => knownPaths[knownPathName] === rawPath);
  }
}
