import { UserSession } from "@/types/types";
import { Context } from "grammy";

export async function deleteLastBotMessage(ctx: Context, session: UserSession, newMsgId: number) {
  if (session.lastBotMessageId) {
    await ctx.api.deleteMessage(ctx.chat!.id, session.lastBotMessageId);
  }
  session.lastBotMessageId = newMsgId;
}