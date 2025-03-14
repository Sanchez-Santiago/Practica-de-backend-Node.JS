const { title } = require('node:process');
const express = require('express');
const movies = require('./movies.json');
const crypto = require('node:crypto');
const { validateMovie, validatePartialMovie } = require('./schemas/movies');

const app = express();
app.use(express.json());
app.disable('x-powered-by');

// Ruta principal
app.get('/', (req, res) => {
    res.json({ message: 'hola mundo' });
});

// Ruta para obtener todas las películas
app.get('/movies', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const { genre } = req.query;  // ✅ Corregido aquí
    if (genre) {
        const moviesFiltered = movies.filter(
            m => m.genre.map(g => g.toLowerCase()).includes(genre.toLowerCase())  // ✅ Corregido: Manejo de géneros múltiples
        );
        res.json(moviesFiltered);
    } else {
        res.json(movies);
    }
});

// Ruta para obtener una película por ID
app.get('/movies/:id', (req, res) => {
    const id = req.params.id;
    const movie = movies.find(m => m.id === id);

    if (movie) {
        res.json(movie);
    } else {
        res.status(404).send('Película no encontrada');
    }
});

// Ruta para agregar una película
app.post('/movies', (req, res) => {
    const result = validateMovie(req.body);

    if (!result.success) {
        return res.status(400).json({ error: result.error.issues });
    }

    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    };
    movies.push(newMovie);
    res.status(201).json(newMovie);
});

// Ruta para actualizar parcialmente una película
app.patch('/movies/:id', (req, res) => {
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
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).send('<h1>Página no encontrada</h1>');
});

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
    console.log(`Server escuchando en el puerto http://localhost:${PORT}`);
});
