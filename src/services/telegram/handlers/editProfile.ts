import { getSession, clearSession } from '../session';
import { updateUser } from '@/app/repositories/users';
import {
  createCancelKeyboard,
  createGenderKeyboard,
  createGoalKeyboard,
  createMainMenu,
} from '../keyboards';
import { Bot } from 'grammy';

export function setupProfileHandlers(bot: Bot) {
  bot.callbackQuery('menu_edit_profile', async (ctx) => {
    const session = getSession(ctx.from.id);
    session.editProfile = 'editing_age';
    session.editTempData = {
      userId: ctx.from.id,
    };

    await ctx.answerCallbackQuery();
    await ctx.editMessageText('Введите ваш возраст (число):', {
      reply_markup: createCancelKeyboard(),
    });
  });

  bot.on('message:text').filter(
    (ctx) => {
      const session = getSession(ctx.from.id);
      return !!session.editProfile;
    },
    async (ctx) => {
      const session = getSession(ctx.from.id);
      const text = ctx.message.text;

      try {
        switch (session.editProfile) {
          case 'editing_age':
            const age = parseInt(text);
            if (isNaN(age)) throw new Error('Возраст должен быть числом');
            session.editTempData!.age = age;
            session.editProfile = 'editing_gender';
            await ctx.reply('Укажите ваш пол (м/ж):', {
              reply_markup: createGenderKeyboard(),
            });
            break;

          case 'editing_gender':
            if (!['м', 'ж'].includes(text.toLowerCase())) {
              throw new Error('Укажите "м" или "ж"');
            }
            session.editTempData!.gender =
              text.toLowerCase() === 'м' ? 'male' : 'female';
            session.editProfile = 'editing_goal';
            await ctx.reply('Ваша цель (похудение/поддержание/набор):', {
              reply_markup: createGoalKeyboard(),
            });
            break;

          case 'editing_goal':
            session.editTempData!.goal = text as
              | 'lose_weight'
              | 'gain_weight'
              | 'maintain_weight';
            session.editProfile = 'editing_weight';
            await ctx.reply('Введите ваш вес (кг):', {
              reply_markup: createCancelKeyboard(),
            });
            break;

          case 'editing_weight':
            const weight = parseFloat(text);
            if (isNaN(weight)) throw new Error('Вес должен быть числом');
            session.editTempData!.weight = weight;
            session.editProfile = 'editing_height';
            await ctx.reply('Введите ваш рост (см):', {
              reply_markup: createCancelKeyboard(),
            });
            break;

          case 'editing_height':
            const height = parseInt(text);
            if (isNaN(height)) throw new Error('Рост должен быть числом');
            session.editTempData!.height = height;
            session.editProfile = 'editing_phone';
            await ctx.reply('Введите ваш номер телефона: (можно не указывать)', {
              reply_markup: createCancelKeyboard(),
            });
            break;

          case 'editing_phone':
            session.editTempData!.phoneNumber = text;
            session.editProfile = 'editing_email';
            await ctx.reply('Введите вашу электронную почту: (можно не указывать)', {
              reply_markup: createCancelKeyboard(),
            });
            break;

          case 'editing_email':
            session.editTempData!.email = text;
            await updateUser(ctx.from.id, session.editTempData);
            clearSession(ctx.from.id);

            await ctx.reply('✅ Профиль успешно обновлен!', {
              reply_markup: createMainMenu(),
            });
            break;
        }
      } catch (error) {
        await ctx.reply(
          `❌ Ошибка: ${(error as Error).message}\nПопробуйте еще раз:`
        );
      }
    }
  );

  bot.callbackQuery('gender_male', async (ctx) => {
    const session = getSession(ctx.from.id);
    session.editTempData!.gender = 'male';
    session.editProfile = 'editing_goal';
    await ctx.answerCallbackQuery();
    await ctx.editMessageText('Ваша цель (похудение/поддержание/набор):', {
      reply_markup: createGoalKeyboard(),
    });
  });

  bot.callbackQuery('gender_female', async (ctx) => {
    const session = getSession(ctx.from.id);
    session.editTempData!.gender = 'female';
    session.editProfile = 'editing_goal';
    await ctx.answerCallbackQuery();
    await ctx.editMessageText('Ваша цель (похудение/поддержание/набор):', {
      reply_markup: createGoalKeyboard(),
    });
  });

  bot.callbackQuery('goal_loss', async (ctx) => {
    const session = getSession(ctx.from.id);
    session.editTempData!.goal = 'lose_weight';
    session.editProfile = 'editing_weight';
    await ctx.answerCallbackQuery();
    await ctx.editMessageText('Введите ваш вес (кг):');
  });

  bot.callbackQuery('goal_maintain', async (ctx) => {
    const session = getSession(ctx.from.id);
    session.editTempData!.goal = 'maintain_weight';
    session.editProfile = 'editing_weight';
    await ctx.answerCallbackQuery();
    await ctx.editMessageText('Введите ваш вес (кг):');
  });

  bot.callbackQuery('goal_gain', async (ctx) => {
    const session = getSession(ctx.from.id);
    session.editTempData!.goal = 'gain_weight';
    session.editProfile = 'editing_weight';
    await ctx.answerCallbackQuery();
    await ctx.editMessageText('Введите ваш вес (кг):');
  });

  bot.callbackQuery('cancel_edit', async (ctx) => {
    clearSession(ctx.from.id);
    await ctx.answerCallbackQuery();
    return ctx.reply('Редактирование отменено', {
      reply_markup: createMainMenu(),
    });
  });
}
