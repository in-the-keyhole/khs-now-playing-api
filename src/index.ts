import { ApolloServer } from 'apollo-server';
import { environment } from './environment';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { makeExecutableSchema } from '@graphql-tools/schema';

const mergedTypeDefs = mergeTypeDefs([typeDefs]);

const mergedResolvers = mergeResolvers([resolvers]);

const schema = makeExecutableSchema({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
});

const server = new ApolloServer({
  schema,
  introspection: environment.apollo.introspection,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});