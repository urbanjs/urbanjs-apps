import { ContainerModule } from 'inversify';
import { Command, CommanderStatic } from 'commander';
import {
  CliProgram,
  CommanderProgramFactory,
  TYPE_CLI_PROGRAM,
  TYPE_COMMANDER_PROGRAM_FACTORY
} from './types';
import { Program } from './program';

export const cliModule = new ContainerModule((bind) => {
  bind<CliProgram>(TYPE_CLI_PROGRAM).to(Program);

  bind<CommanderProgramFactory>(TYPE_COMMANDER_PROGRAM_FACTORY)
    .toFunction(() => new Command() as CommanderStatic);
});
