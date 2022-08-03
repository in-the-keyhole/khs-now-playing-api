import { IResolvers } from '@graphql-tools/utils';
import { nowPlaying, movieById } from './resolver/movies';
import { Credits, getCredits, Movie } from './resolver/rest-access';

const imageURLPrefix = 'https://image.tmdb.org/t/p/';

export const resolvers = {
  Query: {
    nowPlaying: nowPlaying,
    movie: movieById,
  },
  Movie: {
    posterPath: (parent: { poster_path: string; }): string => {
      return `${imageURLPrefix}w500${parent.poster_path}`;
    },
    posterPathW92: (parent: { poster_path: string; }): string => {
      return `${imageURLPrefix}w92${parent.poster_path}`;
    },
    posterPathW154: (parent: { poster_path: string; }): string => {
      return `${imageURLPrefix}w154${parent.poster_path}`;
    },
    posterPathW185: (parent: { poster_path: string; }): string => {
      return `${imageURLPrefix}w185${parent.poster_path}`;
    },
    posterPathW342: (parent: { poster_path: string; }): string => {
      return `${imageURLPrefix}w342${parent.poster_path}`;
    },
    posterPathW780: (parent: { poster_path: string; }): string => {
      return `${imageURLPrefix}w780${parent.poster_path}`;
    },
    backdropPathW300: (parent: { backdrop_path: string; }): string => {
      return `${imageURLPrefix}w300${parent.backdrop_path}`;
    },
    backdropPathW780: (parent: { backdrop_path: string; }): string => {
      return `${imageURLPrefix}w780${parent.backdrop_path}`;
    },
    backdropPathW1280: (parent: { backdrop_path: string; }): string => {
      return `${imageURLPrefix}w1280${parent.backdrop_path}`;
    },
  },
};

export const creditResolvers: IResolvers = {
  Movie: {
    credits: (parent: Movie): Promise<Credits> => {
      return getCredits(parent.id);
    }
  },
};