import MongoStore from "connect-mongo";
import { IUser } from "../graphql/modals/i-user";
import config from './../loadConfig.js';

export const passportSerializer = (user: IUser, cb) => {
    process.nextTick(function() {
      return cb(null, {
        id: user.id,
        name: user.name,
        email: user.email
      });
    });
  }


  export const passportDeserializer = (user: IUser, cb) => {
    process.nextTick(function() {
      return cb(null, user);
    });
  }

  export const sessionConfig = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
    store: MongoStore.create({
      mongoUrl: config.db.mongo.url,
      collectionName: "sessions",
      stringify: false,
      autoRemove: "interval",
      autoRemoveInterval: 1
    }) 
}