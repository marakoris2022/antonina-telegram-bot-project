import { motion } from 'framer-motion';
import { Button } from './button';
import { cn } from '../../../lib/utils';

export interface PriceCardProps {
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
  className?: string;
  delay?: number;
  onSelect?: () => void;
}

export function PriceCard({
  name,
  price,
  period,
  features,
  popular = false,
  className,
  delay = 0,
  onSelect,
}: PriceCardProps) {
  return (
    <motion.div
      className={cn(
        'relative flex flex-col flex-1 min-w-[280px] max-w-md',
        'bg-primary/90 text-primary-foreground rounded-xl shadow-lg overflow-hidden',
        'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
        popular && 'ring-2 ring-secondary/30',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
    >
      {/* Popular badge */}
      {popular && (
        <div className="absolute top-0 right-0 z-10">
          <div className="relative">
            <div className="absolute -right-4 top-2 w-40 h-8 bg-secondary transform rotate-45" />
            <span className="relative z-10 block px-8 py-1 text-xs font-bold text-secondary-foreground uppercase">
              Популярный выбор
            </span>
          </div>
        </div>
      )}

      {/* Popular ribbon */}
      {popular && (
        <div className="h-1 bg-gradient-to-r from-secondary to-secondary/70" />
      )}

      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-2xl font-bold text-center text-secondary-200 mb-4">
          {name}
        </h3>

        <div className="text-center my-4">
          <span className="text-4xl font-extrabold text-secondary">
            {price}
          </span>
          <span className="text-primary-foreground/80 ml-2">/{period}</span>
        </div>

        <ul className="space-y-3 my-6 flex-1">
          {features.map((feature, i) => (
            <motion.li
              key={i}
              className="flex items-center text-primary-100"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i + (delay || 0) }}
            >
              <svg
                className="w-5 h-5 text-secondary mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {feature}
            </motion.li>
          ))}
        </ul>

        <Button
          className={cn(
            'w-full mt-auto',
            popular
              ? 'bg-secondary hover:bg-secondary/90 text-secondary-foreground'
              : 'bg-white/10 hover:bg-white/20 text-foreground',
            'py-3 text-base font-semibold transition-colors'
          )}
          onClick={onSelect}
        >
          Выбрать тариф
        </Button>
      </div>
    </motion.div>
  );
}
