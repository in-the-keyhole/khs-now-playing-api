import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { MovieAPI } from "./resolver/movie-api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mockMovieData: any[] = [
    {
        "id": 1,
        "title": "Thor: Love and Thunder",
        "overview": "After his retirement is interrupted by Gorr the God Butcher, a galactic killer who seeks the extinction of the gods, Thor enlists the help of King Valkyrie, Korg, and ex-girlfriend Jane Foster, who now inexplicably wields Mjolnir as the Mighty Thor. Together they embark upon a harrowing cosmic adventure to uncover the mystery of the God Butcher’s vengeance and stop him before it’s too late.",
        "poster_path": "/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg",
        "backdrop_path": "/p1F51Lvj3sMopG948F5HsBbl43C.jpg"
    },
    {
        "id": 2,
        "title": "Jurassic World Dominion",
        "overview": "Four years after Isla Nublar was destroyed, dinosaurs now live—and hunt—alongside humans all over the world. This fragile balance will reshape the future and determine, once and for all, whether human beings are to remain the apex predators on a planet they now share with history’s most fearsome creatures.",
        "poster_path": "/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg",
        "backdrop_path": "/7bhvI1tM7JBmqP8HSevIsebSBbh.jpg"
    }
]

const movieAPI = new MovieAPI();
movieAPI.nowPlaying = jest.fn().mockResolvedValue(mockMovieData);
movieAPI.movieById = jest.fn().mockResolvedValue(mockMovieData[0]);

describe('Queries', () => {
    const testServer = new ApolloServer({
        typeDefs,
        resolvers,
        dataSources: () => {
            return {
                movieAPI: movieAPI
            };
        },
    });

    it('nowPlaying - base properties', async () => {
        const result = await testServer.executeOperation({
            query: 'query nowPlaying {nowPlaying { id title overview posterPath backdropPath}}',
            variables: {},
        });

        expect(result.errors).toBeUndefined();
        expect(result.data?.nowPlaying).toHaveLength(2);
        expect(result.data?.nowPlaying[0].id).toEqual(mockMovieData[0].id);
        expect(result.data?.nowPlaying[0].title).toEqual(mockMovieData[0].title)
        expect(result.data?.nowPlaying[0].overview).toContain(mockMovieData[0].overview)
        expect(result.data?.nowPlaying[0].posterPath).toContain(mockMovieData[0].poster_path)
        expect(result.data?.nowPlaying[0].backdropPath).toContain(mockMovieData[0].backdrop_path)
    });

    it('movie(id) - base properties', async () => {
        const result = await testServer.executeOperation({
            query: 'query movieById($id: ID!) {movie(id: $id) { id title overview posterPath backdropPath}}',
            variables: { id: mockMovieData[0].id },
        });

        expect(result.errors).toBeUndefined();
        expect(result.data?.movie.id).toEqual(mockMovieData[0].id);
        expect(result.data?.movie.title).toEqual(mockMovieData[0].title)
        expect(result.data?.movie.overview).toContain(mockMovieData[0].overview)
        expect(result.data?.movie.posterPath).toContain(mockMovieData[0].poster_path)
        expect(result.data?.movie.backdropPath).toContain(mockMovieData[0].backdrop_path)
    });
});