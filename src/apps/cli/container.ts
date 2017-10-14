import { Container } from 'inversify';
import { createContainer } from '../utils/container';
import { config } from './config';
import { cliModule } from '../../modules/cli';
import { jsonModule } from '../../modules/json';
import { uuidModule } from '../../modules/uuid';

export const container: Container = createContainer({devMode: config.devMode});

container.load(cliModule);
container.load(jsonModule);
container.load(uuidModule);
