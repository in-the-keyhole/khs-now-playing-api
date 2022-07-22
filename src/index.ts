
import { ApolloServer } from 'apollo-server';
import { environment } from './environment';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import { typeDefs } from './schema';
import resolvers from './resolvers';

const server = new ApolloServer({
  resolvers,
  typeDefs,
  introspection: environment.apollo.introspection,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
});


// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
