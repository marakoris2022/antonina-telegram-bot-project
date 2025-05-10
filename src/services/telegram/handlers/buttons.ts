import { Bot } from 'grammy';
import {
  createMainMenu,
  createFitnessMenu,
  createNutritionMenu,
  createProgressMenu,
  createStrengthMenu,
  createCardioMenu,
  createAboutMeMenu,
} from '../keyboards';
import { getUser } from '@/app/repositories/users';
import { GENDER_DICT, GOAL_DICT } from '@/lib/constants';
import { Gender, Goal } from '@/types/types';

export function setupButtonHandlers(bot: Bot) {
  bot.callbackQuery('menu_main', async (ctx) => {
    console.log('menu_main');
    await ctx.editMessageText('Главное меню:', {
      reply_markup: createMainMenu(),
    });
  });

  bot.callbackQuery('menu_fitness', async (ctx) => {
    console.log('menu_fitness');
    await ctx.editMessageText('Выберите тип тренировки:', {
      reply_markup: createFitnessMenu(),
    });
  });

  bot.callbackQuery('menu_nutrition', async (ctx) => {
    console.log('menu_nutrition');
    await ctx.editMessageText('Раздел питания:', {
      reply_markup: createNutritionMenu(),
    });
  });

  bot.callbackQuery('menu_progress', async (ctx) => {
    console.log('menu_progress');
    await ctx.editMessageText('Раздел прогресса:', {
      reply_markup: createProgressMenu(),
    });
  });

  bot.callbackQuery('workout_strength', async (ctx) => {
    console.log('workout_strength');
    await ctx.editMessageText('Силовая тренировка:', {
      reply_markup: createStrengthMenu(),
    });
  });

  bot.callbackQuery('workout_cardio', async (ctx) => {
    console.log('workout_cardio');
    await ctx.editMessageText('Кардио тренировка:', {
      reply_markup: createCardioMenu(),
    });
  });

  bot.callbackQuery('menu_about', async (ctx) => {
    try {
      console.log('menu_about triggered');
      await ctx.answerCallbackQuery();

      const user = await getUser(ctx.from.id);
      const messageText = `
      ✨ *${user ? 'Привет' : 'Здравствуйте'}, ${ctx.from.first_name}* ✨
      
      📋 *Ваш профиль:*
      
      ▫️ *Возраст:* ${user?.age ? `\`${user.age}\`` : '🚫 Не указан'}
      ▫️ *Пол:* ${user?.gender ? GENDER_DICT[user.gender as Gender] : '🚫 Не указан'}
      ▫️ *Цель:* ${user?.goal ? GOAL_DICT[user.goal as Goal] : '🚫 Не указана'}
      ▫️ *Вес:* ${user?.weight ? `\`${user.weight} кг\`` : '🚫 Не указан'}
      ▫️ *Рост:* ${user?.height ? `\`${user.height} см\`` : '🚫 Не указан'}
      ▫️ *Телефон:* ${user?.phoneNumber ? `\`${user.phoneNumber}\`` : '🚫 Не указан'}
      ▫️ *Email:* ${user?.email ? `\`${user.email}\`` : '🚫 Не указан'}
      `;

      console.log(messageText);
      await ctx.reply(messageText.trim(), {
        reply_markup: createAboutMeMenu(),
        parse_mode: 'MarkdownV2',
      });
    } catch (error) {
      console.error('Error in menu_about:', error);
      await ctx.answerCallbackQuery('⚠️ Произошла ошибка');
    }
  });
}
