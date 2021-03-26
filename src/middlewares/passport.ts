import Local from 'passport-jwt'
import GoogleOauthTokenStrategy from 'passport-google-oauth-token'
import FacebookTokenStrategy from 'passport-facebook-token'
import config from '../config/config'
import User from '../models/user'

const callbackAuthSocialMedia = async (accessToken: any, refreshToken: any, profile: any, done: any) => {
  try {
    console.log(accessToken);
    console.log(profile);


    const userExists = await User.findOne({ providerId: profile.id });

    if (userExists) {
      return done(null, userExists);
    }

    const newUser = await User.create({
      provider: profile.provider,
      name: profile.displayName,
      email: profile.emails[0].value,
      providerId: profile.id,
      password: accessToken,
    });

    return done(null, newUser);
  } catch (error) {
    return done(error, null);
  }
};

export default {
  local: new Local.Strategy({
      jwtFromRequest: Local.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwtSecret
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload.id);

        if (!user) {
          return done(null, false, { message: 'User does not exist' });
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
  }),

  google: new GoogleOauthTokenStrategy(
    {
      clientID: config.googleAppId,
      clientSecret: config.googleAppSecret,
    },
    callbackAuthSocialMedia
  ),

  facebook: new FacebookTokenStrategy(
    {
      clientID: config.facebookAppId,
      clientSecret: config.facebookAppSecret,
    },
    callbackAuthSocialMedia
  ),
}
