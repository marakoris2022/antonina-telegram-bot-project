import { Typography, Grid, Box } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { palette } from '@/styles/mixins';
import { WidgetContainer } from '../components/WidgetContainer';
import { motion } from 'framer-motion';

// Анимационные варианты
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export function Benefits() {
  const benefits = [
    {
      icon: <FitnessCenterIcon fontSize='large' />,
      title: 'Индивидуальный подход',
      text: 'Программа под ваш уровень и цели',
    },
    {
      icon: <RestaurantIcon fontSize='large' />,
      title: 'Питание',
      text: 'Персональный расчет БЖУ и планы питания',
    },
    {
      icon: <ScheduleIcon fontSize='large' />,
      title: 'Гибкий график',
      text: 'Занимайтесь в удобное время',
    },
  ];

  return (
    <WidgetContainer bgColor={palette.primary[700]}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        <Typography
          variant='h3'
          component='h2'
          gutterBottom
          textAlign='center'
          color={palette.secondary[400]}
          sx={{
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -12,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 80,
              height: 4,
              backgroundColor: palette.secondary[400],
              borderRadius: 2
            }
          }}
        >
          Почему выбирают меня
        </Typography>

        <Grid container spacing={4} mt={6}>
          {benefits.map((item, index) => (
            <Grid 
              size={{ xs: 12, md: 4 }}
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
                  alignItems: 'center',
                  textAlign: 'center',
                  borderRadius: 2,
                  backgroundColor: palette.primary[600],
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: `0 10px 25px rgba(0, 0, 0, 0.2)`,
                    backgroundColor: palette.primary[500]
                  }
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: palette.secondary[500],
                    borderRadius: '50%',
                    color: palette.primary[100],
                    mb: 3
                  }}
                >
                  {item.icon}
                </Box>
                <Typography 
                  variant='h5' 
                  color={palette.primary[100]}
                  gutterBottom
                  sx={{ fontWeight: 600 }}
                >
                  {item.title}
                </Typography>
                <Typography color={palette.primary[200]}>
                  {item.text}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </WidgetContainer>
  );
}