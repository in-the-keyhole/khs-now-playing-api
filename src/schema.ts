import { gql } from 'apollo-server';

export const typeDefs = gql`
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