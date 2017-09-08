import { makeLoggerMiddleware, textSerializer } from 'inversify-logger-middleware';
import * as colors from 'chalk';

export function createLoggerMiddleware() {
  return makeLoggerMiddleware(
    {
      time: true,
      request: {
        serviceIdentifier: true
      }
    },
    (logEntry) => {
      if (logEntry.error) {
        // tslint:disable-next-line no-console
        console.error(
          textSerializer(Object.assign({}, logEntry, {error: false}))
            .replace(/(\s*\S*){3}/, colors.red(`Error while including ${logEntry.serviceIdentifier}\n`))
        );
      }
    }
  );
}
