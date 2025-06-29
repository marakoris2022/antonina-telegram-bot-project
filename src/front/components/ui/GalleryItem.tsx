import { motion } from 'framer-motion';
import Image, { ImageProps } from 'next/image';
import { cn } from '../../../lib/utils';

interface GalleryItemProps extends Omit<ImageProps, 'className'> {
  className?: string;
}

export function GalleryItem({ className, ...props }: GalleryItemProps) {
  return (
    <motion.div 
      className={cn(
        'relative h-[300px] rounded-lg overflow-hidden',
        'transition-transform duration-300 hover:scale-[1.02]',
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Image
        {...props}
        fill
        className="object-cover w-full h-full"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </motion.div>
  );
}
