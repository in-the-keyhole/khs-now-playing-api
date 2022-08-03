import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { environment } from '../environment';
import { logger } from '../logger';


enum StatusCode {
    Unauthorized = 401,
    Forbidden = 403,
    TooManyRequests = 429,
    InternalServerError = 500,
}

const headers: Readonly<Record<string, string | boolean>> = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
};

export class Http {
    private instance: AxiosInstance;

    constructor(baseURL: string) {
        this.instance = this.initHttp(baseURL);
    }

    private get http(): AxiosInstance {
        return this.instance;
    }

    private initHttp(baseURL?: string): AxiosInstance {
        const http = axios.create({
            baseURL: baseURL,
            headers,
            params: {
                api_key: environment.tmdb.api_key
            }
        });

        http.interceptors.request.use(request => {
            logger.debug('Axios Request -> %o', [request.baseURL, request.url].join(''));
            return request;
        })

        http.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                const { message, response } = error;
                logger.error('Axios Error -> %o', message);
                return this.handleError(message, response);
            }
        );

        this.instance = http;
        return http;
    }

    async get<T = unknown, R = AxiosResponse<T>>(
        url: string,
        modifyHeadersCallback?: ((arg0: AxiosInstance) => unknown) | undefined,
        config?: AxiosRequestConfig
    ): Promise<R> {
        if (modifyHeadersCallback) {
            await modifyHeadersCallback(this.http);
        }
        return this.http.get<T, R>(url, config);
    }

    // Handle global app errors
    // We can handle generic app errors depending on the status code
    private handleError(message: string, error: { status: number; }) {
        // logger.info('handleError -> %s, %o', message, error);

        if (error) {
            const { status } = error;

            switch (status) {
                case StatusCode.InternalServerError: {
                    // Handle InternalServerError
                    break;
                }
                case StatusCode.Forbidden: {
                    // Handle Forbidden
                    break;
                }
                case StatusCode.Unauthorized: {
                    // Handle Unauthorized
                    break;
                }
                case StatusCode.TooManyRequests: {
                    // Handle TooManyRequests
                    break;
                }
            }
        }

        return Promise.reject(error || message);
    }
}
