import { Strategy as FacebookStrategy, VerifyFunction } from 'passport-facebook';
import { Passport } from 'passport';
import { ValidationError } from '../../error/errors';
import { IUserService, User } from '../../user/types';
import { ILoggerService } from '../../log/types';
import { IFacebookApiService } from '../../facebook/types';

export { Passport } from 'passport';

export type PassportConfig = {
  facebookAppId: string;
  facebookAppSecret: string;
  facebookCallbackURL: string;
  userService: IUserService;
  loggerService: ILoggerService;
  facebookApiService: IFacebookApiService;
};

export const STRATEGY_FACEBOOK = 'facebook';

export function createPassport({
                                 facebookAppId,
                                 facebookAppSecret,
                                 facebookCallbackURL,
                                 userService,
                                 loggerService,
                                 facebookApiService
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

      if (!profile.emails || !profile.emails.length) {
        throw new ValidationError('missing email from facebook');
      } else if (!profile.photos || !profile.photos.length) {
        throw new ValidationError('missing avatar from facebook');
      }

      const facebookToken = await facebookApiService.getLongLivedToken(accessToken);

      const user = await userService.createUser({
        facebookId: profile.id,
        facebookToken: facebookToken,
        email: profile.emails[0].value,
        displayName: profile.displayName,
        avatar: profile.photos[0].value
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
      // TODO: validate userId based on the session storage
      //       instead of querying from the database
      //       for performance reasons
      await userService.getUser(userId);

      cb(null, {id: userId});
      loggerService.debug('passport deserialization succeeded', userId);
    } catch (e) {
      loggerService.debug('passport deserialization failed with', e);
      cb(e);
    }
  });

  return passport;
}
