import { Typography, Grid, Stack } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { palette } from '@/styles/mixins';
import { WidgetContainer } from '../components/WidgetContainer';

export function Benefits() {
  const benefits = [
    {
      icon: <FitnessCenterIcon fontSize='large' color='secondary' />,
      title: 'Индивидуальный подход',
      text: 'Программа под ваш уровень и цели',
    },
    {
      icon: <RestaurantIcon fontSize='large' color='secondary' />,
      title: 'Питание',
      text: 'Персональный расчет БЖУ и планы питания',
    },
    {
      icon: <ScheduleIcon fontSize='large' color='secondary' />,
      title: 'Гибкий график',
      text: 'Занимайтесь в удобное время',
    },
  ];

  return (
    <WidgetContainer>
      <Typography
        variant='h3'
        component='h2'
        gutterBottom
        textAlign='center'
        color={palette.secondary[400]}
      >
        Почему выбирают меня
      </Typography>

      <Grid container spacing={4} mt={4}>
        {benefits.map((item, index) => (
          <Grid key={index}>
            <Stack alignItems='center' spacing={2}>
              {item.icon}
              <Typography variant='h5' color={palette.secondary[300]}>
                {item.title}
              </Typography>
              <Typography textAlign='center'>{item.text}</Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </WidgetContainer>
  );
}
