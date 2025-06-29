import { motion } from 'framer-motion';
import { WidgetContainer } from '../components/WidgetContainer';
import { BenefitCard } from '../components/ui/BenefitCard';

// SVG иконки
const FitnessCenterIcon = () => (
  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/>
  </svg>
);

const RestaurantIcon = () => (
  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>
  </svg>
);

const ScheduleIcon = () => (
  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
  </svg>
);

// Анимационные варианты
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export function Benefits() {
  const benefits = [
    {
      icon: <FitnessCenterIcon />,
      title: 'Индивидуальный подход',
      text: 'Программа под ваш уровень и цели',
    },
    {
      icon: <RestaurantIcon />,
      title: 'Питание',
      text: 'Персональный расчет БЖУ и планы питания',
    },
    {
      icon: <ScheduleIcon />,
      title: 'Гибкий график',
      text: 'Занимайтесь в удобное время',
    },
  ];

  return (
    <WidgetContainer className="py-16 md:py-24 bg-primary-800">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-bold text-secondary-400 relative pb-4"
            variants={itemVariants}
          >
            Почему выбирают меня
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-secondary-500 rounded-full"></span>
          </motion.h2>
        </div>

        <div className="flex flex-wrap -mx-4">
          {benefits.map((item, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="w-full px-4 mb-8 md:w-1/2 lg:w-1/3"
            >
              <BenefitCard 
                icon={item.icon}
                title={item.title}
                description={item.text}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </WidgetContainer>
  );
}