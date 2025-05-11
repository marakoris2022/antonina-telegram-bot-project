import { palette } from '@/styles/mixins';
import { Typography } from '@mui/material';
import { WidgetContainer } from '@/front/components/WidgetContainer';

export function About() {
  return (
    <WidgetContainer>
      <Typography
        variant='h3'
        component='h2'
        gutterBottom
        textAlign='center'
        color={palette.secondary[500]}
      >
        Обо мне
      </Typography>
      <Typography paragraph>
        Профессиональный тренер с 10-летним опытом. Специализация: похудение,
        набор мышечной массы, функциональный тренинг.
      </Typography>
    </WidgetContainer>
  );
}
