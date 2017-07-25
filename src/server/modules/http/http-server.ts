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
  ILoggerService,
  TYPE_SERVICE_TRACE,
  ITraceService,
} from '../log/types';

@injectable()
export class HttpServer implements IHttpServer {
  private app: IHttpApplication;

  constructor(@inject(TYPE_HTTP_APPLICATION_FACTORY)
                createApplication: HttpApplicationFactory,
              @inject(TYPE_SERVICE_TRACE)
                traceService: ITraceService,
              @inject(TYPE_HTTP_CONFIG)
              private config: HttpServerConfig,
              @inject(TYPE_SERVICE_LOGGER)
              private loggerService: ILoggerService) {
    traceService.track(this);

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

        this.loggerService.info(`Server is now running on http://${this.config.host}:${this.config.port}`);
      });
    });
  }
}
