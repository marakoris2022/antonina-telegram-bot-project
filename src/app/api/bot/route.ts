export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

import { Bot, webhookCallback } from 'grammy';
import { MongoClient } from 'mongodb';

const token = process.env.TELEGRAM_BOT_TOKEN;
const mongoUri = process.env.MONGODB_URI;
const dbName = 'telegram_bot_db';

if (!token || !mongoUri) throw new Error('Не хватает переменных окружения!');

const client = new MongoClient(mongoUri);
await client.connect();
const db = client.db(dbName);
const users = db.collection('users');

const bot = new Bot(token);

bot.on('message:text', async (ctx) => {
  const userId = ctx.from.id;
  const text = ctx.message.text;

  await users.updateOne(
    { userId },
    { $set: { lastMessage: text, updatedAt: new Date() } },
    { upsert: true }
  );

  const userData = await users.findOne({ userId });
  const reply = `Ты написал: "${text}". Всего сообщений: ${userData?.messageCount || 1}`;

  await ctx.reply(reply);
});

export const POST = webhookCallback(bot, 'std/http');