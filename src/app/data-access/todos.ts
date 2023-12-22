import { db } from '@/db';

export async function getAllTodos() {
  return await db.query.todos.findMany();
}
