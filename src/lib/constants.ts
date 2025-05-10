import { Goal, Gender } from "@/types/types";

export const GOAL_DICT: Record<Goal, string> = {
    lose_weight: '📉 Похудение',
    gain_weight: '⚖️ Поддержание',
    maintain_weight: '📈 Набор массы',
  };
  
  export const GENDER_DICT: Record<Gender, string> = {
    male: '👨 Мужской',
    female: '👩 Женский',
  };