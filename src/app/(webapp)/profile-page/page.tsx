'use client';

import { useTelegram } from '@/providers/TelegramProvider';
import { LoaderOverlay } from '@/front/components/LoaderOverlay';
import { ErrorMessage } from '@/front/components/ErrorMessage';
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Button,
  Divider,
  Chip,
} from '@mui/material';
import {
  mainBackgroundColor,
  mainBackgroundPaper,
  textColorPrimary,
  textColorSecondary,
} from '@/styles/mixins';
import Link from 'next/link';

/**
 * Страница профиля пользователя
 */
export default function ProfilePage() {
  const { user, userData, userPhotoUrl, isLoading } = useTelegram();

  if (isLoading) {
    return <LoaderOverlay />;
  }

  if (!user || !userData) {
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
        {userPhotoUrl ? (
          <Box
            component='img'
            src={userPhotoUrl}
            alt='Аватар'
            sx={{
              width: 100,
              height: 100,
              mx: 'auto',
              mb: 2,
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid',
              borderColor: 'primary.main',
            }}
          />
        ) : (
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
        )}

        <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 1 }}>
          {user.first_name || 'Пользователь'} {user.last_name || ''}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            width: '100%',
          }}
        >
          {user.username && (
            <Typography variant='body2' color={textColorSecondary}>
              @{user.username}
            </Typography>
          )}

          <Chip
            size='small'
            label={userData.role || 'user'}
            color='secondary'
          />
        </Box>
      </Box>

      <Paper sx={{ p: 2, mb: 2, bgcolor: mainBackgroundPaper }}>
        <Typography
          variant='subtitle1'
          sx={{ mb: 2, fontWeight: 'medium', color: textColorPrimary }}
        >
          Информация о профиле
        </Typography>

        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant='caption' color={textColorSecondary}>
            ID пользователя
          </Typography>
          <Typography color={textColorPrimary} variant='body1'>
            {user.id}
          </Typography>
        </Box>

        {user.language_code && (
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant='caption' color={textColorSecondary}>
              Язык
            </Typography>
            <Typography color={textColorPrimary} variant='body1'>
              {user.language_code.toUpperCase()}
            </Typography>
          </Box>
        )}

        <Divider sx={{ my: 2 }} />

        <Link href='/settings-page'>
          <Button variant='outlined' fullWidth sx={{ mb: 1 }}>
            Редактировать профиль
          </Button>
        </Link>
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
