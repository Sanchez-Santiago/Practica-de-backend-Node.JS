import { createAPP } from './app.js';
import { MovieModel } from './models/database/moviesMySql.js';

createAPP({ MovieModel });