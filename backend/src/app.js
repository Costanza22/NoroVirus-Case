import express from 'express';
import cors from 'cors';

import casosRoutes from './routes/casos.js';
import eventosRoutes from './routes/eventos.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/casos', casosRoutes);
app.use('/eventos', eventosRoutes);


export default app;
