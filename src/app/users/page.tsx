"use client";

import { useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { createUser } from "../api/lib/apiClient";

export default function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUserStore();

  const handleRegister = async () => {
    const response = await createUser({ email, name, password });

    if (response.id) {
      login(response.id, response.email);
      alert("Вы успешно зарегистрированы!");
    } else {
      alert(`Ошибка: ${response.error}`);
    }
  };

  return (
    <div>
      <h1>Регистрация</h1>
      <input
        type="userName"
        placeholder="User name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Зарегистрироваться</button>
    </div>
  );
}
