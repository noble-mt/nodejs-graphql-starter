import { Bus } from "../../repository/mongoDb/bus.js";
import {  Resolvers } from '../modals/generated/bus';

export const resolvers: Resolvers = {
  Query: {
    buses: async () => {
      console.log('HERE2')
      return await Bus.find({});
    },
  },
  Mutation: {
    createBus: async (parent, args, context) => {
      const newBus = new Bus({
        busId: args.input.busId,
        busName: args.input.busName,
        busNumber: args.input.busNumber
      });
      await newBus.save();
      return newBus;
    },
  },
};
