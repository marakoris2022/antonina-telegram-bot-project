import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { FloatingDot } from '../components/ui/FloatingDot';
import { ScrollDownArrow } from '../components/ui/ScrollDownArrow';

const VIDEO_SRC = '/hero_video.mp4';
const HEADER_HEIGHT = 80; // Высота хедера в пикселях

export function Hero() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight - HEADER_HEIGHT,
      behavior: 'smooth',
    });
  };

  const handleVideoLoad = () => {
    // Video loaded handler can be used for additional logic if needed
  };

  return (
    <div className="relative w-full h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
      {/* Видеофон с затемнением */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={handleVideoLoad}
          preload="auto"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      </div>

      {/* Контент с анимациями */}
      <div className="relative z-10 w-full max-w-7xl px-8 text-center" >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-primary-foreground">
            Преобразите свое тело
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8 max-w-3xl mx-auto"
        >
          <p className="text-lg sm:text-xl md:text-2xl text-primary-foreground" >
            Персональные тренировки и питание для достижения ваших целей
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            size="lg"
          >
            Начать тренироваться
          </Button>
        </motion.div>

        {/* Анимированные элементы декора */}
        {isClient && (
          <>
            <FloatingDot 
              size="lg"
              color="secondary"
              top="20%"
              left="10%"
              animation="float"
            />
            <FloatingDot 
              size="xl"
              color="secondary"
              bottom="15%"
              right="15%"
              animation="float2"
              delay={0.5}
            />
          </>
        )}
      </div>

      {/* Анимированная стрелка вниз */}
      <ScrollDownArrow 
        onClick={handleScrollDown} 
        className="z-10"
      />
    </div>
  );
}