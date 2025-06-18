import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Имя, email и пароль обязательны' },
        { status: 400 }
      );
    }

    const backendResponse = await fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
      return NextResponse.json(errorData, {
        status: backendResponse.status,
      });
    }

    const data = await backendResponse.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Ошибка:', error);
    return NextResponse.json(
      { error: 'Не удалось зарегистрировать пользователя' },
      { status: 500 }
    );
  }
}