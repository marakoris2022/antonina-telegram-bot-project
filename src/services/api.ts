import { User } from '@/types/types';

type ApiResponse<T> = {
  data?: T;
  error?: string;
};

/**
 * Базовый метод для выполнения запросов к API
 */
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`/api/${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Ошибка при выполнении запроса');
    }

    return { data: await response.json() };
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    return { 
      error: error instanceof Error ? error.message : 'Неизвестная ошибка' 
    };
  }
}

// Методы для работы с пользователем
export const userApi = {
  /** Получить данные пользователя */
  get: (userId: number) => apiFetch<User>(`user?userId=${userId}`),
  
  /** Создать нового пользователя */
  create: (userData: Partial<User>) => 
    apiFetch<User>('user', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  
  /** Обновить данные пользователя */
  update: (userId: number, updates: Partial<User>) =>
    apiFetch<User>('user', {
      method: 'PUT',
      body: JSON.stringify({ userId, ...updates }),
    }),
  
  /** Удалить пользователя */
  delete: (userId: number) =>
    apiFetch<{ success: boolean }>('user', {
      method: 'DELETE',
      body: JSON.stringify({ userId }),
    }),
};

// Экспортируем базовый метод на случай, если понадобится кастомный запрос
export { apiFetch };
