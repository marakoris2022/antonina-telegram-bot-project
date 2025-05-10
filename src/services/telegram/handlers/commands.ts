import { Bot } from "grammy";
import { createMainMenu } from '../keyboards';
import { getUser } from "@/app/repositories/users";
import { deleteLastBotMessage } from "@/utils/utils";
import { getSession } from "../session";

export function setupCommandHandlers(bot: Bot) {
  bot.command('start', async (ctx) => {
    const user = await getUser(ctx.from!.id);
    
    await deleteLastBotMessage(ctx, getSession(ctx.from!.id), ctx.message!.message_id);
        
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