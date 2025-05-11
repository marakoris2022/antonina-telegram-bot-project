import { Bot } from 'grammy';
import { getUser, updateUser } from '@/app/repositories/users';
import {
  createMainMenu,
  createCancelKeyboard,
  createActivityKeyboard,
} from '../keyboards';
import { updateSession, getSession } from '../session';
import { GOAL_DICT } from '@/lib/constants';
import { Goal, User, Activity } from '@/types/types';

export function setupBJUHandlers(bot: Bot) {
  bot.callbackQuery('menu_bju', async (ctx) => {
    try {
      const userId = ctx.from.id;
      const user = await getUser(userId);

      if (!user || !user.age || !user.gender || !user.goal || !user.height) {
        await ctx.answerCallbackQuery();
        await ctx.editMessageText(
          '⚠️ Для расчета БЖУ необходимо заполнить профиль.\n' +
            'Пожалуйста, перейдите в раздел "Ваш профиль" и заполните все данные:\n\n' +
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
        bjuStep: 'weight',
      });

      await ctx.answerCallbackQuery();
      await ctx.editMessageText(
        `<b>Введите ваш актуальный вес (кг):</b>\n` +
          `\n` +
          `<i>Пример: 70</i>\n` +
          `Данная величина необязательна для расчета БЖУ.`,
        {
          reply_markup: createCancelKeyboard(),
          parse_mode: 'HTML',
        }
      );
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
      return !!session.bjuStep;
    },
    async (ctx) => {
      try {
        const userId = ctx.from.id;
        const text = ctx.message.text;
        const session = getSession(userId);

        switch (session.bjuStep) {
          case 'weight':
            const weight = parseFloat(text);
            if (isNaN(weight) || weight <= 0) {
              throw new Error('Введите корректный вес (положительное число)');
            }
            updateSession(userId, {
              editTempData: { ...session.editTempData, weight },
              bjuStep: 'activity',
            });
            await ctx.reply(
              `<b>Укажите вашу активность:</b>\n\n` +
                `\n` +
                `<b>1.</b> ${getActivityDescription('sedentary')}\n` +
                `\n` +
                `<b>2.</b> ${getActivityDescription('lightly_active')}\n` +
                `\n` +
                `<b>3.</b> ${getActivityDescription('moderately_active')}\n` +
                `\n` +
                `<b>4.</b> ${getActivityDescription('very_active')}`,
              {
                reply_markup: createActivityKeyboard(),
                parse_mode: 'HTML',
              }
            );
            return;
        }
      } catch (error) {
        await ctx.reply(
          `❌ Ошибка: ${(error as Error).message}\nПопробуйте еще раз:`,
          { reply_markup: createCancelKeyboard() }
        );
      }
    }
  );

  bot.callbackQuery(
    [
      'activity_sedentary',
      'activity_lightly_active',
      'activity_moderately_active',
      'activity_very_active',
    ],
    async (ctx) => {
      let activityLevel: Activity = 'moderately_active';

      switch (ctx.callbackQuery.data) {
        case 'activity_sedentary':
          activityLevel = 'sedentary';
          break;
        case 'activity_lightly_active':
          activityLevel = 'lightly_active';
          break;
        case 'activity_moderately_active':
          activityLevel = 'moderately_active';
          break;
        case 'activity_very_active':
          activityLevel = 'very_active';
          break;
      }

      const session = getSession(ctx.from.id);

      session.editTempData.activity = activityLevel;

      await ctx.answerCallbackQuery();

      const user = await getUser(ctx.from.id);
      if (!user) throw new Error('Данные пользователя не найдены');

      const updatedUser = {
        ...user,
        weight: session.editTempData?.weight,
        activity: activityLevel,
        userId: ctx.from.id,
      };

      const bju = calculateBJU(updatedUser);

      await updateUser(ctx.from.id, {
        weight: session.editTempData?.weight,
        activity: activityLevel,
        lastBJU: {
          ...bju,
          lastBJUDate: new Date(),
        },
      });

      updateSession(ctx.from.id, {
        bjuStep: null,
        currentMenu: 'menu_main',
        editTempData: undefined,
      });

      await ctx.editMessageText(
        `🍏 Ваша рекомендуемая норма БЖУ:\n\n` +
          `⚖️ Калории: ${bju.calories} ккал\n` +
          `🥩 Белки: ${bju.proteins} г\n` +
          `🥑 Жиры: ${bju.fats} г\n` +
          `🍞 Углеводы: ${bju.carbs} г\n\n` +
          `Цель: ${GOAL_DICT[user.goal as Goal]}\n` +
          `Актуальный вес: ${session.editTempData?.weight} кг\n` +
          `Уровень активности: ${getActivityDescription(activityLevel)}`,
        { reply_markup: createMainMenu() }
      );
    }
  );

  bot.callbackQuery('cancel_edit', async (ctx) => {
    updateSession(ctx.from.id, {
      bjuStep: null,
      currentMenu: 'menu_main',
      editTempData: undefined,
    });
    await ctx.answerCallbackQuery();
    await ctx.editMessageText('Расчет БЖУ отменен', {
      reply_markup: createMainMenu(),
    });
  });
}

function getActivityDescription(activityLevel?: Activity): string {
  if (!activityLevel) return 'Не указано';

  const descriptions = {
    sedentary: '(1200) Сидячий образ жизни (мало или нет физической активности)',
    lightly_active: '(1375) Легкая активность (легкие упражнения 1-3 дня в неделю)',
    moderately_active:
      '(1550) Умеренная активность (умеренные упражнения 3-5 дней в неделю)',
    very_active:
      '(1725) Высокая активность (интенсивные упражнения 6-7 дней в неделю)',
  };

  return descriptions[activityLevel] || activityLevel;
}

function getActivityFactor(activityLevel?: Activity): number {
  if (!activityLevel) return 1.2;

  const factors = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725,
  };

  return factors[activityLevel] || 1.2;
}

function calculateBJU(user: User) {
  let bmr: number;
  if (user.gender === 'male') {
    bmr = 10 * user.weight! + 6.25 * user.height! - 5 * user.age! + 5;
  } else {
    bmr = 10 * user.weight! + 6.25 * user.height! - 5 * user.age! - 161;
  }

  const activityFactor = getActivityFactor(user.activity);
  const tdee = bmr * activityFactor;

  let calories: number;
  switch (user.goal) {
    case 'lose_weight':
      calories = tdee - 200;
      break;
    case 'gain_weight':
      calories = tdee + 200;
      break;
    case 'maintain_weight':
    default:
      calories = tdee;
  }

  let proteinK = 1.8;
  if (user.goal === 'lose_weight') {
    proteinK = 1.6;
  } else if (user.goal === 'gain_weight') {
    proteinK = 2.3;
  }

  const proteins = Math.round(user.weight! * proteinK * 10) / 10;
  const fatsK = 1;
  const fats = Math.round(user.weight! * fatsK * 10) / 10;

  let carbsK = 3;
  if (user.goal === 'lose_weight') {
    carbsK = 2;
  } else if (user.goal === 'gain_weight') {
    carbsK = 4;
  }

  const carbs = Math.round(user.weight! * carbsK * 10) / 10;

  return {
    calories: Math.round(calories),
    proteins: Math.round(proteins),
    fats: Math.round(fats),
    carbs: Math.round(carbs),
  };
}
