import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { showNotificationWithTimeout } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const [formValue, setFormValue] = useState('');

  const dispatch = useDispatch();

  const createAnecdote = async (event) => {
    event.preventDefault();

    const anecdote = { content: formValue, votes: 0 };

    dispatch(addAnecdote(anecdote));

    const message = `Added: '${formValue}'`;
    dispatch(showNotificationWithTimeout(dispatch, message));

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