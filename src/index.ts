import { ApolloServer } from 'apollo-server';
import { environment } from './environment';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import { typeDefs } from './schema';
import { resolvers } from './resolvers';
// import { makeExecutableSchema } from '@graphql-tools/schema';
import { MovieAPI } from './resolver/movie-api';

// const schema = makeExecutableSchema({
//   typeDefs: typeDefs,
//   resolvers: resolvers,
// });

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  dataSources: () => {
    return {
      movieAPI: new MovieAPI(),
    };
  },
  introspection: environment.apollo.introspection,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});