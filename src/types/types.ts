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
  lastBotMessageId?: number;
};