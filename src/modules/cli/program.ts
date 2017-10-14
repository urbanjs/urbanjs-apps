import 'reflect-metadata';
import { CommanderStatic } from 'commander';
import {
  track,
  inject,
  injectable,
  command,
  METADATA_KEY_COMMAND,
  CommandOptions
} from '../../decorators';
import { TYPE_SERVICE_LOGGER, ILoggerService } from '../log/types';
import { TYPE_JSON_SERVICE, IJSONService } from '../json/types';
import {
  CliProgram, CommanderProgramFactory,
  TYPE_COMMANDER_PROGRAM_FACTORY
} from './types';
import { CLI_VERSION } from '../../constants';
import { ValidationError } from '../error/errors';

export const EVENT_CLOSE = 'cli:close';
export const EVENT_ERROR = 'cli:error';

@injectable()
export class Program implements CliProgram {
  private program: CommanderStatic;

  constructor(@inject(TYPE_SERVICE_LOGGER) private loggerService: ILoggerService,
              @inject(TYPE_JSON_SERVICE) private jsonService: IJSONService,
              @inject(TYPE_COMMANDER_PROGRAM_FACTORY) commanderProgramFactory: CommanderProgramFactory) {
    this.program = commanderProgramFactory();
    this.program.version(CLI_VERSION);

    Object.keys(this.constructor.prototype).forEach((methodName) => {
      const commandOptions: CommandOptions = Reflect.getMetadata(
        METADATA_KEY_COMMAND,
        this,
        methodName
      );

      if (commandOptions) {
        const currentCommand = this.program
          .command(commandOptions.name)
          .description(commandOptions.description)
          .usage(commandOptions.usage);

        commandOptions.options.forEach((option) => {
          currentCommand.option(option.flags, option.description);
        });

        currentCommand.action(async (cmd: CommanderStatic) => {
          try {
            await this[methodName](cmd.opts());
            this.program.emit(EVENT_CLOSE);
          } catch (e) {
            this.program.emit(EVENT_ERROR, e);
          }
        });
      }
    });
  }

  @track()
  public async main(args: string[]) {
    await new Promise((resolve, reject) => {
      this.program.once(EVENT_CLOSE, () => resolve());
      this.program.once(EVENT_ERROR, (e) => reject(e));

      if (!this.program.parse(args).args.length) {
        this.program.help();
      }
    });
  }

  @track()
  @command({
    name: 'echo',
    description: 'Echos the given value',
    usage: '-v "hello world"',
    options: [{
      flags: '-v, --value <value>',
      description: 'Value to be echoed'
    }]
  })
  public async echo(options: { value: string }) {
    const validationResult = this.jsonService.validate(options, {
      type: 'object',
      properties: {
        value: {type: 'string'}
      },
      required: ['value']
    });

    if (!validationResult.isValid) {
      throw new ValidationError(validationResult.errors[0].message);
    }

    this.loggerService.info(options.value);
  }
}
