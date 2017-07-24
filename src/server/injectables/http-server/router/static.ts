import {StaticExpressMiddlewareFactory} from '../../../types';

export type StaticRouterConfig = {
  relativeStaticPath: string;
  staticMiddlewareFactory: StaticExpressMiddlewareFactory
};

export function createStaticRouter({relativeStaticPath, staticMiddlewareFactory}: StaticRouterConfig) {
  return staticMiddlewareFactory({relativeStaticPath});
}
