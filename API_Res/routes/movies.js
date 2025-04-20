import {Router} from 'express';
import movies from '../movies.json';
import { validateMovie, validatePartialMovie } from '../schemas/movies';
import { MovieModel } from '../models/movies';
import { MovieController } from '../controllers/movies';


export const router = Router();

router.get('/', MovieController.getAll);

router.get('/:id', MovieController.getById);

router.post('/', MovieController.create);

router.patch('/:id', MovieController.update);

router.delete('/:id', MovieController.delete);
