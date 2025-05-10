import { createBot } from '@/services/telegram/core';
import { webhookCallback } from 'grammy';

export async function handleWebhook(request: Request) {
  try {
    return await webhookCallback(createBot(), 'std/http')(request);
  } catch (error) {
    console.error('Webhook processing error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}