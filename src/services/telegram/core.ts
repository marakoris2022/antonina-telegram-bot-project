import { Bot } from 'grammy';
import { setupTextHandlers } from './handlers/text';
import { setupCommandHandlers } from './handlers/commands';
import { setupButtonHandlers } from './handlers/buttons';
import { setupProfileHandlers } from './handlers/editProfile';

export function createBot() {
  const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);
  
  setupCommandHandlers(bot);
  setupButtonHandlers(bot);
  setupProfileHandlers(bot);
  setupTextHandlers(bot);
  
  return bot;
}