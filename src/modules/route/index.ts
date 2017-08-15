import { ContainerModule } from 'inversify';
import { RouteService } from './route-service';
import {
  IRouteService,
  TYPE_ROUTE_SERVICE
} from './types';

export const routeModule = new ContainerModule((bind) => {
  bind<IRouteService>(TYPE_ROUTE_SERVICE).to(RouteService);
});
