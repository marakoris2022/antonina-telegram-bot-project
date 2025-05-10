export type CurrentMenu =
  | 'menu_main'
  | 'menu_fitness'
  | 'menu_nutrition'
  | 'menu_progress'
  | 'workout_strength'
  | 'workout_cardio'
  | 'menu_about'
  | 'menu_edit_profile'
  | 'menu_bju';
export type WorkoutType = 'strength' | 'cardio';
export type EditProfileState =
  | 'editing_age'
  | 'editing_gender'
  | 'editing_goal'
  | 'editing_weight'
  | 'editing_height'
  | 'editing_phone'
  | 'editing_email';

export type Goal = 'lose_weight' | 'gain_weight' | 'maintain_weight';
export type Gender = 'male' | 'female';

export type User = {
  userId: number;
  firstName?: string;
  lastName?: string;
  age?: number;
  gender?: Gender;
  goal?: Goal;
  weight?: number;
  height?: number;
  phoneNumber?: string;
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type UserSession = {
  currentMenu?: CurrentMenu;
  workoutType?: WorkoutType | null;
  editProfile?: EditProfileState | null;
  editTempData: Partial<User>;
  waitingForWeight?: boolean;
};

export const GOAL_DICT: Record<Goal, string> = {
  lose_weight: '📉 Похудение',
  gain_weight: '⚖️ Поддержание',
  maintain_weight: '📈 Набор массы',
};

export const GENDER_DICT: Record<Gender, string> = {
  male: '👨 Мужской',
  female: '👩 Женский',
};

const sessions = new Map<number, UserSession>();

export function getSession(userId: number): UserSession {
  if (!sessions.has(userId)) {
    sessions.set(userId, {
      editProfile: null,
      currentMenu: 'menu_main',
      workoutType: null,
      editTempData: {
        userId,
      },
    });
  }
  return sessions.get(userId)!;
}

export function updateSession(userId: number, update: Partial<UserSession>) {
  const session = getSession(userId);
  sessions.set(userId, { ...session, ...update });
}

export function clearSession(userId: number) {
  sessions.delete(userId);
}
