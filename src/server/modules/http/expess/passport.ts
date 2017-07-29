import { Strategy as FacebookStrategy } from 'passport-facebook';
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

  passport.use(STRATEGY_FACEBOOK, new FacebookStrategy(
    {
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
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        loggerService.debug('passport verification...');
        const user = await userService.createUser(profile);
        cb(null, user);
        loggerService.debug('passport verification succeeded');
      } catch (e) {
        loggerService.debug('passport verification failed with', e);
        cb(e);
      }
    }
  ));

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
