
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  generates: {
    "graphql/modals/generated/bus.ts": {
      schema: 'graphql/typeDefs/bus.graphql',
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        useIndexSignature: true,
        contextType: '../index.js#SharedContext'
      }
    },
    "graphql/modals/generated/routes.ts": {
      schema: 'graphql/typeDefs/routes.graphql',
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        useIndexSignature: true,
        contextType: '../index.js#SharedContext'
      }
    },
    "graphql/modals/generated/user.ts": {
      schema: 'graphql/typeDefs/user.graphql',
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        useIndexSignature: true,
        contextType: '../index.js#SharedContext'
      }
    },
  }
};

export default config;
