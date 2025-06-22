import * as yup from 'yup';

export const settingsSchema = yup.object({
  firstName: yup
    .string()
    .required('Имя обязательно')
    .min(2, 'Минимальная длина 2 символа')
    .max(20, 'Максимальная длина 20 символов'),
  lastName: yup
    .string()
    .required('Фамилия обязательно')
    .min(2, 'Минимальная длина 2 символа')
    .max(20, 'Максимальная длина 20 символов'),
  age: yup
    .number()
    .required('Возраст обязательно')
    .min(12, 'Минимальный возраст 12 лет')
    .max(80, 'Максимальный возраст 80 лет'),
  gender: yup.string().required('Пол обязательно'),
  goal: yup.string().required('Цель обязательно'),
  weight: yup
    .number()
    .required('Вес обязательно')
    .min(40, 'Минимальный вес 40 кг')
    .max(200, 'Максимальный вес 200 кг'),
  height: yup
    .number()
    .required('Рост обязательно')
    .min(120, 'Минимальный рост 120 см')
    .max(250, 'Максимальный рост 250 см'),
});
