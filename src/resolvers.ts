import { nowPlaying, movieById } from './resolver/movies';
import { getCredits } from './resolver/rest-access';
import { getCast } from './resolver/rest-access';
import { getCrew } from './resolver/rest-access';

const imageURLPrefix = 'https://image.tmdb.org/t/p/';

export default {
  Query: {
    nowPlaying: nowPlaying,
    movie: movieById,
  },
  Movie: {
    posterPath: (parent: any, args: any, context: any): String => {
      return `${imageURLPrefix}w500${parent.poster_path}`;
    },
    posterPathW92: (parent: any, args: any, context: any): String => {
      return `${imageURLPrefix}w92${parent.poster_path}`;
    },
    posterPathW154: (parent: any, args: any, context: any): String => {
      return `${imageURLPrefix}w154${parent.poster_path}`;
    },
    posterPathW185: (parent: any, args: any, context: any): String => {
      return `${imageURLPrefix}w185${parent.poster_path}`;
    },
    posterPathW342: (parent: any, args: any, context: any): String => {
      return `${imageURLPrefix}w342${parent.poster_path}`;
    },
    posterPathW780: (parent: any, args: any, context: any): String => {
      return `${imageURLPrefix}w780${parent.poster_path}`;
    },
    backdropPathW300: (parent: any, args: any, context: any): String => {
      return `${imageURLPrefix}w300${parent.backdrop_path}`;
    },
    backdropPathW780: (parent: any, args: any, context: any): String => {
      return `${imageURLPrefix}w780${parent.backdrop_path}`;
    },
    backdropPathW1280: (parent: any, args: any, context: any): String => {
      return `${imageURLPrefix}w1280${parent.backdrop_path}`;
    },
    credits: (parent: any, args: any, context: any): String => {
      return getCredits(parent.id);
    },
    cast: (parent: any, args: any, context: any): String => {
      return getCast(parent.id);
    },
    crew: (parent: any, args: any, context: any): String => {
      return getCrew(parent.id);
    },
  },
};
