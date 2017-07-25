import { Express, Router, Response, Request, RequestHandler } from 'express';
import { GraphQLSchema } from 'graphql';

export const TYPE_DRIVER_EXPRESS_APPLICATION_FACTORY = 'TYPE_DRIVER_EXPRESS_APPLICATION_FACTORY';
export const TYPE_DRIVER_EXPRESS_ROUTER_FACTORY = 'TYPE_DRIVER_EXPRESS_ROUTER_FACTORY';
export const TYPE_DRIVER_EXPRESS_STATIC_MIDDLEWARE_FACTORY = 'TYPE_DRIVER_EXPRESS_STATIC_MIDDLEWARE_FACTORY';
export const TYPE_DRIVER_EXPRESS_GRAPHQL_MIDDLEWARE_FACTORY = 'TYPE_DRIVER_EXPRESS_GRAPHQL_MIDDLEWARE_FACTORY';
export const TYPE_DRIVER_EXPRESS_GRAPHIQL_MIDDLEWARE_FACTORY = 'TYPE_DRIVER_EXPRESS_GRAPHIQL_MIDDLEWARE_FACTORY';
export const TYPE_HTTP_SERVER = 'TYPE_HTTP_SERVER';
export const TYPE_CONFIG_HTTP = 'TYPE_CONFIG_HTTP';

export type ExpressApplication = Express;
export type ExpressApplicationFactory = () => ExpressApplication;
export type ExpressRouter = Router;
export type ExpressRouterFactory = () => ExpressRouter;
export type StaticExpressMiddlewareFactory = (options: { relativeStaticPath: string }) => RequestHandler;
export type GraphqlExpressMiddlewareFactory = (options: { schema: GraphQLSchema }) => RequestHandler;
export type GraphiqlExpressMiddlewareFactory = (options: { endpointURL: string }) => RequestHandler;
export type ExpressResponse = Response;
export type ExpressRequest = Request;

export { GraphQLSchema } from 'graphql';

export type HttpServerConfig = {
  port: number;
  enableGraphQLEditor: boolean;
  absolutePublicPath: string;
  relativePublicPath: string;
  graphQLSchema: GraphQLSchema;
};

export interface IHttpServer {
  start(): Promise<void>;
}
