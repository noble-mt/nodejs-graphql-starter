import { User } from "../../repository/mongoDb/user.js";
import { Resolvers } from "../modals/generated/user.js";
import { v4 as uuid } from 'uuid';

export const resolvers: Resolvers = {
  Query: {
    currentUser: (parent, args, context) => {
      return context.user;
    },
    users: async (parent, args, context) => {
      return await User.find({});
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
        console.log(args);
      const newUser = new User({
        id: uuid(),
        name: args.input.name,
        email: args.input.email,
        password: args.input.password,
        provider: 'local',
        providerId: 'local'
      });
      await newUser.save();
      return newUser;
    },
  },
}