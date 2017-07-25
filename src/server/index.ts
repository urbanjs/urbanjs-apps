import 'reflect-metadata';
import { container } from './container';
import { IHttpServer, TYPE_HTTP_SERVER } from './modules/http/types';

container.get<IHttpServer>(TYPE_HTTP_SERVER).start();
