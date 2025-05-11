import { palette } from '@/styles/mixins';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { WidgetContainer } from '../components/WidgetContainer';

export function Gallery() {
  const images = [
    { src: '/gallery1.jpg', alt: 'Тренировка 1' },
    { src: '/gallery2.jpg', alt: 'Тренировка 2' },
    { src: '/gallery3.jpg', alt: 'Тренировка 3' },
    { src: '/gallery4.jpg', alt: 'Тренировка 4' },
    { src: '/gallery5.jpg', alt: 'Тренировка 5' },
    { src: '/gallery6.jpg', alt: 'Тренировка 6' },
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
        Галерея
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 2,
          mt: 4,
        }}
      >
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{
              position: 'relative',
              height: 300,
              borderRadius: 2,
              overflow: 'hidden',
              '&:hover': {
                transform: 'scale(1.02)',
                transition: 'transform 0.3s',
              },
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              style={{ objectFit: 'cover' }}
              sizes='(max-width: 768px) 100vw, 33vw'
            />
          </Box>
        ))}
      </Box>
    </WidgetContainer>
  );
}
