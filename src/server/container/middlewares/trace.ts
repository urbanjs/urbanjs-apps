import { interfaces as inversify } from 'inversify';
import { ITraceService } from '../../modules/log/types';

export type TraceMiddlewareConfig = {
  traceService: ITraceService;
};

export function createTraceMiddleware({traceService}: TraceMiddlewareConfig) {
  return (next: inversify.Next) =>
    (args: inversify.NextArgs) => {
      const result = next(args);

      if (typeof result === 'object'
        && !Array.isArray(result)
        && Object.getPrototypeOf(result) !== Object.prototype) {
        traceService.track(result);
      }

      return result;
    };
}
