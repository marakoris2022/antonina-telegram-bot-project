import { Bot } from "grammy";
import { createMainMenu } from '../keyboards';
import { getUser } from "@/app/repositories/users";

export function setupCommandHandlers(bot: Bot) {
  bot.command('start', async (ctx) => {
    const user = await getUser(ctx.from!.id);
    
    await ctx.reply(`
      ${user ? 'Привет' : 'Здравствуйте'} ${ctx.from!.first_name},
      
      Добро пожаловать в AntoninaFitnessTrainerBot! 💪
      
      Здесь вы можете:
      🏋️‍♀️ Получать персональные тренировки
      🥗 Планировать питание
      📊 Отслеживать прогресс
    `, {
      reply_markup: createMainMenu(),
      parse_mode: 'HTML'
    });
  });
}