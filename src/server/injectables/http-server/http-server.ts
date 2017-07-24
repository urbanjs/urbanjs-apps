import {injectable, inject, track} from '../../decorators';
import {
  IHttpServer,
  TYPE_DRIVER_EXPRESS_APPLICATION_FACTORY,
  ExpressApplicationFactory,
  ExpressApplication,
  TYPE_DRIVER_EXPRESS_ROUTER_FACTORY,
  ExpressRouterFactory,
  TYPE_CONFIG_HTTP,
  HttpServerConfig,
  TYPE_SERVICE_LOGGER,
  ILoggerService,
  TYPE_SERVICE_TRACE,
  ITraceService,
  TYPE_DRIVER_EXPRESS_STATIC_MIDDLEWARE_FACTORY,
  StaticExpressMiddlewareFactory,
  TYPE_DRIVER_EXPRESS_GRAPHQL_MIDDLEWARE_FACTORY,
  GraphqlExpressMiddlewareFactory,
  TYPE_DRIVER_EXPRESS_GRAPHIQL_MIDDLEWARE_FACTORY,
  GraphiqlExpressMiddlewareFactory
} from '../../types';
import {
  createAppRouter,
  createStaticRouter,
  createGraphQLRouter
} from './router';

@injectable()
export class HttpServer implements IHttpServer {
  private app: ExpressApplication;

  constructor(@inject(TYPE_DRIVER_EXPRESS_APPLICATION_FACTORY)
                createApplication: ExpressApplicationFactory,
              @inject(TYPE_DRIVER_EXPRESS_ROUTER_FACTORY)
                createRouter: ExpressRouterFactory,
              @inject(TYPE_DRIVER_EXPRESS_STATIC_MIDDLEWARE_FACTORY)
                createStaticMiddleware: StaticExpressMiddlewareFactory,
              @inject(TYPE_DRIVER_EXPRESS_GRAPHQL_MIDDLEWARE_FACTORY)
                createGraphqlMiddleware: GraphqlExpressMiddlewareFactory,
              @inject(TYPE_DRIVER_EXPRESS_GRAPHIQL_MIDDLEWARE_FACTORY)
                createGraphiqlMiddleware: GraphiqlExpressMiddlewareFactory,
              @inject(TYPE_SERVICE_TRACE)
                traceService: ITraceService,
              @inject(TYPE_CONFIG_HTTP)
              private config: HttpServerConfig,
              @inject(TYPE_SERVICE_LOGGER)
              private loggerService: ILoggerService) {
    traceService.track(this);

    this.app = createApplication();

    this.app.use(createGraphQLRouter({
      schema: config.graphQLSchema,
      enableGraphQLEditor: config.enableGraphQLEditor,
      routerFactory: createRouter,
      graphqlMiddlewareFactory: createGraphqlMiddleware,
      graphiqlMiddlewareFactory: createGraphiqlMiddleware
    }));

    this.app.use(createStaticRouter({
      relativeStaticPath: 'build',
      staticMiddlewareFactory: createStaticMiddleware
    }));

    this.app.use(createAppRouter({
      absoluteStaticPath: config.absolutePublicPath,
      routerFactory: createRouter
    }));
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

        this.loggerService.info(`Server is now running on http://localhost:${this.config.port}`);
      });
    });
  }
}
