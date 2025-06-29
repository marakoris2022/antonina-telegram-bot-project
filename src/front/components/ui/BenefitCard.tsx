import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface BenefitCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function BenefitCard({ 
  icon, 
  title, 
  description, 
  className 
}: BenefitCardProps) {
  return (
    <motion.div 
      className={cn(
        "w-full p-4",
        className
      )}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-full p-6 bg-primary-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-primary-600 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary-500 to-secondary-700 flex items-center justify-center text-primary-100 mb-6">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-primary-100 mb-3">
          {title}
        </h3>
        <p className="text-primary-200">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
