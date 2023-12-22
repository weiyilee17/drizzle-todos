'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { db } from '@/db';
import { todos } from '@/db/schema';

export async function createTodoAction(formData: FormData) {
  const content = formData.get('content') as string;

  await db.insert(todos).values({
    content,
  });
  revalidatePath('/');
}

export async function deleteTodoAction(id: number) {
  await db.delete(todos).where(eq(todos.id, id));
  revalidatePath('/');
}
