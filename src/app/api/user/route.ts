// Импортируем функции для работы с пользователем
import {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../telegram/actions';
import { NextRequest, NextResponse } from 'next/server';

// Получить пользователя по userId (например, /api/user?userId=123)
export async function GET(request: NextRequest) {
  // Получаем userId из query параметра
  const { searchParams } = new URL(request.url);
  const userId = Number(searchParams.get('userId'));

  // Проверка, что userId передан
  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  }

  // Получаем пользователя из базы
  const user = await getUser(userId);

  console.log('user', user);

  // Если пользователь не найден
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Возвращаем пользователя
  return NextResponse.json(user);
}

// Создать пользователя (POST-запрос с телом { id, first_name, ... })
export async function POST(request: NextRequest) {
  const data = await request.json();

  // Проверяем, что обязательные поля есть
  if (!data.id || !data.first_name) {
    return NextResponse.json(
      { error: 'id and first_name are required' },
      { status: 400 }
    );
  }

  // Создаем пользователя
  const userId = await createUser(data);
  return NextResponse.json({ userId });
}

// Обновить пользователя (PUT-запрос с телом { userId, ...fields })
export async function PUT(request: NextRequest) {
  const data = await request.json();
  const { userId, ...updateFields } = data;

  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  }

  const result = await updateUser(userId, updateFields);
  return NextResponse.json(result);
}

// Удалить пользователя (DELETE-запрос с телом { userId })
export async function DELETE(request: NextRequest) {
  const data = await request.json();
  const { userId } = data;

  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  }

  const result = await deleteUser(userId);
  return NextResponse.json(result);
}
