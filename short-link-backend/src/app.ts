import express from 'express';
import "reflect-metadata";
import helmet from 'helmet';
import cors from 'cors';
import { setupSwagger } from './swagger';
import urlRoutes from './routes/url.routes';


const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

setupSwagger(app);

// Routes
app.use('/api/v1', urlRoutes);

export default app;
