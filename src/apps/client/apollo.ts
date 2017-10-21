import { createBatchingNetworkInterface, ApolloClient } from 'react-apollo';
import { get as getCookie } from 'js-cookie';
import { CSRF_TOKEN_KEY, PATH_GRAPHQL } from '../../constants';
import { sendHttpRequests, receiveHttpResponses } from '../../state/actions';
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
    const {store} = require('./store');
    store.dispatch(sendHttpRequests({requests: req.requests}));

    req.options.headers = {
      ...req.options.headers || {},
      [CSRF_TOKEN_KEY]: getCookie(CSRF_TOKEN_KEY)
    };

    next();
  }
}]);

export type AfterwareResponse = {
  responses: Response[];
  options: RequestInit;
};

networkInterface.useAfter([{
  applyBatchAfterware(res: AfterwareResponse, next: Function) {
    const store = require('./store').store;

    store.dispatch(receiveHttpResponses({responses: res.responses}));
    next();
  }
}]);

export const apolloClient = new ApolloClient({
  networkInterface,
  queryDeduplication: true,
  connectToDevTools: config.connectToDevTools
});
