import { ApolloServer } from 'apollo-server';
import { environment } from './environment';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import { featureFlags } from './feature-flags';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { typeDefs, creditTypeDefs } from './schema';
import { resolvers, creditResolvers } from './resolvers';
import { makeExecutableSchema } from '@graphql-tools/schema';

const typesToMerge = featureFlags.credits.enabled
  ? [typeDefs, creditTypeDefs]
  : [typeDefs];
const mergedTypeDefs = mergeTypeDefs(typesToMerge);

const resolversToMerge = featureFlags.credits.enabled
  ? [resolvers, creditResolvers]
  : [resolvers];
const mergedResolvers = mergeResolvers(resolversToMerge);

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