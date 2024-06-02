import express from 'express';
import cors from 'cors';
import pdfRoutes from './routes/pdfRoutes';

const app = express();

// Enables Cross-Origin Resource Sharing (CORS) for all routes
app.use(cors());

// Parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json());

app.use('/api', pdfRoutes);

export default app;
