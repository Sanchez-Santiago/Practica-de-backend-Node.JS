const movies = require('./movies.json');
import {randomUUID} from 'crypto';

export class MovieModel {

    static async getAll ({ genre }) {
        const movies = this.getAllMovies();
        if (genre) {
            const moviesFiltered = movies.filter(
                movies => movies.genre.map(g => g.toLowerCase()).includes(genre.toLowerCase())
            );
            return moviesFiltered;
        }
        return movies;
    }

    static async create({id}) {
        const movie = movies.find(m => m.id === id);
        if (movie) {
            return movie;
        
        }      
    }         
    
    static async create(imput) {    
        const newMovie = {
            id: crypto.randomUUID(),
            ...imput
        };
        movies.push(newMovie);
        res.status(201).json(newMovie);
        return newMovie;
    }

    static async delete({id}) {
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

    static async update({id, imput}) {
        const movieIndex = movies.findIndex(m => m.id === id);

        if (movieIndex === -1) {
            return false;
        }

        const updatedMovie = {
            ...movies[movieIndex],
            ...result.data
        };

        movies[movieIndex] = updatedMovie;
        res.json(updatedMovie);
    }   
     
}