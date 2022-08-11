import { gql } from 'apollo-server';
import { mergeTypeDefs } from '@graphql-tools/merge';

export const baseTypeDefs = gql`
  type Movie {
    id: Int
    title: String
    overview: String
    posterPath: String
    backdropPath: String
  }

  type Query {
    movie(id: ID!): Movie
    nowPlaying: [Movie]
  }
`;

export const typeDefs = mergeTypeDefs([baseTypeDefs]);