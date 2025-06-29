import { motion } from 'framer-motion';
import { WidgetContainer } from '../components/WidgetContainer';
import { GalleryItem } from '../components/ui/GalleryItem';

export function Gallery() {
  const images = [
    { src: '/gallery1.jpg', alt: 'Тренировка 1' },
    { src: '/gallery2.jpg', alt: 'Тренировка 2' },
    { src: '/gallery3.jpg', alt: 'Тренировка 3' },
    { src: '/gallery4.jpg', alt: 'Тренировка 4' },
    { src: '/gallery5.jpg', alt: 'Тренировка 5' },
    { src: '/gallery6.jpg', alt: 'Тренировка 6' },
  ];

  return (
    <WidgetContainer className="py-16 md:py-24 bg-primary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-3xl sm:text-4xl font-bold text-center text-secondary-400 mb-12 relative pb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Галерея
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-secondary-500 rounded-full"></span>
        </motion.h2>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          {images.map((image, index) => (
            <GalleryItem
              key={index}
              src={image.src}
              alt={image.alt}
              priority={index < 3}
            />
          ))}
        </motion.div>
      </div>
    </WidgetContainer>
  );
}
