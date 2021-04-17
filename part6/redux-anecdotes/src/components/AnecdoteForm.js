import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const [formValue, setFormValue] = useState('');

  const dispatch = useDispatch();

  const createAnecdote = (event) => {
    event.preventDefault();

    dispatch(addAnecdote(formValue));

    const message = `Added: '${formValue}'`;
    dispatch(setNotification(message));
    setFormValue('');
  };

  const handleChange = (event) => {
    setFormValue(event.target.value);
  };

  return (
    <form onSubmit={createAnecdote}>
      <div>
        <input
          type="text"
          name="anecdote"
          value={formValue}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default AnecdoteForm;