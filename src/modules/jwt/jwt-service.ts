import { injectable, track, inject } from '../../decorators';
import { ValidationError, ForbiddenError } from '../error/errors';
import { ILoggerService, TYPE_SERVICE_LOGGER } from '../log/types';
import {
  JWTPayload,
  JWTDriver,
  TYPE_JWT_DRIVER,
  IJWTService,
  JWTServiceConfig,
  TYPE_JWT_SERVICE_CONFIG
} from './types';

@injectable()
export class JWTService implements IJWTService {
  constructor(@inject(TYPE_JWT_DRIVER) private driver: JWTDriver,
              @inject(TYPE_SERVICE_LOGGER) private loggerService: ILoggerService,
              @inject(TYPE_JWT_SERVICE_CONFIG) private config: JWTServiceConfig) {
  }

  @track()
  sign(payload: JWTPayload) {
    return this.driver.sign(payload, this.config.jwtSignatureSecret);
  }

  @track()
  verify<T extends JWTPayload>(token: string) {
    try {
      return this.driver.verify<T>(token, this.config.jwtSignatureSecret);
    } catch (e) {
      this.loggerService.error('token verification failed', e);

      throw this.driver.isTokenExpiredError(e)
        ? new ForbiddenError()
        : new ValidationError('Invalid token');
    }
  }
}
