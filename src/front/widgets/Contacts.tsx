import { motion } from 'framer-motion';
import { WidgetContainer } from '../components/WidgetContainer';
import { Input } from '../components/ui/form';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';


export function Contacts() {
  return (
    <WidgetContainer className="py-16 md:py-24 bg-primary-800">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2 
          className="text-3xl sm:text-4xl font-bold text-center text-secondary-400 mb-12 relative pb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Контакты
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-secondary-500 rounded-full"></span>
        </motion.h2>

        <div className="flex flex-wrap -mx-4">
          {/* Контактная информация */}
          <motion.div 
            className="w-full px-4 mb-8 md:w-1/2 lg:w-1/3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="h-full p-6 bg-primary-700 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-secondary-300 mb-6">
                Контактная информация
              </h3>

              <div className="space-y-4 text-primary-100">
                <p className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-1 text-secondary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+79991234567" className="hover:text-secondary-300 transition-colors">
                    +7 (999) 123-45-67
                  </a>
                </p>

                <p className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-1 text-secondary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:trainer@example.com" className="hover:text-secondary-300 transition-colors">
                    trainer@example.com
                  </a>
                </p>

                <p className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-1 text-secondary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Москва, ул. Тренировочная, 10</span>
                </p>

                <p className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-1 text-secondary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>График работы: Пн-Пт 8:00-22:00</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Форма обратной связи */}
          <motion.div 
            className="w-full px-4 mb-8 md:w-1/2 lg:w-1/3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="h-full p-6 bg-primary-700 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-secondary-300 mb-6">
                Напишите мне
              </h3>

              <form className="space-y-4">
                <div>
                  <Input 
                    type="text" 
                    placeholder="Ваше имя" 
                    className="w-full bg-primary-600 border-primary-500 text-primary-100 placeholder:text-primary-300 focus:border-secondary-400 focus:ring-secondary-400"
                  />
                </div>

                <div>
                  <Input 
                    type="email" 
                    placeholder="Email" 
                    className="w-full bg-primary-600 border-primary-500 text-primary-100 placeholder:text-primary-300 focus:border-secondary-400 focus:ring-secondary-400"
                  />
                </div>

                <div>
                  <Textarea 
                    placeholder="Сообщение" 
                    rows={4}
                    className="w-full bg-primary-600 border-primary-500 text-primary-100 placeholder:text-primary-300 focus:border-secondary-400 focus:ring-secondary-400"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-secondary-500 hover:bg-secondary-600 text-white py-6 text-lg transition-all duration-300"
                >
                  Отправить
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Карта */}
          <motion.div 
            className="w-full px-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="h-96 w-full bg-primary-600 rounded-lg overflow-hidden shadow-xl">
              <div className="w-full h-full flex items-center justify-center text-primary-300">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto mb-4 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-lg">Здесь будет карта</p>
                  <p className="text-sm mt-2">(интеграция с картами на ваше усмотрение)</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </WidgetContainer>
  );
}
