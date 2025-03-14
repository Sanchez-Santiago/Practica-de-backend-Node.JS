const z = require('zod');

const movieSchema = z.object({
    title: z.string(),
    year: z.number().int().positive().min(1900).max(2025),
    director: z.string(),
    duration: z.number().int().positive().min(60),
    poster: z.string().url({
        message: 'Poster must be a valid URL'
    }),
    genre: z.array(z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-fi'])).min(1),
    rate: z.number().min(0).max(10).optional(),
});

function validateMovie(object) {
    return movieSchema.safeParse(object);
}

function validatePartialMovie(object) {
    return movieSchema.partial().safeParse(object);
}

module.exports = {
    validateMovie,
    validatePartialMovie // ¡Exportando ambas funciones!
};
