export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

import { Bot, webhookCallback } from 'grammy';
import { MongoClient, ServerApiVersion } from 'mongodb';

const token = process.env.TELEGRAM_BOT_TOKEN;
const mongoUri = process.env.MONGODB_URI;
const dbName = 'telegram_bot_db';

if (!token) throw new Error('TELEGRAM_BOT_TOKEN is required');
if (!mongoUri) throw new Error('MONGODB_URI is required');

const client = new MongoClient(mongoUri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  maxPoolSize: 10,
  socketTimeoutMS: 30000,
  connectTimeoutMS: 10000,
});

let db;
try {
  await client.connect();
  db = client.db(dbName);
  console.log('Successfully connected to MongoDB');
} catch (error) {
  console.error('MongoDB connection error:', error);
  throw error;
}

const users = db.collection('users');
const bot = new Bot(token);

bot.on('message:text', async (ctx) => {
  const userId = ctx.from.id;
  const text = ctx.message.text;

  try {
    const updateResult = await users.updateOne(
      { userId },
      {
        $set: { lastMessage: text, updatedAt: new Date() },
        $inc: { messageCount: 1 },
        $setOnInsert: { createdAt: new Date() }
      },
      { upsert: true }
    );

    const messageCount = updateResult.upsertedCount > 0 
      ? 1 
      : (await users.findOne({ userId }))?.messageCount || 1;

    await ctx.reply(`Ты написал: "${text}". Всего сообщений: ${messageCount}`);
  } catch (error) {
    console.error('Database operation failed:', error);
    await ctx.reply('Произошла ошибка при обработке сообщения');
  }
});

export const POST = async (request: Request) => {
  try {
    return await webhookCallback(bot, 'std/http')(request);
  } catch (error) {
    console.error('Webhook processing error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};