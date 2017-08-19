import { createStore as createReduxStore, applyMiddleware, compose, Middleware, ReducersMapObject } from 'redux';
import { ApolloClient } from 'react-apollo';
import { root as rootReducer } from '../reducers';
import { root as rootEpic } from '../epics';
import { createLoggerMiddleware, createEpicMiddleware } from './middlewares';

export type StoreConfig = {
  platform: 'browser' | 'node';
  devMode: boolean;
  apolloClient?: ApolloClient;
};

export function createStore(initialState: object = {}, config: StoreConfig) {
  const middlewares: Middleware[] = [createEpicMiddleware(rootEpic)];
  const extraReducers: ReducersMapObject = {};

  if (config.apolloClient) {
    extraReducers.apollo = config.apolloClient.reducer();
    middlewares.push(config.apolloClient.middleware());
  }

  if (config.devMode) {
    middlewares.push(createLoggerMiddleware());
  }

  let composeEnhancer = compose;
  if (config.devMode) {
    // https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension
    const devToolsExtensionKey = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__';
    if (config.platform === 'browser' && window && window.hasOwnProperty(devToolsExtensionKey)) {
      composeEnhancer = window[devToolsExtensionKey];
    }
  }

  return createReduxStore(
    rootReducer(extraReducers),
    initialState,
    composeEnhancer(applyMiddleware(...middlewares))
  );
}
