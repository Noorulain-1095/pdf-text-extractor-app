import express from 'express';
import cors from 'cors';
import pdfRoutes from './routes/pdfRoutes';

const app = express();

// Allow requests only from the target domain
const corsOptions = {
    origin: 'http://localhost:3001', // Replace with target domain
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
// Note: In future we can implement custom middleware for additional Server-Side Checks
app.use(cors(corsOptions));

// Parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json());

app.use('/api', pdfRoutes);

export default app;
