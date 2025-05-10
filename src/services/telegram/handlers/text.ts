import { Bot } from 'grammy';

export function setupTextHandlers(bot: Bot) {
  bot.on('message:text', async (ctx) => {
    if (ctx.message.text.startsWith('/')) return;



    await ctx.reply(`Напишите /start для начала работы :D`);
  });
}