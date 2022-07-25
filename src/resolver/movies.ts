import { getMovies, getMovie, Movie, Credits, getCredits } from './rest-access';

export const nowPlaying = async (_: any) => {
  return await getMovies();
};

export const movieById = async (_: any, { id }: Movie) => {
  return await getMovie(id);
};

export const creditsById = async (_: any, { id }: Credits) => {
  return await getCredits(id);
};
