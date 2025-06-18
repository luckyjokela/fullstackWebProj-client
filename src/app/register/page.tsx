'use client';
import { useState } from 'react';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useUserStore } from '../store/useUserStore';
import { createUser } from '../api/lib/apiClient';

const registerSchema = z.object({
  name: z.string().min(2, 'Имя должно быть не менее 2 символов'),
  email: z.string().email('Введите корректный email'),
  password: z.string().min(8, 'Пароль должен быть минимум 8 символов'),
});

type RegisterData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { login } = useUserStore();

  const handleSubmit = async () => {
    try {
      // Валидация
      const data = registerSchema.parse({ name, email, password });

      // Отправка данных на сервер
      const response = await createUser(data);

      if (response.id) {
        // Сохраняем пользователя в хранилище Zustand
        login(response.id, response.email);
        // Перенаправляем на главную
        router.push('/');
      }
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        // Ошибки валидации
        setError(err.errors.map((e) => e.message).join(', '));
      } else if (err.message) {
        // Ошибки от API
        setError(err.message);
      } else {
        setError('Произошла ошибка при регистрации');
      }
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
      <h2>Регистрация</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: '100%', marginBottom: '1rem' }}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', marginBottom: '1rem' }}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', marginBottom: '1rem' }}
      />
      <button onClick={handleSubmit} style={{ width: '100%' }}>
        Зарегистрироваться
      </button>
    </div>
  );
}