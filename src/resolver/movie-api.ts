// import { Http } from './http';
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

  // async getMovie(id) {
  //   // Send a GET request to the specified endpoint
  //   return this.get(`movies/${encodeURIComponent(id)}`);
  // }

  // async getMostViewedMovies(limit = 10) {
  //   const data = await this.get('movies', {
  //     // Query parameters
  //     per_page: limit,
  //     order_by: 'most_viewed',
  //   });
  //   return data.results;
  // }

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

  // getCredits = async (id: string): Promise<Credits> => {
  //   const url_string = `/movie/${id}/credits`;
  //   const { data } = await this.http.get<Credits>(url_string);
  //   return data;
  // };

  // getCast = async (id: string): Promise<[]> => {
  //   return (await getCredits(id)).cast;
  // };

  // getCrew = async (id: string): Promise<[]> => {
  //   return (await getCredits(id)).crew;
  // };
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  // credits: Credits;
  // cast: [Cast];
  // crew: [Crew];
}

// export interface Credits {
//   id: string;
//   cast: [];
//   crew: [];
// }

// export interface Cast {
//   id: string;
//   name: string;
//   character: string;
// }

// export interface Crew {
//   id: string;
//   name: string;
//   job: string;
// }
