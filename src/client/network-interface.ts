import { createBatchingNetworkInterface } from 'react-apollo';
import { PATH_GRAPHQL } from '../constants';
import { sendHttpRequests, receiveHttpResponses } from '../actions';
import { store } from './store';
import { config } from './config';

export const networkInterface = createBatchingNetworkInterface({
  uri: `${config.serverOrigin}${PATH_GRAPHQL}`,
  batchInterval: 10,
  batchMax: 25,
  opts: {
    credentials: 'include'
  }
});

export type MiddlewareRequest = {
  requests: Request[];
  options: RequestInit;
};

networkInterface.use([{
  applyBatchMiddleware(req: MiddlewareRequest, next: Function) {
    store.dispatch(sendHttpRequests({requests: req.requests}));

    if (config.devMode) {
      // imitate network latency
      setTimeout(next, 300);
    } else {
      next();
    }
  }
}]);

export type AfterwareResponse = {
  responses: Response[];
  options: RequestInit;
};

networkInterface.useAfter([{
  applyBatchAfterware(res: AfterwareResponse, next: Function) {
    // TODO: find a better way to wait a couple of milliseconds
    //       to let a new http request start if needed
    setTimeout(() => store.dispatch(receiveHttpResponses({responses: res.responses})), 50);
    next();
  }
}]);
