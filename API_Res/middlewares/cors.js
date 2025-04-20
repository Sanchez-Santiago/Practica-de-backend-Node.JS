import cors from 'cors';

const ACCEPTED_ORIGINS = ['http://localhost:3000', 'http://localhost:1234'];


export const corsMiddleware = ({ACCEPTEDoigind = ACCEPTED_ORIGINS}= {}) => cors({
    origin: (origin, callback) => {
        

        if (ACCEPTED_ORIGINS.includes(origin)) {
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

export const corsMiddleware2 = ({options}) => cors({
    origin: (origin, callback) => {  // ✅ Corregido aquí
        const ACCEPTED_ORIGINS = ['http://localhost:3000', 'http://localhost:1234'];    // ✅ Corregido aquí            
        if (origin === '*') {        // ✅ Corregido aquí
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
   
