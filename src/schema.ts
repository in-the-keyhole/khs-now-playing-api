import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Movie {
    id: Int
    title: String
    overview: String
    posterPath: String
    posterPathW92: String
    posterPathW154: String
    posterPathW185: String
    posterPathW342: String
    posterPathW780: String
    backdropPathW300: String
    backdropPathW780: String
    backdropPathW1280: String
  }

  type Status {
    message: String
  }

  type Query {
    movie(id: ID!): Movie
    nowPlaying: [Movie]
  }
`;

export const creditTypeDefs = gql`
  type Movie {
    id: Int
    credits: Credits
  }

  type Credits {
    id: Int
    cast: [Cast]
    crew: [Crew]
  }

  type Cast {
    id: Int
    name: String
    character: String
  }

  type Crew {
    id: Int
    name: String
    job: String
  }
`;
