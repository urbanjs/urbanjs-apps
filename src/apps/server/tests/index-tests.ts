import 'dotenv/config';
import * as expect from 'assert';
import fetch from 'node-fetch';
import { createContainer } from '../container';
import { PATH_API_HEALTH } from '../../../constants';
import { TYPE_HTTP_SERVER, IHttpServer } from '../../../modules/http-server/types';
import { TYPE_SERVICE_LOGGER, ILoggerService } from '../../../modules/log/types';

describe('server test', () => {
  let server: IHttpServer;
  let serverOrigin: string;

  beforeEach(async () => {
    const container = createContainer();

    container.rebind<ILoggerService>(TYPE_SERVICE_LOGGER).toConstantValue({
      debug: () => null,
      info: () => null,
      warn: () => null,
      error: () => null
    });

    server = container.get<IHttpServer>(TYPE_HTTP_SERVER);

    serverOrigin = (await server.start()).origin;
  });

  afterEach(async () => {
    await server.stop();
  });

  describe('api endpoints', () => {
    it('health endpoint returns {success: true}', async () => {
      const response = await fetch(
        `${serverOrigin}${PATH_API_HEALTH}`,
        {
          method: 'GET'
        }
      );

      expect.equal(response.status, 200);
      expect.equal((await response.json()).success, true);
    });
  });
});
