import { ContainerModule } from 'inversify';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { Router } from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import {
  TYPE_DRIVER_EXPRESS_APPLICATION_FACTORY,
  ExpressApplicationFactory,
  TYPE_DRIVER_EXPRESS_ROUTER_FACTORY,
  ExpressRouterFactory,
  StaticExpressMiddlewareFactory,
  TYPE_DRIVER_EXPRESS_STATIC_MIDDLEWARE_FACTORY,
  GraphqlExpressMiddlewareFactory,
  TYPE_DRIVER_EXPRESS_GRAPHQL_MIDDLEWARE_FACTORY,
  GraphiqlExpressMiddlewareFactory,
  TYPE_DRIVER_EXPRESS_GRAPHIQL_MIDDLEWARE_FACTORY
} from '../types';

export const driverModule = new ContainerModule((bind) => {
  bind<ExpressApplicationFactory>(TYPE_DRIVER_EXPRESS_APPLICATION_FACTORY)
    .toFunction(() => {
      const app = express();

      app.use(cors());
      app.use(bodyParser.urlencoded({extended: false}));
      app.use(bodyParser.json());

      return app;
    });

  bind<ExpressRouterFactory>(TYPE_DRIVER_EXPRESS_ROUTER_FACTORY)
    .toFunction(() => Router());

  bind<StaticExpressMiddlewareFactory>(TYPE_DRIVER_EXPRESS_STATIC_MIDDLEWARE_FACTORY)
    .toFunction((options) => express.static(options.relativeStaticPath));

  bind<GraphqlExpressMiddlewareFactory>(TYPE_DRIVER_EXPRESS_GRAPHQL_MIDDLEWARE_FACTORY)
    .toFunction((options) => graphqlExpress({schema: options.schema}));

  bind<GraphiqlExpressMiddlewareFactory>(TYPE_DRIVER_EXPRESS_GRAPHIQL_MIDDLEWARE_FACTORY)
    .toFunction(options => graphiqlExpress({endpointURL: options.endpointURL}));
});
