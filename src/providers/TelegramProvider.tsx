// src/providers/TelegramProvider.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';
import { User } from '@/types/types';

type TelegramContextType = {
  /** Основной объект WebApp (доступен после инициализации) */
  webApp?: typeof WebApp;

  /** Данные пользователя (короткий доступ) */
  user?: {
    id: number;
    first_name?: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
  };

  /** Данные пользователя (полный доступ) */
  userData?: User | null;

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWebApp(WebApp);
      WebApp.ready();
      setTheme(WebApp.colorScheme);

      // Слушаем изменения темы
      WebApp.onEvent('themeChanged', () => {
        setTheme(WebApp.colorScheme);
      });
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function getUserData() {
      if (webApp?.initDataUnsafe?.user?.id) {
        try {
          const response = await fetch(
            `/api/user?userId=${webApp.initDataUnsafe.user.id}`
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const userData = await response.json();
          if (isMounted && userData) {
            setUserData(userData);
          }
        } catch (error) {
          console.error('Error getting user data:', error);
          if (isMounted) {
            setUserData(null);
          }
        }
      } else if (isMounted) {
        setUserData(null);
      }
    }

    getUserData();

    return () => {
      isMounted = false;
    };
  }, [webApp?.initDataUnsafe?.user?.id]); // Зависимость от ID пользователя

  /** Показать основную кнопку */
  const showMainButton = (text: string, callback: () => void) => {
    if (!webApp) return;

    webApp.MainButton.setText(text).show().onClick(callback);
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

    webApp.BackButton.show().onClick(callback);
  };

  const value = {
    webApp,
    user: webApp?.initDataUnsafe?.user,
    userData,
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

/** Хук для доступа к Telegram WebApp */
export const useTelegram = () => {
  const context = useContext(TelegramContext);
  if (!context.webApp) {
    console.warn('Telegram WebApp not initialized!');
  }
  return context;
};
