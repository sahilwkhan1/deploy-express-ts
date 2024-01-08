import express, { Request, Response } from 'express';
import { MongoClient } from 'mongodb';

const app = express();
const port = process.env.PORT || 8080;

// MongoDB connection URI
const DB_URL = 'mongodb+srv://g7crservicesdev:tB3q2YrncrGugTIh@lms.allbqqh.mongodb.net/lms?retryWrites=true&w=majority';

import { Db } from 'mongodb';

let db: Db | null = null;

async function connectToDatabase() {
  const client = new MongoClient(DB_URL );
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db('lms');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}


connectToDatabase();

app.get('/', (_req: Request, res: Response) => {
  return res.send('Express TypeScript on Vercel');
});

app.get('/ping', (_req: Request, res: Response) => {
  return res.send('pong 🏓');
});

app.get('/user', async (_req: Request, res: Response) => {
  try {
    const users = await db.collection('users').find().toArray();
    return res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
