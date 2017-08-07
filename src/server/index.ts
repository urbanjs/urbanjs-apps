import 'reflect-metadata';
import { IHttpServer, TYPE_HTTP_SERVER } from '../modules/http/types';
import { container } from './container';

container.get<IHttpServer>(TYPE_HTTP_SERVER).start();
