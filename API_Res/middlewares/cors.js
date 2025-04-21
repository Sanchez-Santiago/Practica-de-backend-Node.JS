import cors from 'cors';

const ACCEPTED_ORIGINS = ['http://localhost:3000', 'http://localhost:1234'];

export const corsMiddleware = () => cors({
  origin: (origin, callback) => {

    
    // Si no hay origin (solicitud del mismo servidor o herramienta como Bruno)
    // o si el origin está en la lista de permitidos
    if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With'],
  credentials: true,
  preflightContinue: false,
});

// Si necesitas un segundo middleware, también lo he corregido:
export const corsMiddleware2 = () => cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = ['http://localhost:3000', 'http://localhost:1234'];
    
    if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With'],
  credentials: true,
  preflightContinue: false,
});