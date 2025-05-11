import { palette } from '@/styles/mixins';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { WidgetContainer } from '../components/WidgetContainer';

export function Pricing() {
  const plans = [
    {
      name: 'Базовый',
      price: '5 000 ₽',
      period: 'месяц',
      features: [
        '3 тренировки в неделю',
        'Общий чат',
        'Доступ к базе упражнений',
      ],
      popular: false,
    },
    {
      name: 'Премиум',
      price: '10 000 ₽',
      period: 'месяц',
      features: [
        '5 тренировок в неделю',
        'Индивидуальный план',
        'Коррекция питания',
        'Поддержка 24/7',
      ],
      popular: true,
    },
  ];

  return (
    <WidgetContainer>
      <Typography
        variant='h3'
        component='h2'
        gutterBottom
        textAlign='center'
        color={palette.secondary[300]}
      >
        Тарифы
      </Typography>

      <Grid container spacing={4} mt={4} justifyContent='center'>
        {plans.map((plan, index) => (
          <Grid key={index}>
            <Card
              sx={{
                height: '100%',
                border: plan.popular ? '2px solid' : undefined,
                borderColor: plan.popular ? 'secondary.500' : undefined,
                backgroundColor: palette.primary[500],
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                {plan.popular && (
                  <Typography
                    color={palette.secondary[500]}
                    fontWeight='bold'
                    textAlign='center'
                    mb={1}
                  >
                    ПОПУЛЯРНЫЙ ВЫБОР
                  </Typography>
                )}

                <Typography
                  variant='h4'
                  textAlign='center'
                  color={palette.secondary[200]}
                >
                  {plan.name}
                </Typography>

                <Box textAlign='center' my={2}>
                  <Typography
                    variant='h3'
                    component='span'
                    color={palette.secondary[500]}
                  >
                    {plan.price}
                  </Typography>
                  <Typography component='span' color={palette.primary[200]}>
                    /{plan.period}
                  </Typography>
                </Box>

                <Box flexGrow={1}>
                  {plan.features.map((feature, i) => (
                    <Typography key={i} paragraph sx={{ mb: 1 }}>
                      ✓ {feature}
                    </Typography>
                  ))}
                </Box>

                <Button
                  variant='contained'
                  color='secondary'
                  size='large'
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Выбрать
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </WidgetContainer>
  );
}
