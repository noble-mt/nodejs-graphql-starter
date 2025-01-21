import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import mongoose from 'mongoose';
import schema from './graphql/schema.js';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import { IUser } from './graphql/modals/i-user.js';
import localStrategy, { createNewUser } from './login_strategy/local.js';
import googleStrategy from './login_strategy/google.js';
import microsoftStrategy from './login_strategy/microsoft.js';
import http from 'http';
import bodyParser from 'body-parser';
import { GraphQLError } from 'graphql';
import config from './loadConfig.js';
import { passportSerializer, passportDeserializer, sessionConfig } from './login_strategy/helpers.js';
import { GraphqlContext } from './graphql/modals/graphql_context.js';

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}

mongoose
    .connect(config.db.mongo.url, {})
    .then(() => {
        console.log(`Db Connected`);
    })
    .catch(err => {
        console.log(err.message);
    });

// Required logic for integrating with Express
// configure session and related params
const app = express();
const httpServer = http.createServer(app);
app.use(express.urlencoded({ extended: false }));
app.use(session(sessionConfig));
passport.serializeUser(passportSerializer);
passport.deserializeUser(passportDeserializer);


//Define login strategies
passport.use(localStrategy);
passport.use(googleStrategy);
passport.use(microsoftStrategy);


app.use(passport.initialize());
app.use(passport.session());

// // Same ApolloServer initialization as before, plus the drain plugin
// // for our httpServer.
const server = new ApolloServer<GraphqlContext>({
    schema,
});

await server.start();

// Routes for each login scenarios
// local auth
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/loginFailure' }),
  function(req, res) {
    res.json({message:"Success", user: req.user });
  }
);


app.post('/signup', createNewUser);

// google Auth
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/loginFailure' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(req.session, req.user)
    res.redirect('/');
  }
);


app.get('/auth/microsoft',
passport.authenticate('microsoft', {
  // Optionally define any authentication parameters here
  // For example, the ones in https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow
  prompt: 'select_account',
}));

app.get('/auth/microsoft/callback', 
  passport.authenticate('microsoft', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
  '/',
  cors(),
  bodyParser.json({}),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      // we could also check user roles/permissions here
      const user = req.user;


      // Allowing Introspection Query=
      if (!user || !user.id) {
        // throwing a `GraphQLError` here allows us to specify an HTTP status code,
        // standard `Error`s will have a 500 status code by default
        throw new GraphQLError('User is not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        });
      }
      return { user }
    },
  }),
);

const PORT = config.port || 4000;
await new Promise((resolve) => httpServer.listen({ port: PORT }));
