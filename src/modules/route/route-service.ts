import { injectable, track } from '../../decorators';
import { IRouteService, FormatOptions } from './types';

@injectable()
export class RouteService implements IRouteService {

  @track()
  format(path: string, options: FormatOptions) {
    const {params} = options;

    return Object.keys(params).reduce(
      (acc, key) => acc.replace(`:${key}`, params[key]),
      path
    );
  }
}
