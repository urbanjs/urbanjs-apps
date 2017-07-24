import { join } from 'path';
import { ExpressRouterFactory, ExpressRequest, ExpressResponse } from '../../../types';

export type AppRouterConfig = {
  absoluteStaticPath: string;
  routerFactory: ExpressRouterFactory;
};

export function createAppRouter({absoluteStaticPath, routerFactory}: AppRouterConfig) {
  const router = routerFactory();

  router.get('*', (req: ExpressRequest, res: ExpressResponse) => {
    res.sendFile(join(absoluteStaticPath, 'index.html'));
  });

  return router;
}
