import { db } from '@/db';
import { todos } from '@/db/schema';
import { asc } from 'drizzle-orm';

export async function getAllTodos() {
  return await db.query.todos.findMany({
    orderBy: [asc(todos.id)],
  });
}
