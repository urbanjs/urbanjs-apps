import { injectable, inject, track } from '../../decorators';
import { ILogService, Log, ILoggerService, TYPE_SERVICE_LOGGER } from './types';

@injectable()
export class LogService implements ILogService {
  private logs: Log[] = [];

  constructor(@inject(TYPE_SERVICE_LOGGER) private loggerService: ILoggerService) {
  }

  @track()
  async createLog(log: Log) {
    this.logs.push(log);
    this.loggerService.debug('new log added:', log);
  }
}
