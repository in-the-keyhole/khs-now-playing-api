import { Http } from './http';
import { environment } from '../environment';
import { logger } from '../logger';

const tmdbApiLogger = logger.child({ api: 'tmdb' });

const http = new Http(environment.tmdb.url);

export const getMovies = async (): Promise<Movie[]> => {
    const url_string: string = '/movie/now_playing'
    const { data } = await http.get(url_string);
    return data.results;
}

export const getMovie = async (id: String): Promise<Movie> => {
    const url_string: string = `/movie/${id}`
    const { data } = await http.get(url_string);
    return data;
}

export interface Movie {
    id: string,
    title: string,
    overview: string,
    posterPath: string,
    posterPathW92: string,
    posterPathW154: string,
    posterPathW185: string,
    posterPathW342: string,
    posterPathW780: string,
    backdropPathW300: string,
    backdropPathW780: string,
    backdropPathW1280: string,
}
