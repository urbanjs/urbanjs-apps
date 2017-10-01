import 'dotenv/config';
import * as expect from 'assert';
import { createContainer } from './container';
import { PATH_API_HEALTH } from '../../constants';
import { TYPE_HTTP_SERVICE, IHttpService } from '../../modules/http/types';
import { TYPE_HTTP_SERVER, IHttpServer } from '../../modules/http-server/types';

describe('server test', () => {
  let server: IHttpServer;
  let httpService: IHttpService;
  let serverOrigin: string;

  beforeEach(async () => {
    const container = createContainer();

    httpService = container.get<IHttpService>(TYPE_HTTP_SERVICE);
    server = container.get<IHttpServer>(TYPE_HTTP_SERVER);

    serverOrigin = (await server.start()).origin;
  });

  afterEach(async () => {
    await server.stop();
  });

  describe('api endpoints', () => {
    it('health endpoint returns {success: true}', async () => {
      const response = await httpService.request<{ success: boolean }>({
        uri: `${serverOrigin}${PATH_API_HEALTH}`,
        method: 'GET'
      });

      expect.equal(response.success, true);
    });
  });
});
