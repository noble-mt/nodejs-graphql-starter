import { User } from "../repository/mongoDb/user";
import { v4 as uuid } from 'uuid';
import config from '../loadConfig.js';
import { Strategy } from "passport-microsoft";

const strategy = new Strategy({
    // Standard OAuth2 options
    clientID: config.auth.microsoft.clientID,
    clientSecret: config.auth.microsoft.clientSecret,
    callbackURL: config.auth.microsoft.callbackURL,
    scope: ['user.read'],

    // Microsoft specific options

    // [Optional] The tenant for the application. Defaults to 'common'. 
    // Used to construct the authorizationURL and tokenURL
    tenant: 'consumers',

    // [Optional] The authorization URL. Defaults to `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize`
    authorizationURL: 'https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize',

    // [Optional] The token URL. Defaults to `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`
    tokenURL: 'https://login.microsoftonline.com/consumers/oauth2/v2.0/token',
  },
  async function(accessToken, refreshToken, profile, done) {
    const user = await User.find({ userId: profile.id, provider: 'microsoft' }).findOne();
    if (user && user.id) {
        return done(null, user);
      } else {
        const newUser = new User({
          id: uuid(),
          name: profile.displayName,
          email: profile.emails?.[0]?.value,
          password: uuid(),
          provider: 'microsoft',
          providerId: profile.id
        });
        const user = await newUser.save();
        return done(null, user)
      }
  }
);

export default strategy;