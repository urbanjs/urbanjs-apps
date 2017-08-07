import { join } from 'path';
import { Router, Response, Request } from 'express';

export type AppRouterConfig = {
  absolutePublicPath: string;
};

export function createAppRouter({absolutePublicPath}: AppRouterConfig) {
  const router = Router();

  router.get('*', (req: Request, res: Response) => {
    res.sendFile(join(absolutePublicPath, 'index.html'));
  });

  return router;
}
