import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import "reflect-metadata";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

afterEach(async () => {
    await mongoose.connection.dropDatabase();
  });
