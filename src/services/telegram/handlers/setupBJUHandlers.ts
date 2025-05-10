import { Bot } from 'grammy';
import { getUser, updateUser } from '@/app/repositories/users';
import { createMainMenu, createCancelKeyboard } from '../keyboards';
import { Goal, GOAL_DICT, updateSession, getSession, User } from '../session';

export function setupBJUHandlers(bot: Bot) {
  bot.callbackQuery('menu_bju', async (ctx) => {
    try {
      const userId = ctx.from.id;
      const user = await getUser(userId);

      if (!user || !user.age || !user.gender || !user.goal || !user.height) {
        await ctx.answerCallbackQuery();
        await ctx.editMessageText(
          '⚠️ Для расчета БЖУ необходимо заполнить профиль.\n' +
          'Пожалуйста, перейдите в раздел "Обо мне" и заполните все данные:\n\n' +
          `- Возраст: ${user?.age ? '✅' : '❌'}\n` +
          `- Пол: ${user?.gender ? '✅' : '❌'}\n` +
          `- Цель: ${user?.goal ? '✅' : '❌'}\n` +
          `- Рост: ${user?.height ? '✅' : '❌'}`,
          { reply_markup: createMainMenu() }
        );
        return;
      }

      updateSession(userId, { 
        currentMenu: 'menu_bju',
        waitingForWeight: true 
      });

      await ctx.answerCallbackQuery();
      await ctx.editMessageText('Введите ваш актуальный вес (кг):', {
        reply_markup: createCancelKeyboard(),
      });

    } catch (error) {
      console.error('Error in BJU calculation:', error);
      await ctx.answerCallbackQuery();
      await ctx.editMessageText(
        '⚠️ Произошла ошибка. Пожалуйста, попробуйте позже.',
        { reply_markup: createMainMenu() }
      );
    }
  });

  bot.on('message:text').filter(
    (ctx) => {
      const session = getSession(ctx.from.id);
      return session.waitingForWeight === true;
    },
    async (ctx) => {
      try {
        const userId = ctx.from.id;
        const text = ctx.message.text;
        const weight = parseFloat(text);

        if (isNaN(weight) || weight <= 0) {
          throw new Error('Введите корректный вес (положительное число)');
        }

        const user = await getUser(userId);
        if (!user) throw new Error('Данные пользователя не найдены');

        await updateUser(userId, { weight });

        const updatedUser = { ...user, weight, userId };
        const bju = calculateBJU(updatedUser);

        updateSession(userId, { 
          waitingForWeight: false,
          currentMenu: 'menu_main' 
        });

        await ctx.reply(
          `🍏 Ваша рекомендуемая норма БЖУ:\n\n` +
          `⚖️ Калории: ${bju.calories} ккал\n` +
          `🥩 Белки: ${bju.proteins} г\n` +
          `🥑 Жиры: ${bju.fats} г\n` +
          `🍞 Углеводы: ${bju.carbs} г\n\n` +
          `Цель: ${GOAL_DICT[user.goal as Goal]}\n` +
          `Актуальный вес: ${weight} кг`,
          { reply_markup: createMainMenu() }
        );

      } catch (error) {
        await ctx.reply(
          `❌ Ошибка: ${(error as Error).message}\nПопробуйте еще раз:`,
          { reply_markup: createCancelKeyboard() }
        );
      }
    }
  );

  bot.callbackQuery('cancel_edit', async (ctx) => {
    updateSession(ctx.from.id, { 
      waitingForWeight: false,
      currentMenu: 'menu_main' 
    });
    await ctx.answerCallbackQuery();
    await ctx.editMessageText('Расчет БЖУ отменен', {
      reply_markup: createMainMenu(),
    });
  });
}

function calculateBJU(user: User) {
  let bmr: number;
  if (user.gender === 'male') {
    bmr = 10 * user.weight! + 6.25 * user.height! - 5 * user.age! + 5;
  } else {
    bmr = 10 * user.weight! + 6.25 * user.height! - 5 * user.age! - 161;
  }

  let calories: number;
  switch (user.goal) {
    case 'lose_weight':
      calories = bmr * 1.2 - 300;
      break;
    case 'gain_weight':
      calories = bmr * 1.2 + 300;
      break;
    case 'maintain_weight':
    default:
      calories = bmr * 1.2;
  }

  const proteins = Math.round(user.weight! * 1.8 * 10) / 10;
  const fats = Math.round((calories * 0.25 / 9) * 10) / 10;
  const carbs = Math.round(((calories - proteins * 4 - fats * 9) / 4) * 10) / 10;

  return {
    calories: Math.round(calories),
    proteins,
    fats,
    carbs
  };
}