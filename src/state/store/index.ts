import {
  createStore as createReduxStore,
  applyMiddleware,
  compose,
  Middleware,
  ReducersMapObject,
  Store
} from 'redux';
import { ApolloClient } from 'react-apollo';
import { root as rootReducer, RootState } from '../reducers';
import { root as rootEpic } from '../epics';
import { createLoggerMiddleware, createEpicMiddleware } from './middlewares';

export type StoreConfig = {
  platform: 'browser' | 'node';
  showDebugLogs?: boolean;
  connectToDevTools?: boolean;
  apolloClient?: ApolloClient;
};

export function createStore(initialState: object = {}, config: StoreConfig): Store<RootState> {
  const middlewares: Middleware[] = [createEpicMiddleware(rootEpic)];
  const extraReducers: ReducersMapObject = {};

  if (config.apolloClient) {
    extraReducers.apollo = config.apolloClient.reducer();
    middlewares.push(config.apolloClient.middleware());
  }

  if (config.showDebugLogs) {
    middlewares.push(createLoggerMiddleware());
  }

  let composeEnhancer = compose;
  if (config.connectToDevTools) {
    // https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension
    const devToolsExtensionKey = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__';
    if (config.platform === 'browser' && window && window.hasOwnProperty(devToolsExtensionKey)) {
      composeEnhancer = window[devToolsExtensionKey];
    }
  }

  return createReduxStore<RootState>(
    rootReducer(extraReducers),
    initialState as RootState,
    composeEnhancer(applyMiddleware(...middlewares))
  );
}
