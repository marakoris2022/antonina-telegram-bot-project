import { palette } from '@/styles/mixins';
import { Box, Typography, Grid, TextField, Button, Link } from '@mui/material';
import { WidgetContainer } from '../components/WidgetContainer';
// import Map from './Map';

export function Contacts() {
  return (
    <WidgetContainer>
      <Typography
        variant='h3'
        component='h2'
        gutterBottom
        textAlign='center'
        color={palette.secondary[300]}
      >
        Контакты
      </Typography>

      <Grid container spacing={4} mt={4}>
        <Grid>
          <Typography variant='h5' color={palette.secondary[200]} mb={2}>
            Контактная информация
          </Typography>

          <Typography paragraph>
            <Link href='tel:+79991234567' color={palette.secondary[400]}>
              +7 (999) 123-45-67
            </Link>
          </Typography>

          <Typography paragraph>
            <Link
              href='mailto:trainer@example.com'
              color={palette.secondary[400]}
            >
              trainer@example.com
            </Link>
          </Typography>

          <Typography paragraph>Москва, ул. Тренировочная, 10</Typography>

          <Typography paragraph>График работы: Пн-Пт 8:00-22:00</Typography>
        </Grid>

        <Grid>
          <Typography variant='h5' color={palette.secondary[200]} mb={2}>
            Напишите мне
          </Typography>

          <Box component='form'>
            <TextField
              fullWidth
              label='Ваше имя'
              variant='outlined'
              margin='normal'
              sx={{ backgroundColor: palette.primary[500] }}
            />

            <TextField
              fullWidth
              label='Email'
              variant='outlined'
              margin='normal'
              sx={{ backgroundColor: palette.primary[500] }}
            />

            <TextField
              fullWidth
              label='Сообщение'
              variant='outlined'
              margin='normal'
              multiline
              rows={4}
              sx={{ backgroundColor: palette.primary[500] }}
            />

            <Button
              variant='contained'
              color='secondary'
              size='large'
              fullWidth
              sx={{ mt: 2 }}
            >
              Отправить
            </Button>
          </Box>
        </Grid>

        <Grid>
          <Box sx={{ height: 400, borderRadius: 2, overflow: 'hidden' }}>
            {/* <Map /> Замените на реальную карту */}
          </Box>
        </Grid>
      </Grid>
    </WidgetContainer>
  );
}
