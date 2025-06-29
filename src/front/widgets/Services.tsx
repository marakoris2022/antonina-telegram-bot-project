import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { WidgetContainer } from '../components/WidgetContainer';
import { ServiceCard } from '../components/ui/ServiceCard';

interface Service {
  title: string;
  description: string;
  highlight: boolean;
  icon: string;
}

const services: Service[] = [
  {
    title: 'Персональные тренировки',
    description: 'Индивидуальный подход в зале с профессиональным тренером',
    highlight: true,
    icon: '💪',
  },
  {
    title: 'Онлайн-коучинг',
    description: 'Персональные программы тренировок и питания удаленно',
    highlight: false,
    icon: '📱',
  },
  {
    title: 'Контроль БЖУ',
    description: 'Индивидуальные планы питания и регулярные консультации',
    highlight: false,
    icon: '🥗',
  },
];

export function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200">
      {/* Decorative background element */}
      <div 
        className="absolute top-0 right-0 w-[300px] h-[300px]"
        style={{
          background: 'radial-gradient(circle, var(--color-secondary-300) 0%, transparent 70%)',
          opacity: 0.3,
          pointerEvents: 'none',
        }}
      />
      
      <WidgetContainer className="py-20">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-primary-900 mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Мои услуги
            </motion.h2>
            <motion.div
              className="h-1 w-20 bg-secondary-500 rounded-full mx-auto"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  highlight={service.highlight}
                  delay={index * 0.1}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </WidgetContainer>
    </div>
  );
}