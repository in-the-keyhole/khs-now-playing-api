const defaultPort = 4000;

interface Environment {
    apollo: {
        introspection: boolean,
    },
    port: number | string;
    tmdb: {
        url: string;
        api_key: string;
    }
}

export const environment: Environment = {
    apollo: {
        introspection: process.env.APOLLO_INTROSPECTION === 'true',
    },
    port: process.env.PORT || defaultPort,
    tmdb: {
        url: process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3',
        api_key: process.env.TMDB_API_KEY || ''
    }
};