import { Route } from "../../repository/mongoDb/routes.js";
import { Resolvers } from "../modals/generated/routes.js";

export const resolvers: Resolvers = {
  Query: {
    routes: async () => {
      console.log('routes')
      return await Route.find({$and: [
                {routes: {$elemMatch: {"locationId":{$in: [1,2,3]}, "time": { $gte: 480} }}},
                {routes: {$elemMatch: { "locationId": 4, "time": {$gt: 480}}}}
            ]
        });
    },
  },
  Mutation: {
    createRoute: async (parent, args) => {
        console.log(args);
      const newRoute = new Route({
        busId: args.input.busId,
        status: true,
        route: args.input.routes
      });
      await newRoute.save();
      return newRoute;
    },
  },
};
