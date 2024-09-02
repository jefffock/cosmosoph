// app/users/page.tsx
import { fetchFromWorker } from "@/lib/api";

interface User {
  id: number;
  name: string;
  email: string;
}

export default async function UsersPage() {
  const users = await fetchFromWorker<User[]>('/api/users');

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
}