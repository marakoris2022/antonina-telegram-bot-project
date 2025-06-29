import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WidgetContainer } from '../components/WidgetContainer';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/accordion';

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const questions: FAQItem[] = [
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

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <WidgetContainer className="py-16 md:py-24 bg-primary-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-3xl sm:text-4xl font-bold text-center text-secondary-400 mb-12 relative pb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Частые вопросы
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-secondary-500 rounded-full"></span>
        </motion.h2>
        
        <motion.div 
          className="max-w-3xl mx-auto mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <Accordion>
            {questions.map((item, index) => (
              <AccordionItem key={index} className="bg-primary-700 rounded-lg overflow-hidden mb-3">
                <div className="px-6">
                  <AccordionTrigger 
                    isOpen={expandedIndex === index}
                    onClick={() => toggleAccordion(index)}
                    className="text-lg font-semibold text-secondary-200 hover:text-white hover:no-underline py-5"
                  >
                    {item.question}
                  </AccordionTrigger>
                </div>
                
                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <AccordionContent className="px-6 pb-6 pt-0 text-primary-100">
                        {item.answer}
                      </AccordionContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </WidgetContainer>
  );
}