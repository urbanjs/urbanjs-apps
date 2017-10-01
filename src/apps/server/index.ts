import 'reflect-metadata';
import 'dotenv/config';
import { IHttpServer, TYPE_HTTP_SERVER } from '../../modules/http-server/types';
import { createContainer } from './container';

createContainer().get<IHttpServer>(TYPE_HTTP_SERVER).start();
