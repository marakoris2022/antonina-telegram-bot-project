import { motion } from 'framer-motion';
import { cn } from '../../../lib/utils';

interface FloatingDotProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'accent';
  delay?: number;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  animation?: 'float' | 'float2';
}

export function FloatingDot({
  className,
  size = 'md',
  color = 'primary',
  delay = 0,
  top,
  right,
  bottom,
  left,
  animation = 'float',
}: FloatingDotProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const colorClasses = {
    primary: 'bg-primary-500/70',
    secondary: 'bg-secondary-500/70',
    accent: 'bg-accent-500/70',
  };

  const animationVariants = {
    float: {
      y: [0, 20, 0],
      opacity: [0.7, 1, 0.7],
    },
    float2: {
      y: [0, -15, 0],
      opacity: [0.5, 0.8, 0.5],
    },
  };

  return (
    <motion.div
      className={cn(
        'absolute rounded-full filter blur-sm',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      style={{
        top,
        right,
        bottom,
        left,
      }}
      initial={{ opacity: 0 }}
      animate={animationVariants[animation]}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  );
}
