import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Passport } from 'passport';

export { Passport } from 'passport';

export type PassportConfig = {
  facebookAppId: string;
  facebookAppSecret: string;
  facebookCallbackURL: string;
};

export const STRATEGY_FACEBOOK = 'facebook';

export function createPassport(config: PassportConfig) {
  const users: { [key: string]: object } = {};
  const passport = new Passport();

  passport.use(STRATEGY_FACEBOOK, new FacebookStrategy(
    {
      clientID: config.facebookAppId,
      clientSecret: config.facebookAppSecret,
      callbackURL: config.facebookCallbackURL,
      enableProof: true,
      profileFields: [
        'id',
        'displayName',
        'photos',
        'email'
      ]
    },
    (accessToken, refreshToken, profile, cb) => {
      users[profile.id] = profile;
      cb(null, profile);
    }
  ));

  passport.serializeUser((user: { id: string }, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: string, done) => {
    done(null, users[id]);
  });

  return passport;
}
