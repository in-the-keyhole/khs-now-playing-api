import { getMovies, getMovie, Movie } from './rest-access';

export const nowPlaying = async (): Promise<Movie[]> => {
  return await getMovies();
};

export const movieById = async (_: unknown, { id }: Movie): Promise<Movie> => {
  return await getMovie(id);
};
