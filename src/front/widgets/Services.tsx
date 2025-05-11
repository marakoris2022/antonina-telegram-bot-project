import { palette } from '@/styles/mixins';
import {
  Typography,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { WidgetContainer } from '../components/WidgetContainer';

export function Services() {
  const services = [
    {
      title: 'Персональные тренировки',
      description: 'Индивидуальный подход в зале',
    },
    { title: 'Онлайн-коучинг', description: 'Программы тренировок и питания' },
    { title: 'Контроль БЖУ', description: 'Планы питания и консультации' },
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
        Услуги
      </Typography>
      <Grid container spacing={4}>
        {services.map((service, index) => (
          <Grid key={index}>
            <Card sx={{ backgroundColor: palette.primary[600] }}>
              <CardContent>
                <Typography variant='h5' color={palette.secondary[300]}>
                  {service.title}
                </Typography>
                <Typography>{service.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </WidgetContainer>
  );
}
