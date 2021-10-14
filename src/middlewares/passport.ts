import Local from 'passport-jwt'
import config from '../config/config'
import User from '../models/user'

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
}
