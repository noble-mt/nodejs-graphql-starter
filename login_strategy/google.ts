import { Strategy } from "passport-google-oauth20";
import { v4 as uuid } from 'uuid';
import { User } from "../repository/mongoDb/user";
import config from '../loadConfig.js';

const strategy = new Strategy({
    clientID: config.auth.google.GOOGLE_CLIENT_ID,
    clientSecret: config.auth.google.GOOGLE_CLIENT_SECRET,
    callbackURL: config.auth.google.callbackURL,
  },
  async function verify(accessToken, refreshToken, profile, cb) {
    console.log('inside stragey', accessToken, refreshToken, profile)
    const user = await User.find({ providerId: profile.id}).findOne();
    if (user && user.id) {
      return cb(null, user);
    } else {
      const newUser = new User({
        id: uuid(),
        name: profile.displayName,
        email: profile.emails?.[0]?.value,
        password: uuid(),
        provider: 'google',
        providerId: profile.id
      });
      const user = await newUser.save();
      return cb(null, user)
    }
  }
);

export default strategy;