import { makeExecutableSchema } from '@graphql-tools/schema';
import lodash from 'lodash';
import { resolvers as RouteResolvers } from './resolvers/routes.js';
import { resolvers as BusResolvers } from './resolvers/bus.js';
import { resolvers as UserResolvers } from './resolvers/user.js';
import { readFileSync } from 'fs';
const Bus = readFileSync('graphql/typeDefs/bus.graphql', { encoding: 'utf-8' });
const Route = readFileSync('graphql/typeDefs/routes.graphql', { encoding: 'utf-8' });
const User = readFileSync('graphql/typeDefs/user.graphql', { encoding: 'utf-8' });

// If you had Query fields not associated with a
// specific type you could put them here
const Query = `
  type Query {
  }
`;

const resolvers = {};

const schema = makeExecutableSchema({
  typeDefs: [ Route, Bus, User],
  resolvers: [resolvers, RouteResolvers, BusResolvers, UserResolvers],
});

export default schema; 