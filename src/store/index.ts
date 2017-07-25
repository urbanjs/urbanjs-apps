import { createStore as createReduxStore, applyMiddleware, compose, Middleware } from 'redux';
import { root as rootReducer } from '../reducers';
import { root as rootEpic } from '../epics';
import { createLoggerMiddleware, createEpicMiddleware } from './middlewares';

export type StoreConfig = {
  platform: 'browser' | 'node',
  devMode: boolean
};

export function createStore(initialState: object = {}, config: StoreConfig) {
  const middlewares: Middleware[] = [createEpicMiddleware(rootEpic)];

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
    rootReducer,
    initialState,
    composeEnhancer(applyMiddleware(...middlewares))
  );
}
