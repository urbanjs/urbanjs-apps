import { CommanderStatic } from 'commander';

export const TYPE_CLI_PROGRAM = 'TYPE_CLI_PROGRAM';
export const TYPE_COMMANDER_PROGRAM_FACTORY = 'TYPE_COMMANDER_PROGRAM_FACTORY';

export type CliProgram = {
  main(args: string[]): Promise<void>;
};

export type CommanderProgramFactory = () => CommanderStatic;
