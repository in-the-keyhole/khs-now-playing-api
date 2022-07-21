import { Pool } from "pg";
import sql from './init_database.sql';


export const pool = new Pool({ // uses ENV vars
    min: 1,
    max: 5,
    ssl: true
})

export const resetData = async (): Promise<any> => {
    var res = await pool.query(`
    DROP TABLE IF EXISTS movies;
    CREATE TABLE IF NOT EXISTS movies
    (
        id serial not null PRIMARY KEY, 
        title varchar(75) not null,
        overview varchar(300) not null, 
        posterpath varchar(100) not null
    );  
    `).catch((err: Error) => { message: err.message });

    const { rows } = await pool.query(`select count(*) from movies`);
    if (+rows[0].count === 0) {
        await pool.query(sql);
    }
    return { message: "Success" }
}

export const getMovies = async () => {
    var moviesFromDB = await pool.query(`select id, title, overview, posterpath from movies `)
    if (moviesFromDB.rows.length == 0) {
        return [];
    }

    return moviesFromDB.rows.map(movieRow => {
        return {
            id: movieRow.id,
            title: movieRow.title,
            overview: movieRow.overview,
            posterPath: movieRow.posterpath
        }
    })
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
}

export const getMovie = async (id: String) => {

    var { rows } = await pool.query(`
    select id, title, overview, posterpath from movies where id = $1 
    `, [id])
    if (rows.length == 0) {
        return null;
    }

    var movie: Movie = {
        id: rows[0].id,
        title: rows[0].title,
        overview: rows[0].overview,
        posterPath: rows[0].posterpath,
	    posterPathW92: rows[0].posterpath,
    	posterPathW154: rows[0].posterpath,
    	posterPathW185: rows[0].posterpath,
    	posterPathW342: rows[0].posterpath,
    	posterPathW780: rows[0].posterpath,
    };

    return movie;
}