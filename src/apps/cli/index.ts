import 'reflect-metadata';
import 'dotenv/config';

import { container } from './container';
import { TYPE_CLI_PROGRAM, CliProgram } from '../../modules/cli/types';

export const program = container.get<CliProgram>(TYPE_CLI_PROGRAM);
