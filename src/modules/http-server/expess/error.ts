import { Request, Response, NextFunction } from 'express';
import { ILoggerService } from '../../log/types';
import { IErrorService } from '../../error/types';

export type ErrorHandlerConfig = {
  loggerService: ILoggerService;
  errorService: IErrorService;
  devMode: boolean;
};

export function createErrorHandler({loggerService, devMode, errorService}: ErrorHandlerConfig) {
  return (err: Error, req: Request, res: Response, next: NextFunction) => {
    loggerService.error('unhandled request error', err);

    try {
      const httpError = errorService.createHttpError(err);

      Object.keys(httpError.headers).forEach(header => {
        res.header(header, httpError.headers[header]);
      });

      res.status(httpError.statusCode);

      res.json({
        error: httpError.toResponse(devMode)
      });
    } catch (e) {
      loggerService.error('error handler middleware failed', err);

      res.status(500);
      res.json({
        error: {
          message: 'internal server error'
        }
      });
    }
  };
}
