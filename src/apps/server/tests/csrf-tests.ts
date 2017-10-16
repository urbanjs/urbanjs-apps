import 'dotenv/config';
import fetch from 'node-fetch';
import * as expect from 'assert';
import { createContainer } from '../container';
import {
  SESSION_KEY,
  CSRF_TOKEN_KEY,
  PATH_GRAPHQL,
  PATH_GRAPHQL_PLAYGROUND
} from '../../../constants';
import { TYPE_HTTP_SERVICE, IHttpService, HttpRequestOptions } from '../../../modules/http/types';
import {
  TYPE_HTTP_SERVER, IHttpServer
} from '../../../modules/http-server/types';
import { TYPE_SERVICE_LOGGER, ILoggerService } from '../../../modules/log/types';

describe('server', () => {
  let server: IHttpServer;
  let httpService: IHttpService;
  let serverOrigin: string;

  beforeEach(async () => {
    const container = createContainer();

    container.rebind<ILoggerService>(TYPE_SERVICE_LOGGER).toConstantValue({
      debug: () => null,
      info: () => null,
      warn: () => null,
      error: () => null
    });

    httpService = container.get<IHttpService>(TYPE_HTTP_SERVICE);
    server = container.get<IHttpServer>(TYPE_HTTP_SERVER);

    serverOrigin = (await server.start()).origin;
  });

  afterEach(async () => {
    await server.stop();
  });

  describe('security - csrf', () => {
    let requestOptions: HttpRequestOptions;
    beforeEach(() => {
      requestOptions = {
        uri: `${serverOrigin}${PATH_GRAPHQL}`,
        method: 'POST',
        body: {query: '{user{id}}'},
        headers: {
          'Content-Type': 'application/json'
        }
      };
    });

    describe('when POST /graphql request is sent', () => {
      describe(`and session cookie does not exist`, () => {
        it('allows the request', async () => {
          const response = await fetch(
            requestOptions.uri,
            {
              method: requestOptions.method,
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(requestOptions.body)
            }
          );

          expect.equal(response.status, 200);
        });
      });

      describe(`and session cookie exists`, () => {
        beforeEach(() => {
          requestOptions.headers = {
            ...requestOptions.headers || {},
            'cookie': [
              `${SESSION_KEY}=eyJjc3JmU2VjcmV0IjoiOXNwR1BOMmViVHB4b1UyTTU1T3luNWtGIn0=;`,
              `${SESSION_KEY}.sig=eihoA5XzTqSZ33EF-2d6lnbC8p8;`
            ].join('')
          };
        });

        describe(`and ${CSRF_TOKEN_KEY} header is not sent`, () => {
          it('sends 401 forbidden', async () => {
            const response = await fetch(
              requestOptions.uri,
              {
                method: requestOptions.method,
                headers: requestOptions.headers,
                body: JSON.stringify(requestOptions.body)
              }
            );

            expect.equal(response.status, 401);
          });

          describe(`and the request is sent with the ${PATH_GRAPHQL_PLAYGROUND} referer`, () => {
            beforeEach(() => {
              requestOptions.headers = {
                ...requestOptions.headers || {},
                referer: `http://127.0.0.1${PATH_GRAPHQL_PLAYGROUND}`
              };
            });

            it('allows the request', async () => {
              const response = await fetch(
                requestOptions.uri,
                {
                  method: 'POST',
                  headers: requestOptions.headers,
                  body: JSON.stringify(requestOptions.body)
                }
              );

              expect.equal(response.status, 200);
            });
          });
        });

        describe(`and ${CSRF_TOKEN_KEY} header is sent`, () => {
          describe(`and the token and secret match`, () => {
            beforeEach(() => {
              requestOptions.headers = {
                ...requestOptions.headers || {},
                [CSRF_TOKEN_KEY]: 'r7i0DbIU-THpMFy-zvQXHs1SLieOrmQE58Gk'
              };
            });

            it('allows the request', async () => {
              const response = await fetch(
                requestOptions.uri,
                {
                  method: 'POST',
                  headers: requestOptions.headers,
                  body: JSON.stringify(requestOptions.body)
                }
              );

              expect.equal(response.status, 200);
            });
          });

          describe(`and the token and secret does not match`, () => {
            beforeEach(() => {
              requestOptions.headers = {
                ...requestOptions.headers || {},
                [CSRF_TOKEN_KEY]: 'invalid'
              };
            });

            it('sends 401 forbidden', async () => {
              const response = await fetch(
                requestOptions.uri,
                {
                  method: 'POST',
                  headers: requestOptions.headers,
                  body: JSON.stringify(requestOptions.body)
                }
              );

              expect.equal(response.status, 401);
            });
          });
        });
      });
    });
  });
});
