import { palette } from '@/styles/mixins';
import { Typography, Grid, Box, Container, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

// Анимационные варианты
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: 'beforeChildren',
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export function Services() {
  const theme = useTheme();
  const services = [
    {
      title: 'Персональные тренировки',
      description: 'Индивидуальный подход в зале с профессиональным тренером',
      highlight: true,
      icon: '💪',
    },
    {
      title: 'Онлайн-коучинг',
      description: 'Персональные программы тренировок и питания удаленно',
      highlight: false,
      icon: '📱',
    },
    {
      title: 'Контроль БЖУ',
      description: 'Индивидуальные планы питания и регулярные консультации',
      highlight: false,
      icon: '🥗',
    },
  ];

  return (
      <Box
        sx={{
          background: `linear-gradient(135deg, ${palette.primary[100]} 0%, ${palette.primary[200]} 100%)`,
          py: 10,
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '300px',
            height: '300px',
            background: `radial-gradient(circle, ${palette.secondary[300]} 0%, transparent 70%)`,
            opacity: 0.3,
          },
        }}
      >
        <Container maxWidth='lg'>
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-50px' }}
            variants={containerVariants}
          >
            <Typography
              variant='h3'
              component='h2'
              gutterBottom
              textAlign='center'
              color={palette.primary[900]}
              sx={{
                mb: 6,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -12,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 80,
                  height: 4,
                  backgroundColor: palette.secondary[500],
                  borderRadius: 2,
                },
              }}
            >
              Мои услуги
            </Typography>

            <Grid container spacing={4} justifyContent='center'>
              {services.map((service, index) => (
                <Grid
                  sx={{
                    xs: 12,
                    md: 4,
                  }}
                  key={index}
                  component={motion.div}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                >
                  <Box
                    sx={{
                      p: 4,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 4,
                      backgroundColor: theme.palette.background.paper,
                      color: palette.primary[900],
                      boxShadow: theme.shadows[4],
                      transition: 'all 0.3s ease',
                      border: `1px solid ${theme.palette.divider}`,
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        boxShadow: theme.shadows[8],
                        transform: 'translateY(-5px)',
                      },
                      ...(service.highlight && {
                        borderTop: `4px solid ${palette.secondary[500]}`,
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          width: '100px',
                          height: '100px',
                          background: `radial-gradient(circle, ${palette.secondary[200]} 0%, transparent 70%)`,
                          opacity: 0.3,
                        },
                      }),
                    }}
                  >
                    <Typography
                      variant='h2'
                      sx={{
                        mb: 2,
                        fontSize: '3rem',
                        lineHeight: 1,
                      }}
                    >
                      {service.icon}
                    </Typography>
                    <Typography
                      variant='h4'
                      component='h3'
                      gutterBottom
                      sx={{
                        fontWeight: 700,
                        color: service.highlight
                          ? palette.secondary[500]
                          : palette.primary[900],
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '1.1rem',
                        color: palette.primary[700],
                        mb: 3,
                      }}
                    >
                      {service.description}
                    </Typography>

                    {service.highlight && (
                      <Box
                        sx={{
                          mt: 'auto',
                          py: 1,
                          px: 2,
                          backgroundColor: palette.secondary[100],
                          borderRadius: 1,
                          display: 'inline-block',
                          alignSelf: 'flex-start',
                        }}
                      >
                        <Typography
                          variant='body2'
                          sx={{
                            fontWeight: 600,
                            color: palette.secondary[700],
                          }}
                        >
                          Популярный выбор
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>
  );
}