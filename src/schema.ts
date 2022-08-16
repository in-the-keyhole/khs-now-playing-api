import { gql } from 'apollo-server';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { featureFlags } from './feature-flags';

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

// #FF - ADD CREDITS TO SCHEMA IF FEATURE FLAG IS ON
const typesToMerge = featureFlags.credits.enabled
  ? [baseTypeDefs, creditTypeDefs]
  : [baseTypeDefs];

export const typeDefs = mergeTypeDefs(typesToMerge);
