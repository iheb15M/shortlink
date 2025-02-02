import app from './app';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db';

const envFile = process.env.NODE_ENV === 'production' ? '../.env.production' : '../.env';
dotenv.config({ path: path.resolve(__dirname, envFile) });

// Database Connection
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
