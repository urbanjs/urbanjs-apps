import { join } from 'path';
import { Router, Response, Request } from 'express';

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
      if (/^REACT_APP__/.test(item)) {
        content.push(`window.process.env['${item}'] = '${process.env[item]}'`);
      }
    });

    res.send(content.join('\n'));
  });

  router.get('*', (req: Request, res: Response) => {
    res.sendFile(join(absolutePublicPath, 'index.html'));
  });

  return router;
}
