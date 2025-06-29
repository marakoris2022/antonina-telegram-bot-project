import { motion } from 'framer-motion';
import { WidgetContainer } from '../components/WidgetContainer';
import { PriceCard } from '../components/ui/PriceCard';

interface Plan {
  name: string;
  price: string;
  period: string;
  features: string[];
  popular: boolean;
}

const plans: Plan[] = [
  {
    name: 'Базовый',
    price: '2 500грн',
    period: 'месяц',
    features: [
      '3 тренировки в неделю',
      'Общий чат',
      'Доступ к базе упражнений',
    ],
    popular: false,
  },
  {
    name: 'Премиум',
    price: '4 200 грн',
    period: 'месяц',
    features: [
      '5 тренировок в неделю',
      'Индивидуальный план',
      'Коррекция питания',
      'Поддержка 24/7',
    ],
    popular: true,
  },
];

export function Pricing() {
  const handleSelectPlan = (planName: string) => {
    console.log(`Выбран тариф: ${planName}`);
    // Здесь можно добавить логику выбора тарифа
  };

  return (
    <WidgetContainer className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-secondary-300 mb-4">
          Тарифы
        </h2>
        <p className="text-lg text-primary-200 max-w-2xl mx-auto">
          Выберите подходящий тарифный план для достижения ваших целей
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-8 px-4">
        {plans.map((plan, index) => (
          <PriceCard
            key={index}
            name={plan.name}
            price={plan.price}
            period={plan.period}
            features={plan.features}
            popular={plan.popular}
            delay={index * 0.1}
            onSelect={() => handleSelectPlan(plan.name)}
            className={index === plans.length - 1 ? 'md:order-last' : ''}
          />
        ))}
      </div>
    </WidgetContainer>
  );
}