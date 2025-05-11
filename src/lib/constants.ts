import { Goal, Gender, Activity } from "@/types/types";

export const GOAL_DICT: Record<Goal, string> = {
    lose_weight: '📉 Похудение',
    gain_weight: '📈 Набор массы',
    maintain_weight: '⚖️ Поддержание',
  };
  
  export const GENDER_DICT: Record<Gender, string> = {
    male: '👨 Мужской',
    female: '👩 Женский',
  };

  export const ACTIVITY_DICT: Record<Activity, string> = {
    sedentary: '1200',
    lightly_active: '1375',
    moderately_active: '1550',
    very_active: '1725',
  };