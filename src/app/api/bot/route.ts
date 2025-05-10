export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

import { Bot, webhookCallback } from 'grammy';
import { MongoClient } from 'mongodb';

const token = process.env.TELEGRAM_BOT_TOKEN;
const mongoUri = process.env.MONGODB_URI;
const dbName = 'telegram_bot_db';

if (!token || !mongoUri) throw new Error('Не хватает переменных окружения!');

const client = new MongoClient(mongoUri);
const db = client.db(dbName);
const users = db.collection('users');

const bot = new Bot(token);

bot.on('message:text', async (ctx) => {
  const userId = ctx.from.id;
  const text = ctx.message.text;

  let messageCount = 1;

  try {
    const user = await users.findOne({ userId });
    console.log('user', user);
    messageCount = user?.messageCount || 1;

    if (user) {
      await users.updateOne(
        { userId },
        {
          $set: {
            lastMessage: text,
            updatedAt: new Date(),
            messageCount: messageCount + 1,
          },
        }
      );
    } else {
      await users.insertOne({
        userId,
        lastMessage: text,
        createdAt: new Date(),
        updatedAt: new Date(),
        messageCount,
      });
    }
  } catch (error) {
    console.error('Ошибка при обновлении данных пользователя:', error);
  }

  const reply = `Ты написал: "${text}". Всего сообщений: ${messageCount}`;

  await ctx.reply(reply);
});

try {
  await client.connect();
  console.log('Подключение к MongoDB установлено');
} catch (error) {
  console.error('Ошибка подключения к MongoDB:', error);
}

export const POST = webhookCallback(bot, 'std/http');
