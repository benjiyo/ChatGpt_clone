import express from 'express';
import cors from 'cors';
import chatRoutes from './routes/chat.routes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.use('/api/chat', chatRoutes);

app.use(errorHandler);

export default app;
