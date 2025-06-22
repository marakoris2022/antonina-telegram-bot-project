'use client';

import { useTelegram } from '@/providers/TelegramProvider';
import { Box, Typography, Paper, Button } from '@mui/material';
import CustomTextField from '../../../components/CustomTextField';
import CustomSelect from '../../../components/CustomSelect';
import {
  mainBackgroundColor,
  mainBackgroundPaper,
  textColorPrimary,
  textColorSecondary,
} from '@/styles/mixins';
import { LoaderOverlay } from '@/front/components/LoaderOverlay';
import { ErrorMessage } from '@/front/components/ErrorMessage';
import { useFormik } from 'formik';
import { settingsSchema } from '@/validation/settingsSchema';
import { userApi } from '@/services/api';
import { Gender, Goal } from '@/types/types';

/**
 * Страница настроек приложения
 */
export default function SettingsPage() {
  const { userData, isLoading, updateUser } = useTelegram();
  // Состояния компонента

  const formik = useFormik({
    initialValues: {
      firstName: userData?.firstName || '',
      lastName: userData?.lastName || '',
      age: userData?.age || '',
      gender: userData?.gender || '',
      goal: userData?.goal || '',
      weight: userData?.weight || '',
      height: userData?.height || '',
      phoneNumber: userData?.phoneNumber || '',
      email: userData?.email || '',
    },
    validationSchema: settingsSchema,
    onSubmit: async (values) => {
      await formik.validateForm();
      if (!userData?.userId) {
        return;
      }

      const payload = {
        userId: userData.userId,
        firstName: values.firstName,
        lastName: values.lastName,
        age: Number(values.age),
        gender: values.gender as Gender,
        goal: values.goal as Goal,
        weight: Number(values.weight),
        height: Number(values.height),
        phoneNumber: values.phoneNumber,
        email: values.email,
      };

      if (formik.isValid) {
        try {
          const response = await userApi.update(userData.userId, payload);
          console.log(response);
          updateUser(payload);
        } catch (error) {
          console.error(error);
        }
      }
    },
  });

  // Проверка загрузки и авторизации
  if (isLoading) {
    return <LoaderOverlay />;
  }

  if (!userData) {
    return <ErrorMessage message='Пользователь не найден' />;
  }

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: mainBackgroundColor,
        minHeight: '100vh',
        color: textColorPrimary,
      }}
    >
      <Typography variant='h5' sx={{ mb: 3, fontWeight: 'bold' }}>
        Настройки
      </Typography>

      <Paper sx={{ p: 2, mb: 2, bgcolor: mainBackgroundPaper }}>
        <Typography
          variant='subtitle1'
          sx={{ mb: 2, fontWeight: 'medium', color: textColorPrimary }}
        >
          Личные данные
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <CustomTextField
            placeholder='Имя'
            value={formik.values.firstName}
            onChange={(e) => formik.setFieldValue('firstName', e.target.value)}
            error={Boolean(formik.errors.firstName)}
            helperText={formik.errors.firstName}
          />
          <CustomTextField
            type='text'
            placeholder='Фамилия'
            value={formik.values.lastName}
            onChange={(e) => formik.setFieldValue('lastName', e.target.value)}
            error={Boolean(formik.errors.lastName)}
            helperText={formik.errors.lastName}
          />
          <CustomTextField
            type='number'
            placeholder='Возраст'
            value={formik.values.age}
            onChange={(e) => formik.setFieldValue('age', e.target.value)}
            error={Boolean(formik.errors.age)}
            helperText={formik.errors.age}
          />
          <CustomSelect
            label='Пол'
            value={formik.values.gender}
            onChange={(e) => formik.setFieldValue('gender', e.target.value)}
            error={Boolean(formik.errors.gender)}
            helperText={formik.errors.gender}
            items={[
              { value: 'male', label: 'Мужской' },
              { value: 'female', label: 'Женский' },
            ]}
          />
          <CustomSelect
            label='Цель'
            value={formik.values.goal}
            onChange={(e) => formik.setFieldValue('goal', e.target.value)}
            error={Boolean(formik.errors.goal)}
            helperText={formik.errors.goal}
            items={[
              { value: 'lose_weight', label: 'Потерять вес' },
              { value: 'gain_weight', label: 'Набрать массу' },
              { value: 'maintain_weight', label: 'Поддержать вес' },
            ]}
          />
          <CustomTextField
            placeholder='Ваш текущий вес'
            type='number'
            value={formik.values.weight}
            onChange={(e) => formik.setFieldValue('weight', e.target.value)}
            error={Boolean(formik.errors.weight)}
            helperText={formik.errors.weight}
          />
          <CustomTextField
            placeholder='Ваш рост'
            type='number'
            value={formik.values.height}
            onChange={(e) => formik.setFieldValue('height', e.target.value)}
            error={Boolean(formik.errors.height)}
            helperText={formik.errors.height}
          />
          <CustomTextField
            type='tel'
            placeholder='Телефон (не обязательно)'
            value={formik.values.phoneNumber}
            onChange={(e) =>
              formik.setFieldValue('phoneNumber', e.target.value)
            }
            error={Boolean(formik.errors.phoneNumber)}
            helperText={formik.errors.phoneNumber}
          />
          <CustomTextField
            type='email'
            placeholder='Email (не обязательно)'
            value={formik.values.email}
            onChange={(e) => formik.setFieldValue('email', e.target.value)}
            error={Boolean(formik.errors.email)}
            helperText={formik.errors.email}
          />

          <Button
            disabled={!formik.isValid}
            variant='outlined'
            color='secondary'
            onClick={() => formik.handleSubmit()}
          >
            Сохранить
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 2, bgcolor: mainBackgroundPaper }}>
        <Typography
          variant='subtitle1'
          sx={{ mb: 2, fontWeight: 'medium', color: textColorPrimary }}
        >
          О приложении
        </Typography>
        <Typography variant='body2' color={textColorSecondary}>
          Версия 1.0.0
        </Typography>
      </Paper>
    </Box>
  );
}
