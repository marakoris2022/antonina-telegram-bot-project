import { motion } from 'framer-motion';
import { cn } from '../../../lib/utils';

interface ScrollDownArrowProps {
  className?: string;
  onClick?: () => void;
  color?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
}

export function ScrollDownArrow({
  className,
  onClick,
  color = 'secondary',
  size = 'md',
}: ScrollDownArrowProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-10 h-10 border-3',
  };

  const colorClasses = {
    primary: 'border-primary-500 hover:border-primary-300',
    secondary: 'border-secondary-500 hover:border-secondary-300',
    accent: 'border-accent-500 hover:border-accent-300',
  };

  return (
    <motion.div
      className={cn(
        'absolute bottom-10 left-1/2 -translate-x-1/2 z-10 cursor-pointer',
        className
      )}
      animate={{
        y: [0, 10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      onClick={onClick}
    >
      <div
        className={cn(
          'inline-block border-b-2 border-r-2 transform rotate-45 transition-colors',
          sizeClasses[size],
          colorClasses[color]
        )}
      />
    </motion.div>
  );
}
