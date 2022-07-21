
import { ApolloServer } from 'apollo-server';
import { environment } from './environment';

import { typeDefs } from './schema';
import resolvers from './resolvers';

const server = new ApolloServer({
  resolvers,
  typeDefs,
  introspection: environment.apollo.introspection,
  playground: environment.apollo.playground,
});

export const graphqlHandler = server.createHandler();
