import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import { WidgetContainer } from '../components/WidgetContainer';
import { TestimonialCard } from '../components/ui/TestimonialCard';

interface Testimonial {
  name: string;
  text: string;
  avatar: string;
}

const testimonials: Testimonial[] = Array.from({ length: 30 }).map((_, i) => ({
  name: `Клиент ${i + 1}`,
  text: `Примерный отзыв номер ${i + 1} о тренировках.`,
  avatar: `К${i + 1}`,
}));

export function Testimonials() {
  return (
    <div className="bg-primary-700 py-16">
      <WidgetContainer>
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center text-secondary-300 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Отзывы клиентов
        </motion.h2>

        <div className="relative">
          <Swiper
            className="!pb-14 !px-1"
            modules={[Grid, Pagination]}
            grid={{
              fill: 'row',
              rows: 2,
            }}
            spaceBetween={20}
            pagination={{
              clickable: true,
              el: '.testimonial-pagination',
              bulletClass: 'w-2 h-2 mx-1 rounded-full bg-primary-400 opacity-50 transition-all duration-300',
              bulletActiveClass: '!bg-secondary-500 !opacity-100',
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 24,
              },
              1536: {
                slidesPerView: 6,
                spaceBetween: 24,
              },
            }}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index} className="group">
                <TestimonialCard 
                  name={testimonial.name}
                  text={testimonial.text}
                  avatar={testimonial.avatar}
                  delay={index * 0.05}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom pagination */}
          <div className="flex justify-center mt-8">
            <div className="flex testimonial-pagination" />
          </div>
        </div>
      </WidgetContainer>
    </div>
  );
}
