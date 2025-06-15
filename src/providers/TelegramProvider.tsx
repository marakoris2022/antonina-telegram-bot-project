'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';
// Убедитесь, что ваш тип User соответствует данным, которые вы получаете от /api/user
import { User } from '@/types/types';

type TelegramUser = {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string; // Прямая ссылка на фото от Telegram
};

type TelegramContextType = {
  /** Основной объект WebApp (доступен после инициализации) */
  webApp?: typeof WebApp;

  /** Данные пользователя (короткий доступ из initData) */
  user?: TelegramUser;

  /** Данные пользователя (полный доступ, например из вашей БД) */
  userData?: User | null;

  /** URL фото профиля пользователя */
  userPhotoUrl?: string;

  /** Загрузка */
  isLoading: boolean;

  /** Показать основной интерфейс кнопки */
  showMainButton: (text: string, callback: () => void) => void;

  /** Скрыть основную кнопку */
  hideMainButton: () => void;

  /** Показать алерт (уведомление) */
  showAlert: (message: string, callback?: () => void) => void;

  /** Закрыть приложение */
  closeApp: () => void;

  /** Отправить данные в бота */
  sendDataToBot: (data: string) => void;

  /** Показать кнопку "Назад" (только для Android) */
  enableBackButton: (callback: () => void) => void;

  /** Тема приложения (light/dark) */
  theme: 'light' | 'dark';

  /** Параметры запуска (можно использовать для передачи данных из бота) */
  startupParams: Record<string, string>;
};

const TelegramContext = createContext<TelegramContextType>(
  {} as TelegramContextType
);

export function TelegramProvider({ children }: { children: React.ReactNode }) {
  const [webApp, setWebApp] = useState<typeof WebApp | undefined>(undefined);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<User | null>(null);
  const [userPhotoUrl, setUserPhotoUrl] = useState<string | undefined>(
    undefined
  );

  // Эффект для инициализации WebApp и установки начальных данных
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const app = WebApp;
      app.ready();

      setWebApp(app);
      setTheme(app.colorScheme);

      // Устанавливаем URL фото напрямую из данных, предоставленных Telegram
      if (app.initDataUnsafe?.user?.photo_url) {
        setUserPhotoUrl(app.initDataUnsafe.user.photo_url);
      }

      // Слушаем изменения темы
      const onThemeChanged = () => {
        setTheme(app.colorScheme);
      };
      app.onEvent('themeChanged', onThemeChanged);

      setIsLoading(false);

      // Очистка при размонтировании компонента
      return () => {
        app.offEvent('themeChanged', onThemeChanged);
      };
    }
  }, []);

  // Эффект для получения дополнительных данных о пользователе с вашего бэкенда
  useEffect(() => {
    let isMounted = true;

    async function fetchUserData() {
      if (webApp?.initDataUnsafe?.user?.id) {
        try {
          // Запрос за дополнительными данными (например, баланс, статус и т.д.)
          const response = await fetch(
            `/api/user?userId=${webApp.initDataUnsafe.user.id}`
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          if (isMounted && data) {
            setUserData(data);
          }
        } catch (error) {
          console.error('Error fetching user data from backend:', error);
          if (isMounted) {
            setUserData(null);
          }
        }
      } else if (isMounted) {
        setUserData(null);
      }
    }

    // Запускаем получение данных только после инициализации webApp
    if (webApp) {
      fetchUserData();
    }

    return () => {
      isMounted = false;
    };
  }, [webApp]); // Зависимость от webApp, чтобы запустить после его появления

  /** Показать основную кнопку */
  const showMainButton = (text: string, callback: () => void) => {
    if (!webApp) return;
    webApp.MainButton.setText(text);
    webApp.MainButton.onClick(callback);
    webApp.MainButton.show();
  };

  /** Скрыть основную кнопку */
  const hideMainButton = () => {
    webApp?.MainButton.hide();
  };

  /** Показать алерт */
  const showAlert = (message: string, callback?: () => void) => {
    webApp?.showAlert(message, callback);
  };

  /** Закрыть приложение */
  const closeApp = () => {
    webApp?.close();
  };

  /** Отправить данные в бота */
  const sendDataToBot = (data: string) => {
    webApp?.sendData(data);
  };

  /** Активировать кнопку "Назад" */
  const enableBackButton = (callback: () => void) => {
    if (!webApp) return;
    webApp.BackButton.onClick(callback);
    webApp.BackButton.show();
  };

  const value = {
    webApp,
    user: webApp?.initDataUnsafe?.user,
    userData,
    userPhotoUrl,
    isLoading,
    theme,
    startupParams: webApp?.initDataUnsafe?.start_param
      ? Object.fromEntries(
          new URLSearchParams(webApp.initDataUnsafe.start_param)
        )
      : {},
    showMainButton,
    hideMainButton,
    showAlert,
    closeApp,
    sendDataToBot,
    enableBackButton,
  };

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  );
}

/** Хук для доступа к контексту Telegram */
export const useTelegram = () => {
  const context = useContext(TelegramContext);
  if (context === undefined) {
    throw new Error('useTelegram must be used within a TelegramProvider');
  }
  // Убрана проверка !context.webApp, так как начальное состояние может быть undefined
  // и это нормально. Проверки на webApp должны быть внутри функций, которые его используют.
  return context;
};
