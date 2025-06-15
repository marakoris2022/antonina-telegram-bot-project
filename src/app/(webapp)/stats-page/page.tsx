'use client';

import { useTelegram } from '@/providers/TelegramProvider';
import { Box, Typography, Paper } from '@mui/material';
import {
  mainBackgroundColor,
  textColorPrimary,
  textColorSecondary,
  palette,
  mainBackgroundPaper,
} from '@/styles/mixins';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';
import { LoaderOverlay } from '@/front/components/LoaderOverlay';
import { ErrorMessage } from '@/front/components/ErrorMessage';

// Временные данные для графика
// const data = [
//   { name: 'Пн', value: 65 },
//   { name: 'Вт', value: 59 },
//   { name: 'Ср', value: 80 },
//   { name: 'Чт', value: 81 },
//   { name: 'Пт', value: 56 },
//   { name: 'Сб', value: 55 },
//   { name: 'Вс', value: 40 },
// ];

/**
 * Страница статистики
 */
export default function StatsPage() {
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
      <Typography variant='h5' sx={{ mb: 3, fontWeight: 'bold' }}>
        Статистика
      </Typography>

      <Paper sx={{ p: 2, mb: 2, bgcolor: mainBackgroundPaper }}>
        <Typography
          variant='subtitle1'
          sx={{ mb: 2, fontWeight: 'medium', color: textColorPrimary }}
        >
          Активность за неделю
        </Typography>

        {/* <Box sx={{ height: 250, width: '100%' }}>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray='3 3' vertical={false} />
              <XAxis
                dataKey='name'
                axisLine={false}
                tickLine={false}
                tick={{ fill: textColorSecondary, fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: textColorSecondary, fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: palette.primary[800],
                  border: 'none',
                  borderRadius: 4,
                }}
              />
              <Line
                type='monotone'
                dataKey='value'
                stroke={palette.primary[300]}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box> */}
      </Paper>

      <Box
        sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}
      >
        <Paper sx={{ p: 2, bgcolor: mainBackgroundPaper }}>
          <Typography
            variant='body2'
            color={textColorSecondary}
            sx={{ fontWeight: 'medium' }}
          >
            Всего сессий
          </Typography>
          <Typography
            variant='h5'
            sx={{ fontWeight: 'bold', color: textColorPrimary }}
          >
            24
          </Typography>
        </Paper>

        <Paper sx={{ p: 2, bgcolor: mainBackgroundPaper }}>
          <Typography
            variant='body2'
            color={textColorSecondary}
            sx={{ fontWeight: 'medium' }}
          >
            Среднее время
          </Typography>
          <Typography
            variant='h5'
            sx={{ fontWeight: 'bold', color: textColorPrimary }}
          >
            45 мин
          </Typography>
        </Paper>
      </Box>

      <Paper sx={{ p: 2, bgcolor: mainBackgroundPaper }}>
        <Typography
          variant='subtitle1'
          sx={{ mb: 2, fontWeight: 'medium', color: textColorPrimary }}
        >
          Достижения
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1 }}>
          {[1, 2, 3].map((item) => (
            <Box
              key={item}
              sx={{
                flex: '0 0 auto',
                width: 100,
                height: 100,
                bgcolor: palette.primary[800],
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 1,
                textAlign: 'center',
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: palette.primary[300],
                  borderRadius: '50%',
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: palette.primary[900],
                  fontWeight: 'bold',
                }}
              >
                {item}
              </Box>
              <Typography
                variant='caption'
                sx={{ fontSize: 10, color: textColorSecondary }}
              >
                Достижение {item}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}
