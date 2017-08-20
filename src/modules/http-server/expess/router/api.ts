import 'reflect-metadata';
import { Router, Response, Request, NextFunction } from 'express';
import { METADATA_KEY_HTTP_ROUTE, HttpRouteOptions } from '../../../../decorators/http-route';
import { ILoggerService } from '../../../log/types';
import {
  IHttpController,
  HttpControllerRequestParams,
  HttpControllerResponse
} from '../../types';

export type ApiRouterConfig = {
  apiControllers: IHttpController[];
  loggerService: ILoggerService;
};

export function createApiRouter({apiControllers, loggerService}: ApiRouterConfig) {
  const router = Router();

  apiControllers.forEach((controller) => {
    Object.keys(controller.constructor.prototype).forEach((methodName) => {
      if (typeof controller[methodName] !== 'function') {
        return;
      }

      const httpRouteOptions: HttpRouteOptions = Reflect.getMetadata(
        METADATA_KEY_HTTP_ROUTE,
        controller,
        methodName
      );

      if (httpRouteOptions) {
        const debugPrefix = `${controller.constructor.name}.${methodName}`;
        loggerService.debug(`adding ${debugPrefix} to`, httpRouteOptions);

        router[httpRouteOptions.method.toLowerCase()](
          httpRouteOptions.path,
          async (req: Request, res: Response, next: NextFunction) => {
            loggerService.debug(`executing ${debugPrefix}...`);

            try {
              const requestParams: HttpControllerRequestParams = {
                headers: req.headers,
                params: req.params,
                query: req.query,
                payload: req.body,
                remoteAddress: req.ip
              };

              // TODO: json schema validation based on the annotation

              let httpResponse: HttpControllerResponse = await controller[methodName](requestParams);
              loggerService.debug(`execution of ${debugPrefix} returned with`, httpResponse);

              httpResponse = httpResponse || {};

              if (typeof httpResponse.statusCode === 'number') {
                res.status(httpResponse.statusCode);
              }

              if (typeof httpResponse.payload !== 'undefined') {
                res.json(httpResponse.payload);
              } else {
                res.send();
              }
            } catch (e) {
              loggerService.error(`execution of ${debugPrefix} failed`, e);
              next(e);
            }
          }
        );
      }
    });
  });

  return router;
}
