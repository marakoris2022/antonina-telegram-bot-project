import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { headerHeight, heroHeight, palette } from '@/styles/mixins';
import { motion } from 'framer-motion';
import { keyframes } from '@mui/material/styles';

// Анимация для текста
export const textAnimation = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

// Анимация для кнопки
export const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;


export function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: heroHeight,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Видеофон с затемнением */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(to bottom, rgba(${palette.primary[900]} / 0.8), rgba(${palette.primary[700]} / 0.9))`,
          }
        }}
      >
        <video 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
          }} 
          autoPlay 
          loop 
          muted
          playsInline
        >
          <source src="/hero_video.mp4" type="video/mp4" />
        </video>
      </Box>

      {/* Контент с анимациями */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: '1200px',
          px: 4,
          textAlign: 'center',
          color: palette.primary[100],
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Typography 
            variant="h1" 
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              fontWeight: 700,
              mb: 2,
              textShadow: `0 2px 10px rgba(0, 0, 0, 0.5)`,
              animation: `${textAnimation} 2s ease-in-out`,
            }}
          >
            Преобразите свое тело
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Typography 
            variant="h4" 
            component="p"
            sx={{
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              mb: 4,
              maxWidth: '800px',
              mx: 'auto',
              textShadow: `0 1px 3px rgba(0, 0, 0, 0.5)`,
            }}
          >
            Персональные тренировки и питание для достижения ваших целей
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{
              px: 6,
              py: 2,
              fontSize: '1.1rem',
              fontWeight: 'bold',
              borderRadius: '50px',
              animation: `${pulseAnimation} 2s infinite`,
              '&:hover': {
                transform: 'scale(1.05)',
              }
            }}
          >
            Начать тренироваться
          </Button>
        </motion.div>

        {/* Анимированные элементы декора */}
        {loaded && (
          <>
            <motion.div
              style={{
                position: 'absolute',
                top: '20%',
                left: '10%',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: palette.secondary[500],
                filter: 'blur(2px)',
              }}
              animate={{
                y: [0, 20, 0],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              style={{
                position: 'absolute',
                bottom: '15%',
                right: '15%',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: palette.secondary[300],
                filter: 'blur(3px)',
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
            />
          </>
        )}
      </Box>

      {/* Анимированная стрелка вниз */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          zIndex: 2,
          cursor: 'pointer',
        }}
        animate={{
          y: [0, 10, 0],
          x: [-25, -25, -25],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight - parseInt(headerHeight),
            behavior: 'smooth',
          });
        }}
      >
        <Box
          sx={{
            width: '40px',
            height: '40px',
            borderBottom: `2px solid ${palette.secondary[500]}`,
            borderRight: `2px solid ${palette.secondary[500]}`,
            transform: 'rotate(45deg)',
          }}
        />
      </motion.div>
    </Box>
  );
}