// app.js o index.js
import express from 'express';
import { corsMiddleware } from './middlewares/cors.js';
import { createMovieRouter } from './routes/movies.js';
import { MovieModel } from './models/database/moviesMySql.js';

export const createAPP = ({ MovieModel }) => {

    
    const app = express();
    app.use(express.json());
    app.disable('x-powered-by');
    
    // Middleware CORS
    app.use(corsMiddleware());
    
    // Ruta principal
    app.get('/', (req, res) => {
      res.json({ message: 'hola mundo' });
    });
    
    // Montar el router en /movies
    // Corregido: pasando el objeto correctamente
    const moviesRouter = createMovieRouter({ MovieModel });
    app.use('/movies', moviesRouter);
    
    // Middleware 404
    app.use((req, res) => {
      res.status(404).send('<h1>Página no encontrada</h1>');
    });
    
    const PORT = process.env.PORT ?? 1234;
    app.listen(PORT, () => {
      console.log(`Server escuchando en el puerto http://localhost:${PORT}`);
    });
}