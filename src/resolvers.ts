const imageURLPrefix = 'https://image.tmdb.org/t/p/';
import { mergeResolvers } from '@graphql-tools/merge';

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

export const resolvers = mergeResolvers([baseResolvers]);