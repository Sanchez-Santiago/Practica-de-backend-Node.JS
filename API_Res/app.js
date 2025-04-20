const { title } = require('node:process');
const express = require('express');
const movies = require('./movies.json');
const crypto = require('node:crypto');
import router, { router as moviesRouter } from './routes/movies';

const router = router();
const app = express();
app.use(express.json());
app.disable('x-powered-by');

// Ruta principal
app.get('/', (req, res) => {
    res.json({ message: 'hola mundo' });
});

// Ruta para obtener todas las películas
app.get('/movies', router );

// Manejo de rutas no encontradas
app.use((corsMiddleware) => {
    res.status(404).send('<h1>Página no encontrada</h1>');
});

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
    console.log(`Server escuchando en el puerto http://localhost:${PORT}`);
});
