interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateUserResponse {
  id: string;
  email: string;
  createdAt: string;
  error?: string;
}

export async function createUser(
  data: CreateUserRequest
): Promise<CreateUserResponse> {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return await res.json();
}