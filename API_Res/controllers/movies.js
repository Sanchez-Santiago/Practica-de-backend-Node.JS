import { MovieModel } from '../models/movies';

export class MovieController {
    static async getAll (req, res) {
        const { genre } = req.query;  // ✅ Corregido aquí
        const movies = await MovieModel.getAll({ genre });
        res.json(movies);
    }
        
    static async getById (req, res) {
        const {id} = req.params;
        const movie = await MovieModel.create({id});
        if (movie) {
            res.json(movie);
        } else {
            res.status(404).send('Película no encontrada');
        }
    }

    static async create (req, res) {        
        const result = validateMovie(req.body);

        if (!result.success) {
            return res.status(400).json({ error: result.error.issues });
        }

        const newMovie = await MovieModel.create(result.data);
        res.status(201).json(newMovie);
    }

    static async update (req, res) {
        const result = validatePartialMovie(req.body);

        if (!result.success) {
            return res.status(400).json({ error: result.error.issues });
        }

        const id = req.params.id;
        const movieIndex = movies.findIndex(m => m.id === id);

        if (movieIndex === -1) {
            return res.status(404).send('Película no encontrada');
        }

        const updatedMovie = {
            ...movies[movieIndex],
            ...result.data
        };

        movies[movieIndex] = updatedMovie;
        res.json(updatedMovie);
    }
    static async delete (req, res) {
        const id = req.params.id;
        const result = await MovieModel.delete({id});
        if (!result) {
            return res.status(404).send('Película no encontrada');
        }
        res.json(result);
    }   
}