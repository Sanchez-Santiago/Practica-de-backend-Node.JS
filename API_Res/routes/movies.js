// routes/movies.js
import { Router } from 'express';
import { MovieController } from '../controllers/movies.js';

export const createMovieRouter = ({ MovieModel }) => {
  const routerMovies = Router();
  
  // Corregido: nombre del parámetro (ahora es MovieModel con M mayúscula)
  const movieController = new MovieController({ MovieModel });
  
  routerMovies.get('/', movieController.getAll);
  routerMovies.get('/:id', movieController.getById);
  routerMovies.post('/', movieController.create);
  routerMovies.patch('/:id', movieController.update);
  routerMovies.delete('/:id', movieController.delete);
  
  return routerMovies;
}