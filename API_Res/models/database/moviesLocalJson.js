const movies = require('../../movies.json');
import { randomUUID } from 'crypto';

export class MovieModel {
  static getAllMovies() {
    return movies;
  }

  static async getAll({ genre }) {
    const allMovies = this.getAllMovies();
    if (genre) {
      const moviesFiltered = allMovies.filter(
        movie => movie.genre.map(g => g.toLowerCase()).includes(genre.toLowerCase())
      );
      return moviesFiltered;
    }
    return allMovies;
  }

  static async getById({ id }) {
    const movie = movies.find(m => m.id === id);
    if (movie) {
      return movie;
    }
    return null;
  }

  static async create(input) {
    const newMovie = {
      id: randomUUID(),
      ...input
    };
    movies.push(newMovie);
    return newMovie;
  }

  static async delete({ id }) {
    const movieIndex = movies.findIndex(m => m.id === id);
    if (movieIndex === -1) {
      return false;
    }
    const deletedMovie = movies[movieIndex];
    movies.splice(movieIndex, 1);
    return deletedMovie;
  }

  static async update({ id, input }) {
    const movieIndex = movies.findIndex(m => m.id === id);
    if (movieIndex === -1) {
      return false;
    }
    const updatedMovie = {
      ...movies[movieIndex],
      ...input
    };
    movies[movieIndex] = updatedMovie;
    return updatedMovie;
  }
}