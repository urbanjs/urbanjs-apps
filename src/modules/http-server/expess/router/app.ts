import { join } from 'path';
import { Router, Response, Request } from 'express';
import { ENV_VARIABLE_PREFIX_FOR_CLIENT } from '../../../../constants';

export type AppRouterConfig = {
  absolutePublicPath: string;
};

export function createAppRouter({absolutePublicPath}: AppRouterConfig) {
  const router = Router();

  router.get('/config.js', (req: Request, res: Response) => {
    const content = [
      'window.process = window.process || {};',
      'window.process.env = window.process.env || {};'
    ];

    Object.keys(process.env).forEach((item) => {
      if (new RegExp(`^${ENV_VARIABLE_PREFIX_FOR_CLIENT}__`).test(item)) {
        content.push(`window.process.env['${item}'] = '${process.env[item]}'`);
      }
    });

    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.send(content.join('\n'));
  });

  router.get('*', (req: Request, res: Response) => {
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.sendFile(join(absolutePublicPath, 'index.html'));
  });

  return router;
}
