import * as express from 'express';

export type StaticRouterConfig = {
  relativePublicPath: string;
};

export function createStaticRouter({relativePublicPath}: StaticRouterConfig) {
  return express.static(relativePublicPath);
}
