import mysql from 'mysql2/promise';

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '12345',
  database: 'moviesdb'
};

const connection = await mysql.createConnection(config);

export class MovieModel {
  // Obtener todas las películas
  static async getMovies() {
    const [result] = await connection.query(`
      SELECT BIN_TO_UUID(id) AS id, title, year, director, duration, poster, rate 
      FROM movie;
    `);
    return result;
  }

  // Obtener películas por género
  static async getAllMovies({ genre } = {}) {
  // Si no se proporciona género, devolver todas las películas
  if (!genre) {
    return this.getMovies();
  }
  
  const lowerCaseGenre = genre.toLowerCase();
  const [genreResult] = await connection.query(`
    SELECT id FROM genre WHERE LOWER(name) = ?;
  `, [lowerCaseGenre]);
  
  if (genreResult.length === 0) return [];
  
  const [{ id }] = genreResult;
  const [movies] = await connection.query(`
    SELECT BIN_TO_UUID(m.id) AS id, m.title, m.year, m.director, m.duration, m.poster, m.rate
    FROM movie m
    JOIN movie_genre mg ON m.id = mg.movie_id
    WHERE mg.genre_id = ?;
  `, [id]);
  
  return movies;
}

  // Obtener película por ID
  static async getMovieById({ id }) {
    const [result] = await connection.query(`
      SELECT BIN_TO_UUID(id) AS id, title, year, director, duration, poster, rate 
      FROM movie 
      WHERE id = UUID_TO_BIN(?);
    `, [id]);

    return result[0];
  }

  // Agregar nueva película
  static async addMovie({ input }) {
    const {
      genre,
      title,
      year,
      director,
      duration,
      poster,
      rate
    } = input;

    const [uuidResult] = await connection.query(`SELECT UUID() uuid;`);
    const [{ uuid }] = uuidResult;

    try {
      await connection.query(`
        INSERT INTO movie (id, title, year, director, duration, poster, rate) 
        VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);
      `, [uuid, title, year, director, duration, poster, rate]);
    } catch (error) {
      throw new Error('Error al insertar la película');
    }

    // Agregar relación con género
    if (genre) {
      const [genreResult] = await connection.query(`
        SELECT id FROM genre WHERE LOWER(name) = ?;
      `, [genre.toLowerCase()]);

      if (genreResult.length > 0) {
        const [{ id: genreId }] = genreResult;

        await connection.query(`
          INSERT INTO movie_genre (movie_id, genre_id) VALUES (UUID_TO_BIN(?), ?);
        `, [uuid, genreId]);
      }
    }

    const [movie] = await connection.query(`
      SELECT BIN_TO_UUID(id) AS id, title, year, director, duration, poster, rate 
      FROM movie 
      WHERE id = UUID_TO_BIN(?);
    `, [uuid]);

    return movie[0];
  }

  // Actualizar película
  static async updateMovie({ id, input }) {
    const fields = [];
    const values = [];

    for (const key in input) {
      fields.push(`${key} = ?`);
      values.push(input[key]);
    }

    if (fields.length === 0) return false;

    values.push(id); // Para el WHERE

    const [result] = await connection.query(`
      UPDATE movie SET ${fields.join(', ')} 
      WHERE id = UUID_TO_BIN(?);
    `, values);

    return result.affectedRows > 0;
  }

  // Eliminar película
  static async deleteMovie({ id }) {
    const [result] = await connection.query(`
      DELETE FROM movie WHERE id = UUID_TO_BIN(?);
    `, [id]);

    return result.affectedRows > 0;
  }
}
