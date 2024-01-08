import express, { Request, Response } from 'express';
import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
config();
const app = express();
const port = process.env.PORT || 8080;

// MongoDB connection URI
// const DB_URL = 'mongodb+srv://sahil2:Aa123456@cluster0.rfxzntu.mongodb.net/'

import { Db } from 'mongodb';

let db: Db | null = null;

async function connectToDatabase() {
  console.log(process.env.DB_URL);
  const client = new MongoClient(process.env.MONGO_DB_URL);
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db('lms');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

app.get('/', (_req: Request, res: Response) => {
  return res.send('Express TypeScript on Vercel');
});

app.get('/ping', (_req: Request, res: Response) => {
  return res.send('pong 🏓');
});

app.get('/user', async (_req: Request, res: Response) => {
  try {
    if (db) {
      const users = await db.collection('users').find().toArray();
      return res.json(users);
    } else {
      throw new Error('Database connection is not established');
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).send('Internal Server Error');
  }
});

app.listen(port, async () => {
  try {
    await connectToDatabase();
    console.log(`Server is listening on ${port}`);
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1);
  }
});