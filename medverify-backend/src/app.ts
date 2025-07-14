import express from 'express';
import cors from 'cors';
import routes from './routes';
import { errorHandler } from './utils/errorHandler';
import { PORT } from './config/env';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.use(errorHandler);

export default app;