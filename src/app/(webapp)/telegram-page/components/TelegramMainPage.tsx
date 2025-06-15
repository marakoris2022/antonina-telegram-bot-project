'use client';

import { useTelegram } from '@/providers/TelegramProvider';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Stack, 
  Divider, 
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  mainBackgroundColor, 
  textColorPrimary, 
  textColorSecondary,
  palette,
  mainBackgroundPaper
} from '@/styles/mixins';
import { LoaderOverlay } from '@/front/components/LoaderOverlay';
import { ErrorMessage } from '@/front/components/ErrorMessage';
import { useRouter } from 'next/navigation';

// Иконки (можно заменить на свои)
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import BarChartIcon from '@mui/icons-material/BarChart';

/**
 * Переработанная главная страница Telegram приложения
 */
export const TelegramMainPage = () => {
  const { user, isLoading, userData, webApp } = useTelegram();
  const router = useRouter();

  if (isLoading) {
    return <LoaderOverlay />;
  }

  if (!user) {
    return <ErrorMessage message="Пользователь не найден" />;
  }

  // Форматируем данные пользователя для отображения
  const formatUserData = () => {
    if (!userData) return 'Данные пользователя не загружены';
    
    try {
      return JSON.stringify(userData, null, 2);
    } catch (error) {
      console.error('Ошибка при форматировании данных:', error);
      return 'Ошибка при загрузке данных';
    }
  };

  // Навигация по разделам
  const navigateTo = (path: string) => {
    router.push(path);
  };

  // Кнопки быстрого доступа
  const quickActions = [
    { 
      icon: <PersonIcon />, 
      label: 'Профиль',
      path: '/profile-page',
      color: 'primary'
    },
    { 
      icon: <BarChartIcon />, 
      label: 'Статистика',
      path: '/stats-page',
      color: 'secondary'
    },
    { 
      icon: <SettingsIcon />, 
      label: 'Настройки',
      path: '/settings-page',
      color: 'default'
    },
  ];

  return (
    <Box
      sx={{
        background: mainBackgroundColor,
        minHeight: '100vh',
        p: 2,
      }}
    >
      {/* Шапка */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: textColorPrimary }}>
          Fitness App
        </Typography>
        <Chip 
          label={`ID: ${user.id}`} 
          size="small"
          sx={{ bgcolor: palette.primary[800], color: textColorPrimary }}
        />
      </Box>

      {/* Быстрый доступ */}
      <Paper 
        sx={{ 
          p: 2, 
          mb: 3, 
          bgcolor: mainBackgroundPaper,
          borderRadius: 2
        }}
      >
        <Typography variant="subtitle2" sx={{ mb: 2, color: textColorSecondary }}>
          Быстрый доступ
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          {quickActions.map((action) => (
            <Tooltip key={action.path} title={action.label} arrow>
              <IconButton 
                onClick={() => navigateTo(action.path)}
                sx={{ 
                  flexDirection: 'column',
                  color: palette.primary[300],
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                {action.icon}
                <Typography variant="caption" sx={{ mt: 0.5, color: textColorSecondary }}>
                  {action.label}
                </Typography>
              </IconButton>
            </Tooltip>
          ))}
        </Box>
      </Paper>

      {/* Основной контент */}
      <Paper 
        sx={{ 
          p: 2, 
          mb: 2, 
          bgcolor: mainBackgroundPaper,
          borderRadius: 2
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: textColorPrimary }}>
          Добро пожаловать, {user.first_name || 'Пользователь'}!
        </Typography>
        
        <Typography variant="body2" sx={{ mb: 2, color: textColorSecondary }}>
          {user.username && `@${user.username} • `}
          {new Date().toLocaleDateString('ru-RU', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="subtitle2" sx={{ mb: 1, color: textColorSecondary }}>
          Ваши данные:
        </Typography>
        
        <Box 
          component="pre" 
          sx={{ 
            p: 2, 
            bgcolor: palette.primary[900], 
            borderRadius: 1,
            overflow: 'auto',
            fontSize: '0.75rem',
            color: palette.primary[200],
            maxHeight: 200,
            fontFamily: 'monospace'
          }}
        >
          {formatUserData()}
        </Box>
      </Paper>
      
      {/* Дополнительные действия */}
      <Stack spacing={1}>
        <Button 
          variant="outlined" 
          fullWidth 
          onClick={() => webApp?.openTelegramLink('https://t.me/antonyusik')}
          sx={{ mt: 1 }}
        >
          Написать в поддержку
        </Button>
      </Stack>
    </Box>
  );
};
