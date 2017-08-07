import { Strategy as FacebookStrategy, VerifyFunction } from 'passport-facebook';
import { Passport } from 'passport';
import { IUserService, User } from '../../user/types';
import { ILoggerService } from '../../log/types';

export { Passport } from 'passport';

export type PassportConfig = {
  facebookAppId: string;
  facebookAppSecret: string;
  facebookCallbackURL: string;
  userService: IUserService;
  loggerService: ILoggerService;
};

export const STRATEGY_FACEBOOK = 'facebook';

export function createPassport({
                                 facebookAppId,
                                 facebookAppSecret,
                                 facebookCallbackURL,
                                 userService,
                                 loggerService
                               }: PassportConfig) {
  const passport = new Passport();
  const strategyOptions = {
    clientID: facebookAppId,
    clientSecret: facebookAppSecret,
    callbackURL: facebookCallbackURL,
    enableProof: true,
    profileFields: [
      'id',
      'displayName',
      'photos',
      'email'
    ]
  };

  const verifyFunction: VerifyFunction = async (accessToken, refreshToken, profile, cb) => {
    try {
      loggerService.debug('passport verification...', profile);
      const user = await userService.createUser({
        facebookId: profile.id,
        displayName: profile.displayName
      });

      cb(null, user);
      loggerService.debug('passport verification succeeded');
    } catch (e) {
      loggerService.debug('passport verification failed with', e);
      cb(e);
    }
  };

  passport.use(STRATEGY_FACEBOOK, new FacebookStrategy(strategyOptions, verifyFunction));

  passport.serializeUser((user: User, cb) => {
    loggerService.debug('passport serialization...', user);
    cb(null, user.id);
  });

  passport.deserializeUser(async (userId: string, cb) => {
    loggerService.debug('passport deserialization...', userId);

    try {
      const user = await userService.getUser(userId);
      cb(null, user);
      loggerService.debug('passport deserialization succeeded', user);
    } catch (e) {
      loggerService.debug('passport deserialization failed with', e);
      cb(e);
    }
  });

  return passport;
}
