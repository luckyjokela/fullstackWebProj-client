import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: body.name, email: body.email }),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Ошибка при запросе к бэкенду:', error);
    return NextResponse.json(
      { error: 'Не удалось создать пользователя' },
      { status: 500 }
    );
  }
}