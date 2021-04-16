import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const [anecdote, setAnecdote] = useState('');

  const dispatch = useDispatch();

  const createAnecdote = (event) => {
    event.preventDefault();
    dispatch(addAnecdote(anecdote));
    setAnecdote('');
  };

  const handleChange = (event) => {
    setAnecdote(event.target.value);
  };

  return (
    <form onSubmit={createAnecdote}>
      <div>
        <input
          type="text"
          name="anecdote"
          value={anecdote}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default AnecdoteForm;