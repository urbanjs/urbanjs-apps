import { injectable } from '../../decorators';
import { ILoggerService } from './types';

@injectable()
export class DumbLoggerService implements ILoggerService {
  debug() {
    // ignore
  }

  info() {
    // ignore
  }

  warn() {
    // ignore
  }

  error() {
    // ignore
  }
}
