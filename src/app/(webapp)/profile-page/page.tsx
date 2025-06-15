'use client';

import { useTelegram } from '@/providers/TelegramProvider';
import { LoaderOverlay } from '@/front/components/LoaderOverlay';
import { ErrorMessage } from '@/front/components/ErrorMessage';
import { Box, Typography, Avatar, Paper, Button, Divider } from '@mui/material';
import {
  mainBackgroundColor,
  mainBackgroundPaper,
  textColorPrimary,
  textColorSecondary,
} from '@/styles/mixins';

/**
 * Страница профиля пользователя
 */
export default function ProfilePage() {
  const { user, isLoading } = useTelegram();

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
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Avatar
          sx={{
            width: 100,
            height: 100,
            mx: 'auto',
            mb: 2,
            bgcolor: 'primary.main',
            fontSize: '2.5rem',
          }}
        >
          {user.first_name?.[0] || 'П'}
        </Avatar>

        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
          {user.first_name || 'Пользователь'} {user.last_name || ''}
        </Typography>

        {user.username && (
          <Typography variant='body2' color={textColorSecondary}>
            @{user.username}
          </Typography>
        )}
      </Box>

      <Paper sx={{ p: 2, mb: 2, bgcolor: mainBackgroundPaper }}>
        <Typography
          variant='subtitle1'
          sx={{ mb: 2, fontWeight: 'medium', color: textColorPrimary }}
        >
          Информация о профиле
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant='caption' color={textColorSecondary}>
            ID пользователя
          </Typography>
          <Typography color={textColorPrimary} variant='body1'>
            {user.id}
          </Typography>
        </Box>

        {user.language_code && (
          <Box sx={{ mb: 2 }}>
            <Typography variant='caption' color={textColorSecondary}>
              Язык
            </Typography>
            <Typography color={textColorPrimary} variant='body1'>
              {user.language_code.toUpperCase()}
            </Typography>
          </Box>
        )}

        <Divider sx={{ my: 2 }} />

        <Button variant='outlined' fullWidth sx={{ mt: 2 }}>
          Редактировать профиль
        </Button>
      </Paper>

      <Paper sx={{ p: 2, bgcolor: mainBackgroundPaper }}>
        <Typography
          variant='subtitle1'
          sx={{ mb: 2, fontWeight: 'medium', color: textColorPrimary }}
        >
          Действия
        </Typography>

        <Button variant='outlined' color='error' fullWidth sx={{ mb: 1 }}>
          Выйти
        </Button>
      </Paper>
    </Box>
  );
}
