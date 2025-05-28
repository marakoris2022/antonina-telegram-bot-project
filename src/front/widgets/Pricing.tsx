import { palette } from '@/styles/mixins';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  styled,
  keyframes,
  Badge,
} from '@mui/material';
import { WidgetContainer } from '../components/WidgetContainer';
import { motion } from 'framer-motion';

// Анимации
const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(236, 201, 75, 0.7); }
  70% { transform: scale(1.02); box-shadow: 0 0 0 10px rgba(236, 201, 75, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(236, 201, 75, 0); }
`;

const PopularBadge = styled(Badge)(() => ({
  '& .MuiBadge-badge': {
    backgroundColor: palette.secondary[500],
    color: palette.primary[700],
    fontWeight: 'bold',
    fontSize: '0.75rem',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    animation: `${pulse} 2s infinite`,
    top: '-10px',
    right: '-10px',
  },
}));

const FeatureItem = styled('li')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '0.75rem',
  '&:before': {
    content: '"✓"',
    color: palette.secondary[500],
    marginRight: '0.5rem',
    fontWeight: 'bold',
  },
});

const PriceHighlight = styled('span')({
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: '-2px',
    left: 0,
    width: '100%',
    height: '3px',
    background: `linear-gradient(90deg, ${palette.secondary[500]}, transparent)`,
    borderRadius: '2px',
  },
});

export function Pricing() {
  const plans = [
    {
      name: 'Базовый',
      price: '2 500грн',
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
      price: '4 200 грн',
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant='h3'
          component='h2'
          gutterBottom
          textAlign='center'
          color={palette.secondary[300]}
          sx={{
            textShadow: `0 2px 4px rgba(0,0,0,0.2)`,
            pb: 4,
          }}
        >
          Тарифы
        </Typography>
      </motion.div>

      <Grid container spacing={4} mt={4} justifyContent='center'>
        {plans.map((plan, index) => (
          <Grid key={index} sx={{ xs: 12, sm: 6, md: 5 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <PopularBadge
                badgeContent={plan.popular ? "ПОПУЛЯРНЫЙ ВЫБОР" : "НАЧАЛЬНЫЙ"}
                invisible={!plan.popular}
              >
                <Card
                  sx={{
                    height: '100%',
                    backgroundColor: palette.primary[500],
                    borderRadius: '12px',
                    boxShadow: plan.popular 
                      ? `0 10px 20px -5px ${palette.secondary[500]}44`
                      : '0 5px 15px -5px rgba(0,0,0,0.2)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: plan.popular 
                        ? `0 15px 30px -5px ${palette.secondary[500]}66`
                        : '0 10px 25px -5px rgba(0,0,0,0.3)',
                    },
                    position: 'relative',
                    overflow: 'hidden',
                    '&:before': plan.popular ? {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: `linear-gradient(90deg, ${palette.secondary[500]}, ${palette.secondary[300]})`,
                    } : {},
                  }}
                >
                  <CardContent
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      padding: '2rem',
                    }}
                  >
                    <Typography
                      variant='h4'
                      textAlign='center'
                      color={palette.secondary[200]}
                      sx={{
                        fontWeight: 'bold',
                        mb: 2,
                      }}
                    >
                      {plan.name}
                    </Typography>

                    <Box textAlign='center' my={2}>
                      <Typography
                        variant='h3'
                        component={PriceHighlight}
                        color={palette.secondary[500]}
                        sx={{
                          fontWeight: '800',
                          display: 'inline-block',
                        }}
                      >
                        {plan.price}
                      </Typography>
                      <Typography component='span' color={palette.primary[200]}>
                        /{plan.period}
                      </Typography>
                    </Box>

                    <Box 
                      flexGrow={1} 
                      component="ul"
                      sx={{
                        listStyle: 'none',
                        padding: 0,
                        mb: 3,
                      }}
                    >
                      {plan.features.map((feature, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                        >
                          <FeatureItem>
                            <Typography>{feature}</Typography>
                          </FeatureItem>
                        </motion.div>
                      ))}
                    </Box>

                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant='contained'
                        color='secondary'
                        size='large'
                        fullWidth
                        sx={{
                          mt: 2,
                          py: 1.5,
                          borderRadius: '8px',
                          fontWeight: 'bold',
                          fontSize: '1.1rem',
                          background: plan.popular 
                            ? `linear-gradient(135deg, ${palette.secondary[500]}, ${palette.secondary[300]})`
                            : undefined,
                          boxShadow: plan.popular 
                            ? `0 4px 15px ${palette.secondary[500]}66`
                            : undefined,
                        }}
                      >
                        Выбрать
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </PopularBadge>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </WidgetContainer>
  );
}