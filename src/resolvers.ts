import { nowPlaying, movieById } from './resolver/movies';

const imageURLPrefix = 'https://image.tmdb.org/t/p/';

export const resolvers = {
  Query: {
    nowPlaying: nowPlaying,
    movie: movieById,
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