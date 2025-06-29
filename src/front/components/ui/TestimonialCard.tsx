import { motion } from 'framer-motion';
import { cn } from '../../../lib/utils';

export interface TestimonialCardProps {
  name: string;
  text: string;
  avatar: string;
  className?: string;
  delay?: number;
}

export function TestimonialCard({
  name,
  text,
  avatar,
  className,
  delay = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      className={cn(
        'w-36 md:w-40 lg:w-48 xl:w-56',
        'p-4 mx-auto',
        'transition-all duration-300',
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
    >
      <div className='relative'>
        <div
          className={cn(
            'w-12 h-12 rounded-full',
            'bg-secondary text-secondary-foreground',
            'flex items-center justify-center',
            'font-bold text-lg',
            'mx-auto mb-3',
            'shadow-md',
            'transition-transform duration-300 group-hover:scale-110'
          )}
        >
          {avatar}
        </div>

        <h3
          className={cn(
            'text-center font-bold',
            'text-foreground',
            'text-sm md:text-base',
            'mb-2',
            'transition-colors duration-300',
            'group-hover:text-secondary'
          )}
        >
          {name}
        </h3>

        <p
          className={cn(
            'text-center italic',
            'text-muted-foreground',
            'text-xs md:text-sm',
            'leading-relaxed',
            'transition-colors duration-300',
            'group-hover:text-foreground'
          )}
        >
          "{text}"
        </p>

        {/* Hover effect */}
        <div
          className={cn(
            'absolute inset-0 -z-10',
            'bg-primary/20 rounded-lg',
            'opacity-0 group-hover:opacity-100',
            'transition-all duration-300',
            'shadow-lg',
            'scale-95 group-hover:scale-100',
            'border border-border/50'
          )}
        />
      </div>
    </motion.div>
  );
}
