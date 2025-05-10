import { InlineKeyboard } from 'grammy';

export function createMainMenu() {
  return new InlineKeyboard()
    .text('Фитнес 🏋️', 'menu_fitness')
    .text('Питание 🥗', 'menu_nutrition')
    .text('Прогресс 📊', 'menu_progress')
    .row()
    .text('БЖУ 🍏', 'menu_bju')
    .row()
    .text('Ваш профиль', 'menu_about');
}

export function createFitnessMenu() {
  return new InlineKeyboard()
    .text('Силовая', 'workout_strength')
    .text('Кардио', 'workout_cardio')
    .row()
    .text('Назад ↩️', 'menu_main');
}

export function createNutritionMenu() {
  return new InlineKeyboard().text('Назад ↩️', 'menu_main');
}

export function createProgressMenu() {
  return new InlineKeyboard().text('Назад ↩️', 'menu_main');
}

export function createStrengthMenu() {
  return new InlineKeyboard().text('Назад ↩️', 'menu_main');
}

export function createCardioMenu() {
  return new InlineKeyboard().text('Назад ↩️', 'menu_main');
}

export function createAboutMeMenu() {
  return new InlineKeyboard()
    .text('Изменить данные', 'menu_edit_profile')
    .row()
    .text('Назад ↩️', 'menu_main');
}

export function createCancelKeyboard() {
  return new InlineKeyboard()
    .text('❌ Отменить', 'cancel_edit');
}

export function createGenderKeyboard() {
  return new InlineKeyboard()
    .text('Мужской', 'gender_male')
    .text('Женский', 'gender_female')
    .row()
    .text('❌ Отменить', 'cancel_edit');
}

export function createGoalKeyboard() {
  return new InlineKeyboard()
    .text('Похудение', 'goal_loss')
    .text('Поддержание', 'goal_maintain')
    .text('Набор массы', 'goal_gain')
    .row()
    .text('❌ Отменить', 'cancel_edit');
}
