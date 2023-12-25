'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { db } from '@/db';
import { todos } from '@/db/schema';

export type TCreateTodoFormState = {
  content: string;
  errors?: {
    content?: string[];
  };
  message?: string | null;
};

const createTodoSchema = z.object({
  content: z.string().min(1, 'Must have content.'),
});

export async function createTodoAction(prevState: TCreateTodoFormState, formData: FormData) {
  const content = formData.get('content');

  const validatedFields = createTodoSchema.safeParse({
    content,
  });
  console.log('validatedFields', validatedFields);

  if (!validatedFields.success) {
    return {
      // The idea of sending back the content to the client was that in case of users having thier js turned off, thier invalid
      // input doesn't get whiped out into empty strings. In practice, there are typescript issues of returning the content and
      // setting the default value to the returned value. Making content as string works, but not sure whether it is the correct
      // way to do it. The whole idea of using useFormState, useFormStatus is around users without js enabled. Not sure whether
      // these overheads are worth while, but nice to learn.
      content: '',
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing content. Failed to create todo.',
    };
  }

  const { content: validContent } = validatedFields.data;

  try {
    await db.insert(todos).values({
      content: validContent,
    });
    console.log('inserted into db');
  } catch (error) {
    console.error('Database error', error);
    return {
      content: '',
      errors: {
        content: [],
      },
      message: 'Database error: Failed to create todo.',
    };
  }

  revalidatePath('/');

  // If not redirecting, seems that we would have to return this object to make the return type correct for the front end
  return {
    content: '',
    errors: {
      content: [],
    },
    message: null,
  };
}

export async function deleteTodoAction(id: number) {
  await db.delete(todos).where(eq(todos.id, id));
  revalidatePath('/');
}

export async function toggleTodoAction(id: number, originalCompleted: boolean) {
  await db
    .update(todos)
    .set({
      completed: !originalCompleted,
    })
    .where(eq(todos.id, id));
  revalidatePath('/');
}
