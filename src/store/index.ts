import {createStore as createReduxStore, applyMiddleware, compose} from 'redux';
import {root as rootReducer} from '../reducers';
import {root as rootEpic} from '../epics';
import {createLoggerMiddleware, createEpicMiddleware} from './middlewares';

export type StoreConfig = {
  platform: 'browser' | 'node',
  env: 'development' | 'production'
};

export function createStore(initialState: object = {}, config: StoreConfig) {
  let enhancer;

  if (config.env !== 'production') {
    const enhancers = [];
    const middlewares = [
      createEpicMiddleware(rootEpic),
      createLoggerMiddleware()
    ];

    enhancers.push(applyMiddleware(...middlewares));

    // https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension
    let composeEnhancer = compose;
    const devToolsExtensionKey = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__';
    if (config.platform === 'browser' && window && window.hasOwnProperty(devToolsExtensionKey)) {
      composeEnhancer = window[devToolsExtensionKey];
    }

    enhancer = composeEnhancer.apply(null, enhancers);
  }

  return createReduxStore(rootReducer, initialState, enhancer);
}
