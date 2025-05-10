import { Db, MongoClient, ServerApiVersion } from 'mongodb';

const mongoUri = process.env.MONGODB_URI;
const dbName = 'telegram_bot_db';

if (!mongoUri) throw new Error('MONGODB_URI is required');

let client: MongoClient;
let db: Db;

export async function connectDB() {
  try {
    client = new MongoClient(mongoUri!, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
      maxPoolSize: 10,
      socketTimeoutMS: 30000,
      connectTimeoutMS: 10000,
    });
    
    await client.connect();
    db = client.db(dbName);
    console.log('Successfully connected to MongoDB');
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export function getDB() {
  if (!db) throw new Error('Database not connected');
  return db;
}

export async function closeDB() {
  if (client) {
    await client.close();
  }
}