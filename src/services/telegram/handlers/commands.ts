import { Bot } from 'grammy';
import { createMainMenu } from '../keyboards';
import { createUser, getUser } from '@/app/repositories/users';

const MODERATOR_CHAT_ID = process.env.MODERATOR_CHAT_ID;

export function setupCommandHandlers(bot: Bot) {
  bot.command('start', async (ctx) => {
    const user = await getUser(ctx.from!.id);
    let isNewUser = false;

    if (!user) {
      await createUser({
        userId: ctx.from!.id,
        firstName: ctx.from!.first_name,
        lastName: ctx.from!.last_name,
        createdAt: new Date(),
      });
      isNewUser = true;
      await ctx.deleteMessage();

      if (MODERATOR_CHAT_ID) {
        try {
          await bot.api.sendMessage(
            MODERATOR_CHAT_ID,
            `🆕 Новый пользователь!\n\n` +
              `👤 Имя: ${ctx.from!.first_name} ${ctx.from!.last_name || ''}\n` +
              `🆔 ID: ${ctx.from!.id}\n` +
              `📅 Дата: ${new Date().toLocaleString()}\n\n` +
              `#новый_пользователь`,
            { parse_mode: 'HTML' }
          );
        } catch (error) {
          console.error('Ошибка при отправке уведомления модератору:', error);
        }
      }
    }

    if (isNewUser) {
      await ctx.reply(
        `
        Добро пожаловать, ${ctx.from!.first_name}! 👋

        Я - ваш персональный фитнес-помощник AntoninaFitnessTrainerBot! 💪

        Давайте начнем наше знакомство:
        1. Сначала заполните ваш профиль
        2. Затем выберите цель тренировок
        3. После этого я смогу составить для вас персонализированную программу

        Готовы начать? Нажмите кнопку "Ваш профиль" ниже!
      `,
        {
          reply_markup: createMainMenu(),
          parse_mode: 'HTML',
        }
      );
    } else {
      await ctx.reply(
        `
        С возвращением, ${ctx.from!.first_name}! 👋

        Чем займемся сегодня?
        🏋️‍♀️ Продолжим тренировки
        🥗 Проверим питание
        📊 Посмотрим прогресс

        Выберите действие в меню ниже:
      `,
        {
          reply_markup: createMainMenu(),
          parse_mode: 'HTML',
        }
      );
    }
  });
}
