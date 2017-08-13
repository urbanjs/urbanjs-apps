import { interfaces as inversify } from 'inversify';
import debounce = require('lodash.debounce');
import { ITraceService, TYPE_SERVICE_TRACE } from '../../../modules/log/types';

export type TraceMiddlewareConfig = {
  container: inversify.Container;
};

export function createTraceMiddleware({container}: TraceMiddlewareConfig) {
  let isTrackedByServiceIdentifierMap: object = {};
  let traceService: ITraceService;

  const applyTracker = debounce(() => {
    if (!traceService) {
      traceService = container.get<ITraceService>(TYPE_SERVICE_TRACE);
    }

    Object.keys(isTrackedByServiceIdentifierMap).forEach((id) => {
      if (!isTrackedByServiceIdentifierMap[id]) {
        container.getAll(id).forEach((value) => traceService.track(value));
        isTrackedByServiceIdentifierMap[id] = true;
      }
    });
  });

  return (next: inversify.Next) =>
    (args: inversify.NextArgs) => {
      const nextContextInterceptor = args.contextInterceptor;

      return next(Object.assign({}, args, {
        contextInterceptor: (context: inversify.Context) => {
          const request = context.plan.rootRequest;

          (function fetch(currentRequest: inversify.Request) {
            const id = <string> currentRequest.serviceIdentifier;

            if (!isTrackedByServiceIdentifierMap.hasOwnProperty(id)) {
              isTrackedByServiceIdentifierMap[id] = false;
              applyTracker();
            }

            currentRequest.childRequests.forEach(childRequest => fetch(childRequest));
          }(request));

          return nextContextInterceptor(context);
        }
      }));
    };
}
