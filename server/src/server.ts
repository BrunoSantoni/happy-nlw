import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes';
import errorHandler from './errors/handler';
import { join } from 'path';

import './database/connection';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
app.use(routes);
app.use(errorHandler);

app.listen(process.env.PORT);