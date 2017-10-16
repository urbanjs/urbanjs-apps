import { injectable, inject, track } from '../../decorators';
import { ImplementationError } from '../error/errors';
import * as knownPaths from '../../constants/paths';
import { ILoggerService, TYPE_SERVICE_LOGGER } from '../log/types';
import { IRouteService, FormatOptions } from './types';

@injectable()
export class RouteService implements IRouteService {
  constructor(@inject(TYPE_SERVICE_LOGGER) private loggerService: ILoggerService) {
  }

  @track()
  format(rawPath: string, options: FormatOptions) {
    const params = options && options.params || {};
    return rawPath.replace(/:([^\/]+)/g, (match, key) => {
      if (!params.hasOwnProperty(key)) {
        this.loggerService.error('Missing route parameter', rawPath, key);
        throw new ImplementationError('missing route parameter');
      }

      return params[key];
    });
  }

  @track()
  isPathKnown(rawPath: string) {
    return Object.keys(knownPaths).some(knownPathName => knownPaths[knownPathName] === rawPath);
  }
}
