import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';
import trantextsRoutes from './routes/trantextsRoutes.js';
import sdRoutes from './routes/sdxl-0.9Routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);
app.use('/api/v1/trantexts', trantextsRoutes);
app.use('/api/v1/sd-xl0.9', sdRoutes);

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Welcome to WFT',
  });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log('Server started on port 8080'));
  } catch (error) {
    console.log(error);
  }
};

startServer();
