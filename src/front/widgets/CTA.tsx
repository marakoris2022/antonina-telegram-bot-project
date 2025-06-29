import { motion } from 'framer-motion';
import { WidgetContainer } from '../components/WidgetContainer';
import { Button } from '@/components/ui/button';

export function CTA() {
  return (
    <WidgetContainer className="py-16 md:py-24 bg-gradient-to-r from-primary-800 to-secondary-900">
      <motion.div 
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-center space-y-6">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Готовы изменить свое тело?
          </motion.h2>

          <motion.p 
            className="text-xl md:text-2xl text-primary-100 max-w-2xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Запишитесь на первую бесплатную тренировку!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="mb-6"
          >
            <Button 
              size="lg" 
              className="bg-secondary-500 hover:bg-secondary-600 text-white text-lg px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Записаться сейчас
            </Button>
          </motion.div>

          <motion.p 
            className="text-primary-200 italic"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Осталось 3 места на этой неделе
          </motion.p>
        </div>
      </motion.div>
    </WidgetContainer>
  );
}
