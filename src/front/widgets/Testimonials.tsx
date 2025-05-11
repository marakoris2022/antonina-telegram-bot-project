import { palette } from '@/styles/mixins';
import { Box, Typography, Avatar, Stack } from '@mui/material';
import { WidgetContainer } from '../components/WidgetContainer';

export function Testimonials() {
  const testimonials = [
    { name: 'Анна', text: 'Сбросила 15 кг за 3 месяца!', avatar: 'A' },
    { name: 'Максим', text: 'Набрал 8 кг мышечной массы.', avatar: 'M' },
  ];

  return (
    <WidgetContainer>
        <Typography variant="h3" component="h2" gutterBottom textAlign="center" color={palette.secondary[300]}>
          Отзывы
        </Typography>
        <Stack direction="row" spacing={4} justifyContent="center">
          {testimonials.map((item, index) => (
            <Box key={index} textAlign="center">
              <Avatar sx={{ bgcolor: palette.secondary[500], mb: 2 }}>{item.avatar}</Avatar>
              <Typography fontWeight="bold" color={palette.secondary[300]}>{item.name}</Typography>
              <Typography fontStyle="italic" color={palette.secondary[200]}>{item.text}</Typography>
            </Box>
          ))}
        </Stack>
    </WidgetContainer>
  );
}