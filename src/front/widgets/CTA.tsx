import { palette } from '@/styles/mixins';
import { Typography, Button, Stack } from '@mui/material';
import { WidgetContainer } from '../components/WidgetContainer';

export function CTA() {
  return (
    <WidgetContainer>
      <Stack alignItems='center' spacing={4}>
        <Typography
          variant='h3'
          component='h2'
          textAlign='center'
          color={palette.secondary[100]}
        >
          Готовы изменить свое тело?
        </Typography>

        <Typography
          variant='h5'
          textAlign='center'
          color={palette.primary[100]}
        >
          Запишитесь на первую бесплатную тренировку!
        </Typography>

        <Button
          variant='contained'
          color='secondary'
          size='large'
          sx={{
            px: 6,
            py: 2,
            fontSize: '1.2rem',
          }}
        >
          Записаться сейчас
        </Button>

        <Typography color={palette.primary[200]} fontStyle='italic'>
          Осталось 3 места на этой неделе
        </Typography>
      </Stack>
    </WidgetContainer>
  );
}
