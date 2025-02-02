import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

const envFile = process.env.NODE_ENV === 'production' ? '../../.env.production' : '../../.env';
dotenv.config({ path: path.resolve(__dirname, envFile) });

export const connectDB = async () => {
  try {
    console.debug('MONGO URI', process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
