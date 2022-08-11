import { environment } from '../environment';
import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';

export class MovieAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = environment.tmdb.url;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', this.context.token);
    request.headers.set('Accept', 'application/json');
    request.headers.set('Content-Type', 'application/json; charset=utf-8');
    request.params.set('api_key', environment.tmdb.api_key);
  }

  async nowPlaying(): Promise<Movie[]> {
    const url_string = '/movie/now_playing';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { results } = await this.get<any>(url_string);
    return results;
  }

  async movieById(id: string): Promise<Movie> {
    const url_string = `/movie/${id}`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const movie = await this.get<any>(url_string);
    return movie;
  }
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
}