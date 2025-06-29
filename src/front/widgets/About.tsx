import { motion } from 'framer-motion';
import Image from 'next/image';
import { WidgetContainer } from '@/front/components/WidgetContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Иконки заменим на SVG или можно использовать react-icons
const FitnessCenterIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    height='24'
    viewBox='0 0 24 24'
    width='24'
    fill='currentColor'
  >
    <path d='M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z' />
  </svg>
);

const MonitorWeightIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    height='24'
    viewBox='0 0 24 24'
    width='24'
    fill='currentColor'
  >
    <path d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 9c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z' />
    <path d='M10 8.5h1v1h-1zm1.5 0h1v1h-1zm1.5 0h1v1h-1z' />
  </svg>
);

const DirectionsRunIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    height='24'
    viewBox='0 0 24 24'
    width='24'
    fill='currentColor'
  >
    <path d='M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z' />
  </svg>
);

const TRAINER_PHOTO = '/assets/images/trainer-photo.jpg';
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
};

const photoVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

export function About() {
  const skills = [
    {
      icon: <FitnessCenterIcon className='w-12 h-12' />,
      title: 'Силовые тренировки',
      description: 'Эффективные программы для набора мышечной массы',
    },
    {
      icon: <MonitorWeightIcon className='w-12 h-12' />,
      title: 'Похудение',
      description: 'Комплексный подход к снижению веса',
    },
    {
      icon: <DirectionsRunIcon className='w-12 h-12' />,
      title: 'Функциональный тренинг',
      description: 'Улучшение физической формы и выносливости',
    },
  ];

  return (
    <WidgetContainer className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
        className='w-full'
      >
        <motion.div variants={itemVariants} className='text-center mb-16'>
          <h2 className='text-4xl font-bold bg-gradient-to-r from-secondary-500 to-secondary-700 bg-clip-text text-transparent relative pb-4'>
            Обо мне
            <span className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-secondary-500 rounded-full'></span>
          </h2>
        </motion.div>

        <div className='flex flex-col lg:flex-row gap-12 mb-16'>
          <motion.div
            className='w-full lg:w-5/12 mx-auto'
            variants={photoVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <div className='relative h-80 w-80 mx-auto rounded-xl overflow-hidden shadow-2xl'>
              <div className='absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent z-10'></div>
              <Image
                src={TRAINER_PHOTO}
                alt='Фото тренера'
                width={320}
                height={320}
                className='w-full h-full object-cover'
                priority
              />
            </div>
          </motion.div>

          <motion.div className='w-full lg:w-7/12' variants={itemVariants}>
            <h3 className='text-3xl font-bold text-foreground mb-6'>
              Привет, я Антонина Никонорова
            </h3>

            <p className='text-lg text-foreground mb-6 leading-relaxed'>
              Профессиональный тренер с 10-летним опытом работы в индустрии
              фитнеса и спортивной подготовки. Моя миссия - помочь вам достичь
              идеальной формы через научно обоснованные методики тренировок и
              питания.
            </p>

            <p className='text-lg text-foreground mb-8 leading-relaxed'>
              Сертифицированный специалист в области персонального тренинга,
              спортивной диетологии и функционального тренинга. Работал с
              клиентами разных уровней подготовки - от новичков до
              профессиональных атлетов.
            </p>

            <Badge className='text-lg px-6 py-2 bg-secondary-500 hover:bg-secondary-600 text-primary-100'>
              Сертифицированный тренер
            </Badge>
          </motion.div>
        </div>

        <div className='mt-16'>
          <motion.div variants={itemVariants} className='text-center mb-12'>
            <h3 className='text-3xl font-bold text-secondary-400 mb-2'>
              Мои специализации
            </h3>
            <div className='w-24 h-1 bg-secondary-500 mx-auto rounded-full'></div>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className='h-full'
              >
                <Card className='h-full bg-primary-700 border-primary-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-primary-600'>
                  <CardContent className='p-6 text-center'>
                    <div className='w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-secondary-500 to-secondary-700 flex items-center justify-center text-primary-100'>
                      {skill.icon}
                    </div>
                    <h4 className='text-xl font-medium text-primary-100 mb-3'>
                      {skill.title}
                    </h4>
                    <p className='text-primary-200'>{skill.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          variants={itemVariants}
          className='mt-24 text-center italic text-xl text-secondary-400 max-w-4xl mx-auto leading-relaxed'
        >
          &quot;Моя философия: каждый может изменить свое тело, если подойти к
          процессу с умом и дисциплиной&quot;
        </motion.div>
      </motion.div>
    </WidgetContainer>
  );
}
