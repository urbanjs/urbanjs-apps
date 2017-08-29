import { ContainerModule } from 'inversify';
import { verify, sign, TokenExpiredError } from 'jsonwebtoken';
import { JWTService } from './jwt-service';
import {
  TYPE_JWT_DRIVER,
  JWTDriver,
  TYPE_JWT_SERVICE,
  IJWTService
} from './types';

export const jwtModule = new ContainerModule((bind) => {
  bind<IJWTService>(TYPE_JWT_SERVICE).to(JWTService);

  bind<JWTDriver>(TYPE_JWT_DRIVER).toConstantValue({
    sign,
    verify,
    isTokenExpiredError: e => e instanceof TokenExpiredError
  });
});
