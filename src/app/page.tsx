import { CheckSquare2Icon, SquareIcon } from 'lucide-react';
import { unstable_noStore as noStore } from 'next/cache';

import CreateTodoForm from './create-todo-form';
import { getAllTodos } from './data-access/todos';
import { deleteTodoAction, toggleTodoAction } from './server-actions';

export default async function Home() {
  noStore();

  const allTodos = await getAllTodos();

  return (
    <main className='container mx-auto mt-12'>
      <ul className='list-disc'>
        {allTodos.map(({ id, content, completed }) => (
          <li
            key={id}
            className='flex gap-2 items-center'
          >
            <form action={toggleTodoAction.bind(null, id, completed)}>
              <button>{completed ? <CheckSquare2Icon /> : <SquareIcon />}</button>
            </form>

            {content}
            <form action={deleteTodoAction.bind(null, id)}>
              <button className='text-red-400'>Delete</button>
            </form>
          </li>
        ))}
      </ul>
      <CreateTodoForm />
    </main>
  );
}
