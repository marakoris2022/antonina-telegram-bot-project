import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { palette } from '@/styles/mixins';
import { WidgetContainer } from '../components/WidgetContainer';

export function FAQ() {
  const questions = [
    {
      question: "Сколько времени нужно для первых результатов?",
      answer: "Первые изменения обычно заметны через 4-6 недель регулярных тренировок."
    },
    {
      question: "Нужно ли принимать спортивное питание?",
      answer: "Не обязательно, но может помочь в достижении целей. Рекомендации даются индивидуально."
    },
    {
      question: "Как часто нужно тренироваться?",
      answer: "Оптимально 3-5 раз в неделю в зависимости от ваших целей и уровня подготовки."
    }
  ];

  return (
    <WidgetContainer>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" gutterBottom textAlign="center" color={palette.secondary[400]}>
          Частые вопросы
        </Typography>
        
        <Box mt={4}>
          {questions.map((item, index) => (
            <Accordion key={index} sx={{ 
              backgroundColor: palette.primary[600],
              mb: 1
            }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon color="secondary" />}
              >
                <Typography fontWeight="bold" color={palette.secondary[200]}>
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </WidgetContainer>
  );
}