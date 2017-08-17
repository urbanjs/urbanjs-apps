import { ContainerModule } from 'inversify';
import { RouteService } from './route-service';
import {
  TYPE_ROUTE_SERVICE,
  IRouteService
} from './types';

export const routeModule = new ContainerModule((bind) => {
  bind<IRouteService>(TYPE_ROUTE_SERVICE).to(RouteService);
});
