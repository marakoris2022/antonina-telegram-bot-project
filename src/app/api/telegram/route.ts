import { createUser, getUser } from '@/app/api/telegram/actions';
import { Bot, webhookCallback } from 'grammy';

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);

bot.command('start', async (ctx) => {
  const user = ctx.update.message?.from;

  if (user) {
    const userFromDB = await getUser(user.id);

    if (!userFromDB) {
      try {
        await createUser({
          userId: user.id,
          username: user.username || '',
          firstName: user.first_name || '',
          lastName: user.last_name || '',
          userLang: user.language_code || '',
        });
      } catch (error) {
        console.error('Error creating user:', error);
      }
    }

    await ctx.reply(
      `✨ Привет${userFromDB ? ' снова' : ''}, ${
        user.first_name || 'друг'
      }! ✨\n\n` +
        `Рады ${
          userFromDB ? 'видеть тебя снова' : 'познакомиться'
        } в Antonina Fitness – месте, где \n` +
        `каждая тренировка приносит радость, а прогресс становится образом жизни 💪\n\n` +
        `${
          userFromDB
            ? 'Твой тренер скучал! Готовы продолжить?'
            : 'Давай начнём твой фитнес-путь вместе!'
        }`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: userFromDB
                  ? '🚀 Продолжить путь'
                  : '🌟 Начать путешествие',
                web_app: { url: process.env.NEXT_PUBLIC_WEBAPP_URL! },
              },
            ],
            [
              {
                text: '💌 Написать тренеру',
                url: 'https://t.me/antonyusik',
              },
            ],
          ],
        },
        parse_mode: 'HTML',
      }
    );
  }
});

bot.on('message:text', async (ctx) => {
  const warmReplies = [
    'Открываю дверь в ваш фитнес-мир... 🌈',
    'Один момент, готовлю для вас что-то особое... ✨',
    'Антонина уже ждёт вас! Открываю приложение... 💖',
  ];

  await ctx.reply(warmReplies[Math.floor(Math.random() * warmReplies.length)], {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '🏋️‍♀️ Войти в приложение',
            web_app: { url: process.env.NEXT_PUBLIC_WEBAPP_URL! },
          },
        ],
        // [
        //   {
        //     text: '👋 Получить приветственный подарок',
        //     callback_data: 'welcome_gift',
        //   },
        // ],
      ],
    },
  });
});

// bot.callbackQuery('welcome_gift', async (ctx) => {
//   try {
//     await ctx.answerCallbackQuery({ 
//       text: '🔄 Готовим ваш подарок...' 
//     }).catch(e => console.log("Already answered"));

//     const user = await getUser(ctx.from.id).catch(() => null);
    
//     if (user?.gift_claimed) {
//       await ctx.editMessageText('🎁 Вы уже получили подарок ранее!');
//       return;
//     }

//     await ctx.replyWithPhoto('https://example.com/gift.jpg', {
//       caption: `🎉 ${ctx.from.first_name}, ваш подарок!`
//     });

//     await updateUser(ctx.from.id, { gift_claimed: true });
    
//   } catch (error) {
//     console.error('Gift error:', error);
//     await ctx.reply('⚠️ Не удалось загрузить подарок. Попробуйте позже или напишите тренеру @AntoninaCoach');
//   }
// });

bot.api.setChatMenuButton({
  menu_button: {
    type: 'web_app',
    text: 'Мой Фитнес-Друг', // вместо "Fitness App"
    web_app: { url: process.env.NEXT_PUBLIC_WEBAPP_URL! },
  },
});

export async function POST(request: Request) {
  try {
    const handler = webhookCallback(bot, 'std/http');
    const response = await handler(request);
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  } catch (error) {
    console.error('Error:', error);
    return new Response('Server Error', { status: 500 });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
    },
  });
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
