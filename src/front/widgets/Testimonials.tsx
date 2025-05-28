import { palette } from '@/styles/mixins';
import { Box, Typography, Avatar } from '@mui/material';
import { WidgetContainer } from '../components/WidgetContainer';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import { Grid, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';

const testimonials = Array.from({ length: 30 }).map((_, i) => ({
  name: `Клиент ${i + 1}`,
  text: `Примерный отзыв номер ${i + 1} о тренировках.`,
  avatar: `К${i + 1}`,
}));

export function Testimonials() {
  return (
    <WidgetContainer>
      <Typography
        variant='h3'
        component='h2'
        gutterBottom
        textAlign='center'
        color={palette.secondary[300]}
        sx={{
          pb: 4,
        }}
      >
        Отзывы
      </Typography>

      <Swiper
        style={{
          width: '100%',
          height: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        modules={[Grid, Pagination]}
        grid={{
          fill:'row',
          rows: 2
        }}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 4,
          },
          1536: {
            slidesPerView: 6,
          },
        }}
      >
        {testimonials.map((item, index) => (
          <SwiperSlide
            key={index}
          >
            <Box
              key={index}
              component={motion.div}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              textAlign='center'
              sx={{
                width: 150,
                p: 2,
                borderRadius: 2,
                backgroundColor: palette.primary[600],
                color: palette.primary[100],
                margin: 'auto',
              }}
            >
              <Avatar sx={{ bgcolor: palette.secondary[500], mb: 2 }}>
                {item.avatar}
              </Avatar>
              <Typography fontWeight='bold' color={palette.secondary[300]}>
                {item.name}
              </Typography>
              <Typography
                fontStyle='italic'
                color={palette.secondary[200]}
                fontSize='0.9rem'
              >
                {item.text}
              </Typography>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </WidgetContainer>
  );
}
