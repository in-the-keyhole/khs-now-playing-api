import { IResolvers } from '@graphql-tools/utils';
import { mergeResolvers } from '@graphql-tools/merge';
import { featureFlags } from './feature-flags';
import { Credits, Movie } from './resolver/movie-api';

const imageURLPrefix = 'https://image.tmdb.org/t/p/';

export const baseResolvers = {
  Query: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    nowPlaying: async (_: any, __: any, { dataSources }: any) => {
      return dataSources.movieAPI.nowPlaying();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    movie: async (_: any, { id }: { id: string }, { dataSources }: any) => {
      return dataSources.movieAPI.movieById(id);
    },
  },
  Movie: {
    posterPath: (parent: { poster_path: string }): string => {
      return `${imageURLPrefix}w500${parent.poster_path}`;
    },
    backdropPath: (parent: { backdrop_path: string }): string => {
      return `${imageURLPrefix}w1280${parent.backdrop_path}`;
    },
  },
};

export const creditResolvers: IResolvers = {
  Movie: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    credits: (parent: Movie, __: any, { dataSources }: any): Promise<Credits> => {
      return dataSources.movieAPI.credits(parent.id);
    },
  },
};

const resolversToMerge = featureFlags.credits.enabled
  ? [baseResolvers, creditResolvers]
  : [baseResolvers];

export const resolvers = mergeResolvers(resolversToMerge);