import { createLogger as reduxLogger } from 'redux-logger';

export function createLoggerMiddleware() {
  return reduxLogger({
    collapsed: true
  });
}
