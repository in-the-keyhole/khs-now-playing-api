import { Http } from './http';
import { environment } from '../environment';

const http = new Http(environment.tmdb.url);

export const getMovies = async (): Promise<Movie[]> => {
  const url_string = '/movie/now_playing';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await http.get<any>(url_string);
  return data.results;
};

export const getMovie = async (id: string): Promise<Movie> => {
  const url_string = `/movie/${id}`;
  const { data } = await http.get<Movie>(url_string);
  return data;
};

export const getCredits = async (id: string): Promise<Credits> => {
  const url_string = `/movie/${id}/credits`;
  const { data } = await http.get<Credits>(url_string);
  return data;
};

export const getCast = async (id: string): Promise<[]> => {
  return (await getCredits(id)).cast;
};

export const getCrew = async (id: string): Promise<[]> => {
  return (await getCredits(id)).crew;
};

export interface Movie {
  id: string;
  title: string;
  overview: string;
  posterPath: string;
  posterPathW92: string;
  posterPathW154: string;
  posterPathW185: string;
  posterPathW342: string;
  posterPathW780: string;
  backdropPathW300: string;
  backdropPathW780: string;
  backdropPathW1280: string;
  credits: Credits;
  cast: [Cast];
  crew: [Crew];
}

export interface Credits {
  id: string;
  cast: [];
  crew: [];
}

export interface Cast {
  id: string;
  name: string;
  character: string;
}

export interface Crew {
  id: string;
  name: string;
  job: string;
}
