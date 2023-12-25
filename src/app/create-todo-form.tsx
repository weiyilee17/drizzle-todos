'use client';

import { useFormStatus, useFormState } from 'react-dom';
import { createTodoAction } from './server-actions';

const initialFormState = {
  content: '',
  errors: {
    content: [],
  },
  message: null,
};

function CreateTodoForm() {
  const { pending } = useFormStatus();

  const [formState, dispatch] = useFormState(createTodoAction, initialFormState);

  return (
    <form action={dispatch}>
      <input
        defaultValue={formState.content}
        name='content'
        className='text-black'
      />
      <button disabled={pending}>{pending ? 'Please wait...' : 'Create Todo'}</button>
      {formState.errors?.content &&
        formState.errors.content.map((singleErrorMessage) => (
          <div
            key={singleErrorMessage}
            className='text-red-500'
          >
            {singleErrorMessage}
          </div>
        ))}
      {formState.message && <div className='text-red-500'>{formState.message}</div>}
    </form>
  );
}

export default CreateTodoForm;
