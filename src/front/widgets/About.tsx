import { palette } from '@/styles/mixins';
import { Typography, Box, Grid, Avatar } from '@mui/material';
import { WidgetContainer } from '@/front/components/WidgetContainer';
import { motion } from 'framer-motion';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

const TRAINER_PHOTO = '/assets/images/trainer-photo.jpg';

// Анимационные варианты
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6
    }
  }
};

const photoVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export function About() {
  const skills = [
    {
      icon: <FitnessCenterIcon fontSize="large" />,
      title: "Силовые тренировки",
      description: "Эффективные программы для набора мышечной массы"
    },
    {
      icon: <MonitorWeightIcon fontSize="large" />,
      title: "Похудение",
      description: "Комплексный подход к снижению веса"
    },
    {
      icon: <DirectionsRunIcon fontSize="large" />,
      title: "Функциональный тренинг",
      description: "Улучшение физической формы и выносливости"
    }
  ];

  return (
    <WidgetContainer bgColor={palette.primary[800]}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <Typography
            variant='h3'
            component='h2'
            gutterBottom
            textAlign='center'
            color={palette.secondary[500]}
            sx={{
              mb: 6,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -16,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '4px',
                background: palette.secondary[500],
                borderRadius: '2px'
              }
            }}
          >
            Обо мне
          </Typography>
        </motion.div>

        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 5 }}>
            <motion.div 
              variants={photoVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Box
                sx={{
                  position: 'relative',
                  height: { xs: '300px', md: '400px' },
                  width: { xs: '300px', md: '400px' },
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: `0 10px 30px rgba(0, 0, 0, 0.3)`,
                  mx: 'auto',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(to bottom, transparent 60%, ${palette.primary[900]})`,
                    zIndex: 1
                  }
                }}
              >
                <Avatar
                  src={TRAINER_PHOTO}
                  alt="Фото тренера"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </Box>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <motion.div variants={itemVariants}>
              <Typography
                variant="h4"
                component="h3"
                color={palette.primary[100]}
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                Привет, я Антонина Никонорова
              </Typography>
              
              <Typography paragraph sx={{ mb: 3, fontSize: '1.1rem' }}>
                Профессиональный тренер с 10-летним опытом работы в индустрии фитнеса и 
                спортивной подготовки. Моя миссия - помочь вам достичь идеальной формы 
                через научно обоснованные методики тренировок и питания.
              </Typography>
              
              <Typography paragraph sx={{ mb: 4, fontSize: '1.1rem' }}>
                Сертифицированный специалист в области персонального тренинга, 
                спортивной диетологии и функционального тренинга. Работал с клиентами 
                разных уровней подготовки - от новичков до профессиональных атлетов.
              </Typography>
            </motion.div>
          </Grid>
        </Grid>

        {/* Секция специализаций под основным блоком */}
        <Box sx={{ mt: 8 }}>
          <motion.div variants={itemVariants}>
            <Typography
              variant="h4"
              component="h3"
              color={palette.secondary[400]}
              gutterBottom
              textAlign="center"
              sx={{ mb: 6 }}
            >
              Мои специализации
            </Typography>
          </motion.div>
          
          <Grid container spacing={4} justifyContent="center">
            {skills.map((skill, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                >
                  <Box
                    sx={{
                      p: 4,
                      height: '100%',
                      background: palette.primary[700],
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      boxShadow: `0 5px 15px rgba(0, 0, 0, 0.1)`,
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: `0 15px 30px rgba(0, 0, 0, 0.2)`,
                        background: palette.primary[600]
                      }
                    }}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        mb: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: `linear-gradient(135deg, ${palette.secondary[500]}, ${palette.secondary[700]})`,
                        borderRadius: '50%',
                        color: palette.primary[100],
                        mx: 'auto'
                      }}
                    >
                      {skill.icon}
                    </Box>
                    <Typography 
                      variant="h5" 
                      component="h4" 
                      gutterBottom 
                      textAlign="center"
                      color={palette.primary[100]}
                    >
                      {skill.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      textAlign="center"
                      color={palette.primary[200]}
                    >
                      {skill.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        <motion.div 
          variants={itemVariants}
          style={{ marginTop: '6rem', textAlign: 'center' }}
        >
          <Typography
            variant="h5"
            component="p"
            color={palette.secondary[400]}
            sx={{ fontStyle: 'italic' }}
          >
            &quot;Моя философия: каждый может изменить свое тело, если подойти к процессу с умом и дисциплиной&quot;
          </Typography>
        </motion.div>
      </motion.div>
    </WidgetContainer>
  );
}