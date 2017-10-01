import { injectable, inject, track } from '../../decorators';
import {
  IHttpServer,
  TYPE_HTTP_APPLICATION_FACTORY,
  HttpApplicationFactory,
  IHttpApplication,
  TYPE_HTTP_CONFIG,
  HttpServerConfig
} from './types';
import {
  TYPE_SERVICE_LOGGER,
  ILoggerService
} from '../log/types';

@injectable()
export class HttpServer implements IHttpServer {
  private app: IHttpApplication;

  constructor(@inject(TYPE_HTTP_APPLICATION_FACTORY)
                createApplication: HttpApplicationFactory,
              @inject(TYPE_HTTP_CONFIG)
              private config: HttpServerConfig,
              @inject(TYPE_SERVICE_LOGGER)
              private loggerService: ILoggerService) {
    this.app = createApplication(config);
  }

  @track()
  async start() {
    await new Promise((resolve, reject) => {
      this.app.listen(this.config.port, (err: Error) => {
        if (err) {
          this.loggerService.error('Cannot start the server', err);
          reject(err);
          return;
        }

        resolve();
      });
    });

    const origin = `http://127.0.0.1:${this.app.address().port}`;
    this.loggerService.info(`Server is now running on ${origin}`);

    return {origin};
  }

  @track()
  async stop() {
    await new Promise(resolve => {
      this.app.close(resolve);
    });
  }
}
