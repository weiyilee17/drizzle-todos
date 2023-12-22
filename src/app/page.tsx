import { createTodoAction, deleteTodoAction } from './server-actions';
import { getAllTodos } from './data-access/todos';
import { unstable_noStore as noStore } from 'next/cache';

export default async function Home() {
  noStore();

  const allTodos = await getAllTodos();

  return (
    <main className=''>
      <ul className='list-disc'>
        {allTodos.map(({ id, content }) => (
          <li
            key={id}
            className='flex gap-2 items-center'
          >
            {content}
            <form action={deleteTodoAction.bind(null, id)}>
              <button className='text-red-400'>Delete</button>
            </form>
          </li>
        ))}
      </ul>
      <form action={createTodoAction}>
        <input
          name='content'
          className='text-black'
        />
        <button>Create Todo</button>
      </form>
    </main>
  );
}
