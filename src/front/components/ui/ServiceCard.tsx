import { motion } from 'framer-motion';
import { cn } from '../../../lib/utils';

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  highlight?: boolean;
  delay?: number;
  className?: string;
}

export function ServiceCard({
  title,
  description,
  icon,
  highlight = false,
  delay = 0,
  className,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10 }}
      className={cn(
        'relative flex flex-col p-8 h-full rounded-xl',
        'bg-card text-card-foreground',
        'border border-border shadow-sm',
        'transition-all duration-300 hover:shadow-lg',
        highlight && 'border-t-4 border-t-secondary',
        className
      )}
    >
      {/* Decorative highlight for featured card */}
      {highlight && (
        <div 
          className="absolute top-0 right-0 w-24 h-24"
          style={{
            background: 'radial-gradient(circle, rgb(var(--secondary) / 0.2) 0%, transparent 70%)',
            opacity: 0.3,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Service Icon */}
      <div className="text-5xl mb-4 text-primary-foreground">
        {icon}
      </div>

      {/* Service Title */}
      <h3 className={cn(
        'text-2xl font-bold mb-4',
        highlight ? 'text-secondary' : 'text-foreground'
      )}>
        {title}
      </h3>

      {/* Service Description */}
      <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
        {description}
      </p>

      {/* Popular Badge */}
      {highlight && (
        <div className="mt-auto pt-4">
          <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary text-sm font-semibold rounded-md">
            Популярный выбор
          </span>
        </div>
      )}
    </motion.div>
  );
}
