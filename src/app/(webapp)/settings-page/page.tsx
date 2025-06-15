'use client';

import { useState } from 'react';
import { useTelegram } from '@/providers/TelegramProvider';
import {
  Box,
  Typography,
  Paper,
  Switch,
  FormControlLabel,
  Divider,
} from '@mui/material';
import {
  mainBackgroundColor,
  mainBackgroundPaper,
  textColorPrimary,
  textColorSecondary,
} from '@/styles/mixins';
import { LoaderOverlay } from '@/front/components/LoaderOverlay';
import { ErrorMessage } from '@/front/components/ErrorMessage';

/**
 * Страница настроек приложения
 */
export default function SettingsPage() {
  const { user, theme, isLoading } = useTelegram();
  // Состояния компонента
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(theme === 'dark');

  // Проверка загрузки и авторизации
  if (isLoading) {
    return <LoaderOverlay />;
  }

  if (!user) {
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
          Уведомления
        </Typography>

        <FormControlLabel
          control={
            <Switch
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              color='primary'
            />
          }
          label='Получать уведомления'
          sx={{ color: textColorSecondary }}
        />

        <Divider sx={{ my: 2 }} />

        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
              color='primary'
            />
          }
          label='Тёмная тема'
          sx={{ color: textColorSecondary }}
        />
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
